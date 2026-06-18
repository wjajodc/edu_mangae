import type common from "@ohos:app.ability.common";
import fileIo from "@ohos:file.fs";
import util from "@ohos:util";
import type { ImportedSchedule, ScheduleCell, TodayCourseItem, YearSemesterGroup } from '../model/CourseModel';
import { ScheduleParser } from "@normalized:N&&&entry/src/main/ets/utils/ScheduleParser&";
import { ScheduleSemesterUtil } from "@normalized:N&&&entry/src/main/ets/utils/ScheduleSemesterUtil&";
import { syncCurrentTeachingWeek } from "@normalized:N&&&entry/src/main/ets/utils/DateUtils&";
const MAP_STORAGE_KEY = 'importedSchedulesMapJson';
const CURRENT_KEY_STORAGE = 'currentScheduleKey';
const LEGACY_STORAGE_KEY = 'importedScheduleJson';
const PERIOD_TIME_MAP: string[] = [
    '', '08:00-08:45', '08:55-09:40', '10:00-10:45', '10:55-11:40',
    '14:00-14:45', '14:55-15:40', '16:00-16:45', '16:55-17:40',
    '19:00-19:45', '19:55-20:40'
];
const PERIOD_LABEL_MAP: string[] = [
    '', '第1节', '第2节', '第3节', '第4节', '第5节',
    '第6节', '第7节', '第8节', '第9节', '第10节'
];
/**
 * 课表全局存储：支持多学年期导入、切换、持久化
 */
