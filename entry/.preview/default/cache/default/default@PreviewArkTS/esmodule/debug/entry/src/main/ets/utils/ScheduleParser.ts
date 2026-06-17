import type { ImportedSchedule, ScheduleEntry } from '../model/CourseModel';
const PERIOD_LABELS: string[] = [
    '第一节', '第二节', '第三节', '第四节', '第五节',
    '第六节', '第七节', '第八节', '第九节', '第十节'
];
interface ParsedCellBlock {
    courseName: string;
    courseCode: string;
    teacher: string;
    weekRangeText: string;
    classroom: string;
    weeks: number[];
}
interface TableCell {
    content: string;
    rowspan: number;
}
/**
 * 解析教务系统导出的 xls（HTML 表格）课表文件
 */
export class ScheduleParser {
    static parseHtmlContent(html: string): ImportedSchedule {
        const semester = ScheduleParser.extractSemester(html);
        const studentId = ScheduleParser.extractField(html, '学号:', '学生姓名');
        const studentName = ScheduleParser.extractField(html, '学生姓名:', '所属班级');
        const className = ScheduleParser.extractField(html, '所属班级:', '总学分');
        const entries = ScheduleParser.parseGridTable(html);
        const maxWeek = ScheduleParser.calcMaxWeek(entries);
        const result: ImportedSchedule = {
            semester: semester,
            studentId: studentId,
            studentName: studentName,
            className: className,
            entries: entries,
            maxWeek: maxWeek,
        };
        return result;
    }
    private static extractSemester(html: string): string {
        const patterns: RegExp[] = [
            /(\d{4}-\d{4}学年[^<\n\r]{0,24})/,
            /(\d{4}-\d{4}\s*学年第[一二12]学期)/,
            /(\d{4}-\d{4}\s*第[12]学期)/,
        ];
        for (let i = 0; i < patterns.length; i++) {
            const match = html.match(patterns[i]);
            if (match && match[1]) {
                return match[1].replace(/&nbsp;/g, ' ').trim();
            }
        }
        return '';
    }
    private static extractField(html: string, startKey: string, endKey: string): string {
        const start = html.indexOf(startKey);
        if (start < 0) {
            return '';
        }
        const from = start + startKey.length;
        const end = html.indexOf(endKey, from);
        const raw = end >= 0 ? html.substring(from, end) : html.substring(from, from + 40);
        return raw.replace(/&nbsp;/g, ' ').replace(/\s+/g, '').trim();
    }
    private static parseGridTable(html: string): ScheduleEntry[] {
        let tableStart = html.indexOf('id="manualArrangeCourseTable"');
        if (tableStart < 0) {
            const marker = html.indexOf('节次/周次');
            if (marker >= 0) {
                tableStart = html.lastIndexOf('<table', marker);
            }
        }
        const tableHtml = tableStart >= 0 ? html.substring(tableStart) : html;
        const rowMatches = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi);
        if (!rowMatches) {
            return [];
        }
        const entries: ScheduleEntry[] = [];
        const rowspanLeft: number[] = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < rowMatches.length; i++) {
            const rowHtml = rowMatches[i];
            if (rowHtml.indexOf('节次/周次') >= 0 || rowHtml.indexOf('<thead>') >= 0) {
                continue;
            }
            const period = ScheduleParser.parsePeriod(rowHtml);
            if (period <= 0) {
                continue;
            }
            const cells = ScheduleParser.parseRowCells(rowHtml);
            if (cells.length === 0) {
                continue;
            }
            let day = 0;
            for (let c = 0; c < cells.length; c++) {
                while (day < 7 && rowspanLeft[day] > 0) {
                    rowspanLeft[day]--;
                    day++;
                }
                if (day >= 7) {
                    break;
                }
                const cell = cells[c];
                const span = cell.rowspan > 0 ? cell.rowspan : 1;
                const blocks = ScheduleParser.parseCellBlocks(cell.content);
                for (let b = 0; b < blocks.length; b++) {
                    const block = blocks[b];
                    if (!block.courseName) {
                        continue;
                    }
                    const entry: ScheduleEntry = {
                        courseCode: block.courseCode,
                        courseName: block.courseName,
                        teacher: block.teacher,
                        classroom: block.classroom,
                        dayOfWeek: day + 1,
                        startPeriod: period,
                        endPeriod: period + span - 1,
                        span: span,
                        weeks: block.weeks,
                        weekRangeText: block.weekRangeText,
                    };
                    entries.push(entry);
                }
                if (span > 1) {
                    rowspanLeft[day] = span - 1;
                }
                day++;
            }
        }
        return entries;
    }
    private static parsePeriod(rowHtml: string): number {
        for (let i = 0; i < PERIOD_LABELS.length; i++) {
            if (rowHtml.indexOf(PERIOD_LABELS[i]) >= 0) {
                return i + 1;
            }
        }
        const digitMatch = rowHtml.match(/第\s*(\d{1,2})\s*节/);
        if (digitMatch) {
            const period = parseInt(digitMatch[1]);
            if (period >= 1 && period <= 12) {
                return period;
            }
        }
        return 0;
    }
    private static parseRowCells(rowHtml: string): TableCell[] {
        const cells: TableCell[] = [];
        const tdMatches = rowHtml.match(/<td[\s\S]*?<\/td>/gi);
        if (!tdMatches || tdMatches.length <= 1) {
            return cells;
        }
        for (let i = 1; i < tdMatches.length; i++) {
            const td = tdMatches[i];
            const rowspanMatch = td.match(/rowspan="(\d+)"/i);
            const rowspan = rowspanMatch ? parseInt(rowspanMatch[1]) : 1;
            const content = ScheduleParser.stripHtml(td);
            if (content.length > 0) {
                const cell: TableCell = { content: content, rowspan: rowspan };
                cells.push(cell);
            }
            else {
                const emptyCell: TableCell = { content: '', rowspan: 1 };
                cells.push(emptyCell);
            }
        }
        return cells;
    }
    private static stripHtml(text: string): string {
        return text
            .replace(/<br[^>]*>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/\r/g, '')
            .trim();
    }
    private static parseCellBlocks(content: string): ParsedCellBlock[] {
        const lines = content.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0);
        const blocks: ParsedCellBlock[] = [];
        let current: ParsedCellBlock | null = null;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const courseMatch = line.match(/^(.+?)\s*\(([A-Za-z0-9._-]+)\)\s*$/);
            if (courseMatch) {
                if (current) {
                    blocks.push(current);
                }
                current = {
                    courseName: courseMatch[1].trim(),
                    courseCode: courseMatch[2].trim(),
                    teacher: '',
                    weekRangeText: '',
                    classroom: '',
                    weeks: [],
                };
                continue;
            }
            const teacherMatch = line.match(/^\(([^)]+)\)$/);
            if (teacherMatch && current && !current.teacher) {
                current.teacher = teacherMatch[1].trim();
                continue;
            }
            const weekLocMatch = line.match(/^\((.+)\)$/);
            if (weekLocMatch && current) {
                const inner = weekLocMatch[1].trim();
                const splitIndex = ScheduleParser.findWeekLocationSplit(inner);
                const weekPart = inner.substring(0, splitIndex).trim();
                const locPart = inner.substring(splitIndex).trim();
                current.weekRangeText = weekPart;
                current.classroom = locPart;
                current.weeks = ScheduleParser.parseWeekNumbers(weekPart);
            }
        }
        if (current) {
            blocks.push(current);
        }
        return blocks;
    }
    private static findWeekLocationSplit(inner: string): number {
        const roomIndex = inner.search(/[\u4e00-\u9fa5]/);
        if (roomIndex > 0) {
            return roomIndex;
        }
        const spaceIndex = inner.indexOf('  ');
        return spaceIndex > 0 ? spaceIndex : inner.length;
    }
    static parseWeekNumbers(weekText: string): number[] {
        const result: number[] = [];
        const parts = weekText.split(',');
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (part.length === 0) {
                continue;
            }
            const isOdd = part.indexOf('单') >= 0;
            const isEven = part.indexOf('双') >= 0;
            const clean = part.replace('单', '').replace('双', '').trim();
            if (clean.indexOf('-') >= 0) {
                const rangeParts = clean.split('-');
                const start = parseInt(rangeParts[0]);
                const end = parseInt(rangeParts[1]);
                if (!isNaN(start) && !isNaN(end)) {
                    for (let w = start; w <= end; w++) {
                        if (isOdd && w % 2 === 0) {
                            continue;
                        }
                        if (isEven && w % 2 === 1) {
                            continue;
                        }
                        if (result.indexOf(w) < 0) {
                            result.push(w);
                        }
                    }
                }
            }
            else {
                const week = parseInt(clean);
                if (!isNaN(week) && result.indexOf(week) < 0) {
                    result.push(week);
                }
            }
        }
        result.sort((a: number, b: number) => a - b);
        return result;
    }
    private static calcMaxWeek(entries: ScheduleEntry[]): number {
        let maxWeek = 18;
        for (let i = 0; i < entries.length; i++) {
            const weeks = entries[i].weeks;
            for (let j = 0; j < weeks.length; j++) {
                if (weeks[j] > maxWeek) {
                    maxWeek = weeks[j];
                }
            }
        }
        return maxWeek;
    }
}