export class ScheduleStore {
    private static scheduleMap: Record<string, ImportedSchedule> | null = null;
    static async initFromRawFile(context: common.UIAbilityContext): Promise<void> {
        ScheduleStore.loadMap();
        if (Object.keys(ScheduleStore.scheduleMap!).length > 0) {
            ScheduleStore.ensureCurrentKey();
            ScheduleStore.syncTodayCourses();
            return;
        }
        try {
            const buffer = await context.resourceManager.getRawFileContent('default_schedule.xls');
            const html = ScheduleStore.bufferToString(buffer);
            await ScheduleStore.importFromHtml(html);
        }
        catch (e) {
            console.error('ScheduleStore init failed: ' + JSON.stringify(e));
        }
    }
    static async importFromUri(uri: string): Promise<ImportedSchedule> {
        const file = fileIo.openSync(uri, fileIo.OpenMode.READ_ONLY);
        try {
            const buffer = ScheduleStore.readFdToBuffer(file.fd);
            const html = ScheduleStore.decodeBuffer(buffer);
            return ScheduleStore.importFromHtml(html);
        }
        catch (e) {
            if (e instanceof Error && e.message.length > 0) {
                throw e;
            }
            throw new Error('无法打开所选文件，请重新选择课表文件');
        }
        finally {
            fileIo.closeSync(file);
        }
    }
    private static readFdToBuffer(fd: number): ArrayBuffer {
        const stat = fileIo.statSync(fd);
        if (!stat || stat.size <= 0) {
            throw new Error('文件为空或无法读取');
        }
        const buffer = new ArrayBuffer(stat.size);
        fileIo.readSync(fd, buffer);
        return buffer;
    }
    static async importFromHtml(html: string): Promise<ImportedSchedule> {
        if (!html || html.length < 50) {
            throw new Error('文件内容为空，请确认选择了正确的课表文件');
        }
        if (!ScheduleStore.looksLikeScheduleHtml(html)) {
            throw new Error('不是教务系统导出的课表格式，请导出 HTML 格式的 xls 文件');
        }
        const schedule = ScheduleParser.parseHtmlContent(html);
        if (schedule.entries.length === 0) {
            throw new Error('未能解析到课程数据，请使用教务系统「学生课表」导出文件');
        }
        const meta = ScheduleSemesterUtil.parse(schedule.semester);
        if (!meta) {
            throw new Error('无法识别课表中的学年学期，请确认文件包含学期标题');
        }
        const map = ScheduleStore.loadMap();
        map[meta.key] = schedule;
        ScheduleStore.persistMap();
        ScheduleStore.switchTo(meta.key);
        return schedule;
    }
    static switchTo(key: string): boolean {
        const map = ScheduleStore.loadMap();
        if (!map[key]) {
            return false;
        }
        AppStorage.setOrCreate(CURRENT_KEY_STORAGE, key);
        const meta = ScheduleSemesterUtil.fromKey(key);
        if (meta) {
            AppStorage.setOrCreate('currentSemester', meta.displayLabel);
        }
        const schedule = map[key];
        AppStorage.setOrCreate('scheduleMaxWeek', schedule.maxWeek);
        syncCurrentTeachingWeek(key);
        ScheduleStore.syncTodayCourses();
        return true;
    }
    static hasSchedule(key: string): boolean {
        const map = ScheduleStore.loadMap();
        return map[key] !== undefined;
    }
    /**
     * 删除指定学年学期的课表，返回实际删除数量
     */
    static deleteSchedules(keys: string[]): number {
        const map = ScheduleStore.loadMap();
        const currentKey = AppStorage.get<string>(CURRENT_KEY_STORAGE) || '';
        const deleteSet: Set<string> = new Set(keys);
        const newMap: Record<string, ImportedSchedule> = {};
        let deleted = 0;
        let currentRemoved = false;
        const allKeys = Object.keys(map);
        for (let i = 0; i < allKeys.length; i++) {
            const key = allKeys[i];
            if (deleteSet.has(key)) {
                deleted++;
                if (key === currentKey) {
                    currentRemoved = true;
                }
            }
            else {
                newMap[key] = map[key];
            }
        }
        if (deleted === 0) {
            return 0;
        }
        ScheduleStore.scheduleMap = newMap;
        ScheduleStore.persistMap();
        if (currentRemoved) {
            const remaining = Object.keys(newMap);
            if (remaining.length > 0) {
                ScheduleStore.switchTo(remaining[0]);
            }
            else {
                AppStorage.setOrCreate(CURRENT_KEY_STORAGE, '');
                AppStorage.setOrCreate('currentSemester', '');
                ScheduleStore.syncTodayCourses();
            }
        }
        else {
            ScheduleStore.syncTodayCourses();
        }
        return deleted;
    }
    static getCurrentKey(): string {
        ScheduleStore.ensureCurrentKey();
        return AppStorage.get<string>(CURRENT_KEY_STORAGE) || '';
    }
    static getCatalog(): YearSemesterGroup[] {
        const map = ScheduleStore.loadMap();
        const yearTermMap: Map<string, number[]> = new Map();
        const keys = Object.keys(map);
        for (let i = 0; i < keys.length; i++) {
            const meta = ScheduleSemesterUtil.fromKey(keys[i]);
            if (!meta) {
                continue;
            }
            let terms = yearTermMap.get(meta.yearRange);
            if (!terms) {
                terms = [];
            }
            if (terms.indexOf(meta.term) < 0) {
                terms.push(meta.term);
            }
            terms.sort((a: number, b: number) => a - b);
            yearTermMap.set(meta.yearRange, terms);
        }
        const years = Array.from(yearTermMap.keys()).sort((a: string, b: string) => b.localeCompare(a));
        const catalog: YearSemesterGroup[] = [];
        for (let i = 0; i < years.length; i++) {
            const group: YearSemesterGroup = {
                yearRange: years[i],
                terms: yearTermMap.get(years[i]) || [],
            };
            catalog.push(group);
        }
        return catalog;
    }
    static getScheduleCount(): number {
        return Object.keys(ScheduleStore.loadMap()).length;
    }
    static getSchedule(key?: string): ImportedSchedule | null {
        const map = ScheduleStore.loadMap();
        const targetKey = key || ScheduleStore.getCurrentKey();
        if (targetKey && map[targetKey]) {
            return map[targetKey];
        }
        const keys = Object.keys(map);
        if (keys.length > 0) {
            return map[keys[0]];
        }
        return null;
    }
    static getWeekOptions(maxWeek: number): string[] {
        const options: string[] = ['全部'];
        for (let i = 1; i <= maxWeek; i++) {
            options.push(`第${i}周`);
        }
        return options;
    }
    static getCellsForWeek(weekLabel: string): ScheduleCell[] {
        const schedule = ScheduleStore.getSchedule();
        if (!schedule) {
            return [];
        }
        const weekNum = ScheduleStore.parseWeekLabel(weekLabel);
        const cellMap: Map<string, ScheduleCell> = new Map();
        for (let i = 0; i < schedule.entries.length; i++) {
            const entry = schedule.entries[i];
            if (weekNum > 0 && entry.weeks.indexOf(weekNum) < 0) {
                continue;
            }
            const key = `${entry.dayOfWeek}_${entry.startPeriod}`;
            const existing = cellMap.get(key);
            if (!existing) {
                const cell: ScheduleCell = {
                    courseCode: entry.courseCode,
                    courseName: entry.courseName,
                    teacher: entry.teacher,
                    classroom: entry.classroom,
                    weekRange: entry.weekRangeText,
                    dayOfWeek: entry.dayOfWeek,
                    startPeriod: entry.startPeriod,
                    endPeriod: entry.endPeriod,
                    span: entry.span,
                    isContinued: false,
                    scheduleType: 'normal',
                    weeks: entry.weeks,
                };
                cellMap.set(key, cell);
            }
        }
        const result: ScheduleCell[] = [];
        cellMap.forEach((value: ScheduleCell) => {
            result.push(value);
        });
        return result;
    }
    static syncTodayCourses(): void {
        const courses = ScheduleStore.getTodayCourses(false);
        AppStorage.setOrCreate('todayCoursesJson', JSON.stringify(courses));
    }
    static getTodayCourses(tomorrow: boolean): TodayCourseItem[] {
        const schedule = ScheduleStore.getSchedule();
        if (!schedule) {
            return [];
        }
        const jsDay = new Date().getDay();
        let targetDay = jsDay === 0 ? 7 : jsDay;
        if (tomorrow) {
            targetDay = targetDay === 7 ? 1 : targetDay + 1;
        }
        const currentWeek = AppStorage.get<number>('currentWeek') || 1;
        const items: TodayCourseItem[] = [];
        for (let i = 0; i < schedule.entries.length; i++) {
            const entry = schedule.entries[i];
            if (entry.dayOfWeek !== targetDay) {
                continue;
            }
            if (entry.weeks.indexOf(currentWeek) < 0) {
                continue;
            }
            const item: TodayCourseItem = {
                courseCode: entry.courseCode,
                courseName: entry.courseName,
                teacher: entry.teacher,
                classroom: entry.classroom,
                startPeriod: entry.startPeriod,
                endPeriod: entry.endPeriod,
                periodLabel: `${PERIOD_LABEL_MAP[entry.startPeriod]}-${PERIOD_LABEL_MAP[entry.endPeriod]}`,
                timeLabel: ScheduleStore.buildTimeLabel(entry.startPeriod, entry.endPeriod),
                isTomorrow: tomorrow,
            };
            items.push(item);
        }
        items.sort((a: TodayCourseItem, b: TodayCourseItem) => a.startPeriod - b.startPeriod);
        return ScheduleStore.dedupeTodayCourses(items);
    }
    private static loadMap(): Record<string, ImportedSchedule> {
        if (ScheduleStore.scheduleMap) {
            return ScheduleStore.scheduleMap;
        }
        const mapJson = AppStorage.get<string>(MAP_STORAGE_KEY);
        if (mapJson && mapJson.length > 0) {
            ScheduleStore.scheduleMap = JSON.parse(mapJson) as Record<string, ImportedSchedule>;
            return ScheduleStore.scheduleMap;
        }
        ScheduleStore.scheduleMap = ScheduleStore.migrateLegacyStorage();
        return ScheduleStore.scheduleMap;
    }
    private static migrateLegacyStorage(): Record<string, ImportedSchedule> {
        const legacy = AppStorage.get<string>(LEGACY_STORAGE_KEY);
        if (legacy && legacy.length > 0) {
            const schedule = JSON.parse(legacy) as ImportedSchedule;
            const meta = ScheduleSemesterUtil.parse(schedule.semester);
            if (meta) {
                const map: Record<string, ImportedSchedule> = {};
                map[meta.key] = schedule;
                ScheduleStore.scheduleMap = map;
                ScheduleStore.persistMap();
                return map;
            }
        }
        return {};
    }
    private static persistMap(): void {
        if (!ScheduleStore.scheduleMap) {
            return;
        }
        AppStorage.setOrCreate(MAP_STORAGE_KEY, JSON.stringify(ScheduleStore.scheduleMap));
    }
    private static ensureCurrentKey(): void {
        const map = ScheduleStore.loadMap();
        const keys = Object.keys(map);
        if (keys.length === 0) {
            return;
        }
        const current = AppStorage.get<string>(CURRENT_KEY_STORAGE);
        if (current && map[current]) {
            const meta = ScheduleSemesterUtil.fromKey(current);
            if (meta) {
                AppStorage.setOrCreate('currentSemester', meta.displayLabel);
            }
            return;
        }
        ScheduleStore.switchTo(keys[0]);
    }
    private static dedupeTodayCourses(items: TodayCourseItem[]): TodayCourseItem[] {
        const map: Map<string, TodayCourseItem> = new Map();
        for (let i = 0; i < items.length; i++) {
            const key = `${items[i].courseCode}_${items[i].startPeriod}`;
            if (!map.has(key)) {
                map.set(key, items[i]);
            }
        }
        const result: TodayCourseItem[] = [];
        map.forEach((value: TodayCourseItem) => result.push(value));
        result.sort((a: TodayCourseItem, b: TodayCourseItem) => a.startPeriod - b.startPeriod);
        return result;
    }
    private static buildTimeLabel(start: number, end: number): string {
        const startTime = PERIOD_TIME_MAP[start] ? PERIOD_TIME_MAP[start].split('-')[0] : '';
        const endTime = PERIOD_TIME_MAP[end] ? PERIOD_TIME_MAP[end].split('-')[1] : '';
        if (startTime && endTime) {
            return `${startTime}-${endTime}`;
        }
        return `${PERIOD_LABEL_MAP[start]}-${PERIOD_LABEL_MAP[end]}`;
    }
    private static parseWeekLabel(label: string): number {
        if (label === '全部') {
            return 0;
        }
        const match = label.match(/第(\d+)周/);
        return match ? parseInt(match[1]) : 0;
    }
    private static bufferToString(buffer: ArrayBuffer | Uint8Array): string {
        return ScheduleStore.decodeBuffer(buffer);
    }
    private static decodeBuffer(buffer: ArrayBuffer | Uint8Array): string {
        const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
        const utf8Text = ScheduleStore.tryDecode(bytes, 'utf-8');
        if (ScheduleStore.looksLikeScheduleHtml(utf8Text)) {
            return utf8Text;
        }
        const gbkText = ScheduleStore.tryDecode(bytes, 'gbk');
        if (ScheduleStore.looksLikeScheduleHtml(gbkText)) {
            return gbkText;
        }
        const gb2312Text = ScheduleStore.tryDecode(bytes, 'gb2312');
        if (ScheduleStore.looksLikeScheduleHtml(gb2312Text)) {
            return gb2312Text;
        }
        return gbkText.length > utf8Text.length ? gbkText : utf8Text;
    }
    private static tryDecode(bytes: Uint8Array, encoding: string): string {
        try {
            const decoder = util.TextDecoder.create(encoding, { ignoreBOM: true });
            return decoder.decodeWithStream(bytes);
        }
        catch (e) {
            return '';
        }
    }
    private static looksLikeScheduleHtml(text: string): boolean {
        if (!text || text.length < 50) {
            return false;
        }
        return text.indexOf('manualArrangeCourseTable') >= 0
            || text.indexOf('节次/周次') >= 0
            || text.indexOf('学生课表') >= 0
            || (text.indexOf('<table') >= 0 && text.indexOf('学年') >= 0);
    }
}
