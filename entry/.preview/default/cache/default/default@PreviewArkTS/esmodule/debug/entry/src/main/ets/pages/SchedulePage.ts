if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DetailRow_Params {
    label?: string;
    value?: string;
}
interface ScheduleGridCell_Params {
    cell?: ScheduleCell | null;
    isCovered?: boolean;
    rowHeight?: number;
    cellGap?: number;
    colorStyle?: CourseColorStyle;
    onCellTap?: (cell: ScheduleCell) => void;
}
interface SchedulePage_Params {
    embedded?: boolean;
    tabToken?: number;
    currentSemester?: string;
    currentScheduleKey?: string;
    anchorWeek?: number;
    viewWeekNum?: number;
    weekDateLabels?: string[];
    maxWeek?: number;
    scheduleCells?: ScheduleCell[];
    isLoading?: boolean;
    isImporting?: boolean;
    showDetail?: boolean;
    detailCourse?: ScheduleCell | null;
    toastMsg?: string;
    showToast?: boolean;
    showSemesterPicker?: boolean;
    showWeekPicker?: boolean;
    showMenuPanel?: boolean;
    showDeletePicker?: boolean;
    showDeleteConfirm?: boolean;
    deleteConfirmText?: string;
    catalog?: YearSemesterGroup[];
    pickerYear?: string;
    pickerTerm?: number;
    deleteYear?: string;
    deleteTerm1Checked?: boolean;
    deleteTerm2Checked?: boolean;
    pendingDeleteKeys?: string[];
    weekHeaders?: string[];
    periodRange?: number[];
    todayDayOfWeek?: number;
}
import router from "@ohos:router";
import picker from "@ohos:file.picker";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import { EmptyPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/EmptyPlaceholder&";
import { ConfirmDialog } from "@normalized:N&&&entry/src/main/ets/components/ConfirmDialog&";
import type { ScheduleCell, YearSemesterGroup } from '../model/CourseModel';
import { ScheduleStore } from "@normalized:N&&&entry/src/main/ets/utils/ScheduleStore&";
import { ScheduleSemesterUtil } from "@normalized:N&&&entry/src/main/ets/utils/ScheduleSemesterUtil&";
import { getCurrentDayOfWeek, getPeriodTimeSlot, getWeekDateLabels, syncCurrentTeachingWeek } from "@normalized:N&&&entry/src/main/ets/utils/DateUtils&";
interface CourseColorStyle {
    bg: string;
    text: string;
}
const PERIOD_ROW_HEIGHT: number = 56;
const CELL_GAP: number = 2;
const TIME_COL_WIDTH: number = 46;
const COURSE_COLORS: CourseColorStyle[] = [
    { bg: '#E8F4FD', text: '#1976D2' },
    { bg: '#FFF3E0', text: '#F57C00' },
    { bg: '#E8F5E9', text: '#388E3C' },
    { bg: '#F3E5F5', text: '#7B1FA2' },
    { bg: '#FCE4EC', text: '#C2185B' },
    { bg: '#E0F7FA', text: '#00838F' },
    { bg: '#FFF8E1', text: '#F9A825' },
    { bg: '#EDE7F6', text: '#512DA8' },
];
export class SchedulePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__embedded = new SynchedPropertySimpleOneWayPU(params.embedded, this, "embedded");
        this.__tabToken = new SynchedPropertySimpleOneWayPU(params.tabToken, this, "tabToken");
        this.__currentSemester = this.createStorageLink('currentSemester', '', "currentSemester");
        this.__currentScheduleKey = this.createStorageLink('currentScheduleKey', '', "currentScheduleKey");
        this.__anchorWeek = this.createStorageLink('currentWeek', 1, "anchorWeek");
        this.__viewWeekNum = new ObservedPropertySimplePU(1, this, "viewWeekNum");
        this.__weekDateLabels = new ObservedPropertyObjectPU([], this, "weekDateLabels");
        this.__maxWeek = new ObservedPropertySimplePU(20, this, "maxWeek");
        this.__scheduleCells = new ObservedPropertyObjectPU([], this, "scheduleCells");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__isImporting = new ObservedPropertySimplePU(false, this, "isImporting");
        this.__showDetail = new ObservedPropertySimplePU(false, this, "showDetail");
        this.__detailCourse = new ObservedPropertyObjectPU(null, this, "detailCourse");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.__showSemesterPicker = new ObservedPropertySimplePU(false, this, "showSemesterPicker");
        this.__showWeekPicker = new ObservedPropertySimplePU(false, this, "showWeekPicker");
        this.__showMenuPanel = new ObservedPropertySimplePU(false, this, "showMenuPanel");
        this.__showDeletePicker = new ObservedPropertySimplePU(false, this, "showDeletePicker");
        this.__showDeleteConfirm = new ObservedPropertySimplePU(false, this, "showDeleteConfirm");
        this.__deleteConfirmText = new ObservedPropertySimplePU('', this, "deleteConfirmText");
        this.__catalog = new ObservedPropertyObjectPU([], this, "catalog");
        this.__pickerYear = new ObservedPropertySimplePU('', this, "pickerYear");
        this.__pickerTerm = new ObservedPropertySimplePU(1, this, "pickerTerm");
        this.__deleteYear = new ObservedPropertySimplePU('', this, "deleteYear");
        this.__deleteTerm1Checked = new ObservedPropertySimplePU(false, this, "deleteTerm1Checked");
        this.__deleteTerm2Checked = new ObservedPropertySimplePU(false, this, "deleteTerm2Checked");
        this.__pendingDeleteKeys = new ObservedPropertyObjectPU([], this, "pendingDeleteKeys");
        this.weekHeaders = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        this.periodRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.__todayDayOfWeek = new ObservedPropertySimplePU(getCurrentDayOfWeek(), this, "todayDayOfWeek");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("tabToken", this.onTabTokenChanged);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SchedulePage_Params) {
        if (params.embedded === undefined) {
            this.__embedded.set(false);
        }
        if (params.tabToken === undefined) {
            this.__tabToken.set(0);
        }
        if (params.viewWeekNum !== undefined) {
            this.viewWeekNum = params.viewWeekNum;
        }
        if (params.weekDateLabels !== undefined) {
            this.weekDateLabels = params.weekDateLabels;
        }
        if (params.maxWeek !== undefined) {
            this.maxWeek = params.maxWeek;
        }
        if (params.scheduleCells !== undefined) {
            this.scheduleCells = params.scheduleCells;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.isImporting !== undefined) {
            this.isImporting = params.isImporting;
        }
        if (params.showDetail !== undefined) {
            this.showDetail = params.showDetail;
        }
        if (params.detailCourse !== undefined) {
            this.detailCourse = params.detailCourse;
        }
        if (params.toastMsg !== undefined) {
            this.toastMsg = params.toastMsg;
        }
        if (params.showToast !== undefined) {
            this.showToast = params.showToast;
        }
        if (params.showSemesterPicker !== undefined) {
            this.showSemesterPicker = params.showSemesterPicker;
        }
        if (params.showWeekPicker !== undefined) {
            this.showWeekPicker = params.showWeekPicker;
        }
        if (params.showMenuPanel !== undefined) {
            this.showMenuPanel = params.showMenuPanel;
        }
        if (params.showDeletePicker !== undefined) {
            this.showDeletePicker = params.showDeletePicker;
        }
        if (params.showDeleteConfirm !== undefined) {
            this.showDeleteConfirm = params.showDeleteConfirm;
        }
        if (params.deleteConfirmText !== undefined) {
            this.deleteConfirmText = params.deleteConfirmText;
        }
        if (params.catalog !== undefined) {
            this.catalog = params.catalog;
        }
        if (params.pickerYear !== undefined) {
            this.pickerYear = params.pickerYear;
        }
        if (params.pickerTerm !== undefined) {
            this.pickerTerm = params.pickerTerm;
        }
        if (params.deleteYear !== undefined) {
            this.deleteYear = params.deleteYear;
        }
        if (params.deleteTerm1Checked !== undefined) {
            this.deleteTerm1Checked = params.deleteTerm1Checked;
        }
        if (params.deleteTerm2Checked !== undefined) {
            this.deleteTerm2Checked = params.deleteTerm2Checked;
        }
        if (params.pendingDeleteKeys !== undefined) {
            this.pendingDeleteKeys = params.pendingDeleteKeys;
        }
        if (params.weekHeaders !== undefined) {
            this.weekHeaders = params.weekHeaders;
        }
        if (params.periodRange !== undefined) {
            this.periodRange = params.periodRange;
        }
        if (params.todayDayOfWeek !== undefined) {
            this.todayDayOfWeek = params.todayDayOfWeek;
        }
    }
    updateStateVars(params: SchedulePage_Params) {
        this.__embedded.reset(params.embedded);
        this.__tabToken.reset(params.tabToken);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__embedded.purgeDependencyOnElmtId(rmElmtId);
        this.__tabToken.purgeDependencyOnElmtId(rmElmtId);
        this.__currentSemester.purgeDependencyOnElmtId(rmElmtId);
        this.__currentScheduleKey.purgeDependencyOnElmtId(rmElmtId);
        this.__anchorWeek.purgeDependencyOnElmtId(rmElmtId);
        this.__viewWeekNum.purgeDependencyOnElmtId(rmElmtId);
        this.__weekDateLabels.purgeDependencyOnElmtId(rmElmtId);
        this.__maxWeek.purgeDependencyOnElmtId(rmElmtId);
        this.__scheduleCells.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__isImporting.purgeDependencyOnElmtId(rmElmtId);
        this.__showDetail.purgeDependencyOnElmtId(rmElmtId);
        this.__detailCourse.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
        this.__showSemesterPicker.purgeDependencyOnElmtId(rmElmtId);
        this.__showWeekPicker.purgeDependencyOnElmtId(rmElmtId);
        this.__showMenuPanel.purgeDependencyOnElmtId(rmElmtId);
        this.__showDeletePicker.purgeDependencyOnElmtId(rmElmtId);
        this.__showDeleteConfirm.purgeDependencyOnElmtId(rmElmtId);
        this.__deleteConfirmText.purgeDependencyOnElmtId(rmElmtId);
        this.__catalog.purgeDependencyOnElmtId(rmElmtId);
        this.__pickerYear.purgeDependencyOnElmtId(rmElmtId);
        this.__pickerTerm.purgeDependencyOnElmtId(rmElmtId);
        this.__deleteYear.purgeDependencyOnElmtId(rmElmtId);
        this.__deleteTerm1Checked.purgeDependencyOnElmtId(rmElmtId);
        this.__deleteTerm2Checked.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingDeleteKeys.purgeDependencyOnElmtId(rmElmtId);
        this.__todayDayOfWeek.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__embedded.aboutToBeDeleted();
        this.__tabToken.aboutToBeDeleted();
        this.__currentSemester.aboutToBeDeleted();
        this.__currentScheduleKey.aboutToBeDeleted();
        this.__anchorWeek.aboutToBeDeleted();
        this.__viewWeekNum.aboutToBeDeleted();
        this.__weekDateLabels.aboutToBeDeleted();
        this.__maxWeek.aboutToBeDeleted();
        this.__scheduleCells.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__isImporting.aboutToBeDeleted();
        this.__showDetail.aboutToBeDeleted();
        this.__detailCourse.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        this.__showSemesterPicker.aboutToBeDeleted();
        this.__showWeekPicker.aboutToBeDeleted();
        this.__showMenuPanel.aboutToBeDeleted();
        this.__showDeletePicker.aboutToBeDeleted();
        this.__showDeleteConfirm.aboutToBeDeleted();
        this.__deleteConfirmText.aboutToBeDeleted();
        this.__catalog.aboutToBeDeleted();
        this.__pickerYear.aboutToBeDeleted();
        this.__pickerTerm.aboutToBeDeleted();
        this.__deleteYear.aboutToBeDeleted();
        this.__deleteTerm1Checked.aboutToBeDeleted();
        this.__deleteTerm2Checked.aboutToBeDeleted();
        this.__pendingDeleteKeys.aboutToBeDeleted();
        this.__todayDayOfWeek.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __embedded: SynchedPropertySimpleOneWayPU<boolean>;
    get embedded() {
        return this.__embedded.get();
    }
    set embedded(newValue: boolean) {
        this.__embedded.set(newValue);
    }
    private __tabToken: SynchedPropertySimpleOneWayPU<number>;
    get tabToken() {
        return this.__tabToken.get();
    }
    set tabToken(newValue: number) {
        this.__tabToken.set(newValue);
    }
    private __currentSemester: ObservedPropertyAbstractPU<string>;
    get currentSemester() {
        return this.__currentSemester.get();
    }
    set currentSemester(newValue: string) {
        this.__currentSemester.set(newValue);
    }
    private __currentScheduleKey: ObservedPropertyAbstractPU<string>;
    get currentScheduleKey() {
        return this.__currentScheduleKey.get();
    }
    set currentScheduleKey(newValue: string) {
        this.__currentScheduleKey.set(newValue);
    }
    private __anchorWeek: ObservedPropertyAbstractPU<number>;
    get anchorWeek() {
        return this.__anchorWeek.get();
    }
    set anchorWeek(newValue: number) {
        this.__anchorWeek.set(newValue);
    }
    private __viewWeekNum: ObservedPropertySimplePU<number>;
    get viewWeekNum() {
        return this.__viewWeekNum.get();
    }
    set viewWeekNum(newValue: number) {
        this.__viewWeekNum.set(newValue);
    }
    private __weekDateLabels: ObservedPropertyObjectPU<string[]>;
    get weekDateLabels() {
        return this.__weekDateLabels.get();
    }
    set weekDateLabels(newValue: string[]) {
        this.__weekDateLabels.set(newValue);
    }
    private __maxWeek: ObservedPropertySimplePU<number>;
    get maxWeek() {
        return this.__maxWeek.get();
    }
    set maxWeek(newValue: number) {
        this.__maxWeek.set(newValue);
    }
    private __scheduleCells: ObservedPropertyObjectPU<ScheduleCell[]>;
    get scheduleCells() {
        return this.__scheduleCells.get();
    }
    set scheduleCells(newValue: ScheduleCell[]) {
        this.__scheduleCells.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __isImporting: ObservedPropertySimplePU<boolean>;
    get isImporting() {
        return this.__isImporting.get();
    }
    set isImporting(newValue: boolean) {
        this.__isImporting.set(newValue);
    }
    private __showDetail: ObservedPropertySimplePU<boolean>;
    get showDetail() {
        return this.__showDetail.get();
    }
    set showDetail(newValue: boolean) {
        this.__showDetail.set(newValue);
    }
    private __detailCourse: ObservedPropertyObjectPU<ScheduleCell | null>;
    get detailCourse() {
        return this.__detailCourse.get();
    }
    set detailCourse(newValue: ScheduleCell | null) {
        this.__detailCourse.set(newValue);
    }
    private __toastMsg: ObservedPropertySimplePU<string>;
    get toastMsg() {
        return this.__toastMsg.get();
    }
    set toastMsg(newValue: string) {
        this.__toastMsg.set(newValue);
    }
    private __showToast: ObservedPropertySimplePU<boolean>;
    get showToast() {
        return this.__showToast.get();
    }
    set showToast(newValue: boolean) {
        this.__showToast.set(newValue);
    }
    private __showSemesterPicker: ObservedPropertySimplePU<boolean>;
    get showSemesterPicker() {
        return this.__showSemesterPicker.get();
    }
    set showSemesterPicker(newValue: boolean) {
        this.__showSemesterPicker.set(newValue);
    }
    private __showWeekPicker: ObservedPropertySimplePU<boolean>;
    get showWeekPicker() {
        return this.__showWeekPicker.get();
    }
    set showWeekPicker(newValue: boolean) {
        this.__showWeekPicker.set(newValue);
    }
    private __showMenuPanel: ObservedPropertySimplePU<boolean>;
    get showMenuPanel() {
        return this.__showMenuPanel.get();
    }
    set showMenuPanel(newValue: boolean) {
        this.__showMenuPanel.set(newValue);
    }
    private __showDeletePicker: ObservedPropertySimplePU<boolean>;
    get showDeletePicker() {
        return this.__showDeletePicker.get();
    }
    set showDeletePicker(newValue: boolean) {
        this.__showDeletePicker.set(newValue);
    }
    private __showDeleteConfirm: ObservedPropertySimplePU<boolean>;
    get showDeleteConfirm() {
        return this.__showDeleteConfirm.get();
    }
    set showDeleteConfirm(newValue: boolean) {
        this.__showDeleteConfirm.set(newValue);
    }
    private __deleteConfirmText: ObservedPropertySimplePU<string>;
    get deleteConfirmText() {
        return this.__deleteConfirmText.get();
    }
    set deleteConfirmText(newValue: string) {
        this.__deleteConfirmText.set(newValue);
    }
    private __catalog: ObservedPropertyObjectPU<YearSemesterGroup[]>;
    get catalog() {
        return this.__catalog.get();
    }
    set catalog(newValue: YearSemesterGroup[]) {
        this.__catalog.set(newValue);
    }
    private __pickerYear: ObservedPropertySimplePU<string>;
    get pickerYear() {
        return this.__pickerYear.get();
    }
    set pickerYear(newValue: string) {
        this.__pickerYear.set(newValue);
    }
    private __pickerTerm: ObservedPropertySimplePU<number>;
    get pickerTerm() {
        return this.__pickerTerm.get();
    }
    set pickerTerm(newValue: number) {
        this.__pickerTerm.set(newValue);
    }
    private __deleteYear: ObservedPropertySimplePU<string>;
    get deleteYear() {
        return this.__deleteYear.get();
    }
    set deleteYear(newValue: string) {
        this.__deleteYear.set(newValue);
    }
    private __deleteTerm1Checked: ObservedPropertySimplePU<boolean>;
    get deleteTerm1Checked() {
        return this.__deleteTerm1Checked.get();
    }
    set deleteTerm1Checked(newValue: boolean) {
        this.__deleteTerm1Checked.set(newValue);
    }
    private __deleteTerm2Checked: ObservedPropertySimplePU<boolean>;
    get deleteTerm2Checked() {
        return this.__deleteTerm2Checked.get();
    }
    set deleteTerm2Checked(newValue: boolean) {
        this.__deleteTerm2Checked.set(newValue);
    }
    private __pendingDeleteKeys: ObservedPropertyObjectPU<string[]>;
    get pendingDeleteKeys() {
        return this.__pendingDeleteKeys.get();
    }
    set pendingDeleteKeys(newValue: string[]) {
        this.__pendingDeleteKeys.set(newValue);
    }
    private weekHeaders: string[];
    private periodRange: number[];
    private __todayDayOfWeek: ObservedPropertySimplePU<number>;
    get todayDayOfWeek() {
        return this.__todayDayOfWeek.get();
    }
    set todayDayOfWeek(newValue: number) {
        this.__todayDayOfWeek.set(newValue);
    }
    aboutToAppear(): void {
        this.resetToCurrentDateView();
        this.refreshData();
    }
    onTabTokenChanged(): void {
        if (this.embedded && this.tabToken > 0) {
            this.resetToCurrentDateView();
            this.refreshData();
        }
    }
    /** Tab 嵌入时每次进入都回到本周（当前教学周 + 今天日期） */
    private resetToCurrentDateView(): void {
        this.todayDayOfWeek = getCurrentDayOfWeek();
        if (this.embedded) {
            const week = syncCurrentTeachingWeek(this.currentScheduleKey);
            this.viewWeekNum = week;
        }
        else if (this.viewWeekNum <= 0) {
            this.viewWeekNum = syncCurrentTeachingWeek(this.currentScheduleKey);
        }
    }
    private refreshData(): void {
        this.isLoading = true;
        const schedule = ScheduleStore.getSchedule();
        if (schedule) {
            this.maxWeek = schedule.maxWeek;
            if (this.viewWeekNum > this.maxWeek) {
                this.viewWeekNum = this.anchorWeek > 0 ? this.anchorWeek : 1;
            }
            this.weekDateLabels = getWeekDateLabels(this.viewWeekNum, this.anchorWeek);
            this.scheduleCells = ScheduleStore.getCellsForWeek(`第${this.viewWeekNum}周`);
        }
        else {
            this.maxWeek = 20;
            this.weekDateLabels = [];
            this.scheduleCells = [];
        }
        this.isLoading = false;
    }
    private isViewingCurrentWeek(): boolean {
        return this.viewWeekNum === this.anchorWeek;
    }
    private switchToWeek(weekNum: number): void {
        this.viewWeekNum = weekNum;
        this.weekDateLabels = getWeekDateLabels(weekNum, this.anchorWeek);
        this.scheduleCells = ScheduleStore.getCellsForWeek(`第${weekNum}周`);
        if (weekNum === this.anchorWeek) {
            AppStorage.setOrCreate('currentWeek', weekNum);
            ScheduleStore.syncTodayCourses();
        }
        this.showWeekPicker = false;
    }
    private returnToCurrentWeek(): void {
        const week = syncCurrentTeachingWeek(this.currentScheduleKey);
        this.switchToWeek(week);
    }
    private getWeekPickerOptions(): number[] {
        const options: number[] = [];
        for (let i = 1; i <= this.maxWeek; i++) {
            options.push(i);
        }
        return options;
    }
    private getCourseColor(code: string): CourseColorStyle {
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
            hash = (hash + code.charCodeAt(i)) % COURSE_COLORS.length;
        }
        return COURSE_COLORS[hash];
    }
    private openSemesterPicker(): void {
        this.showMenuPanel = false;
        this.catalog = ScheduleStore.getCatalog();
        if (this.catalog.length === 0) {
            return;
        }
        const current = ScheduleSemesterUtil.fromKey(this.currentScheduleKey);
        if (current) {
            this.pickerYear = current.yearRange;
            this.pickerTerm = current.term;
        }
        else {
            this.pickerYear = this.catalog[0].yearRange;
            this.pickerTerm = this.catalog[0].terms[0];
        }
        this.showSemesterPicker = true;
    }
    private getTermsForPickerYear(): number[] {
        for (let i = 0; i < this.catalog.length; i++) {
            if (this.catalog[i].yearRange === this.pickerYear) {
                return this.catalog[i].terms;
            }
        }
        return [];
    }
    private isTermAvailable(term: number): boolean {
        return this.getTermsForPickerYear().indexOf(term) >= 0;
    }
    private confirmSemesterSwitch(): void {
        if (!this.isTermAvailable(this.pickerTerm)) {
            return;
        }
        const key = ScheduleSemesterUtil.buildKey(this.pickerYear, this.pickerTerm);
        if (ScheduleStore.switchTo(key)) {
            this.viewWeekNum = this.anchorWeek > 0 ? this.anchorWeek : 1;
            this.refreshData();
            this.showSemesterPicker = false;
        }
    }
    private onPickerYearSelect(year: string): void {
        this.pickerYear = year;
        const terms = this.getTermsForPickerYear();
        if (terms.indexOf(this.pickerTerm) < 0 && terms.length > 0) {
            this.pickerTerm = terms[0];
        }
    }
    private openDeletePicker(): void {
        this.showMenuPanel = false;
        this.catalog = ScheduleStore.getCatalog();
        if (this.catalog.length === 0) {
            return;
        }
        const current = ScheduleSemesterUtil.fromKey(this.currentScheduleKey);
        if (current) {
            this.deleteYear = current.yearRange;
            this.deleteTerm1Checked = current.term === 1;
            this.deleteTerm2Checked = current.term === 2;
        }
        else {
            this.deleteYear = this.catalog[0].yearRange;
            this.deleteTerm1Checked = false;
            this.deleteTerm2Checked = false;
        }
        this.resetDeleteChecksForYear();
        this.showDeletePicker = true;
    }
    private getDeleteTermsForYear(): number[] {
        for (let i = 0; i < this.catalog.length; i++) {
            if (this.catalog[i].yearRange === this.deleteYear) {
                return this.catalog[i].terms;
            }
        }
        return [];
    }
    private isDeleteTermAvailable(term: number): boolean {
        return this.getDeleteTermsForYear().indexOf(term) >= 0;
    }
    private onDeleteYearSelect(year: string): void {
        this.deleteYear = year;
        this.resetDeleteChecksForYear();
    }
    private resetDeleteChecksForYear(): void {
        if (!this.isDeleteTermAvailable(1)) {
            this.deleteTerm1Checked = false;
        }
        if (!this.isDeleteTermAvailable(2)) {
            this.deleteTerm2Checked = false;
        }
    }
    private getSelectedDeleteKeys(): string[] {
        const keys: string[] = [];
        if (this.deleteTerm1Checked && this.isDeleteTermAvailable(1)) {
            keys.push(ScheduleSemesterUtil.buildKey(this.deleteYear, 1));
        }
        if (this.deleteTerm2Checked && this.isDeleteTermAvailable(2)) {
            keys.push(ScheduleSemesterUtil.buildKey(this.deleteYear, 2));
        }
        return keys;
    }
    private getSelectedDeleteLabels(): string[] {
        const labels: string[] = [];
        const keys = this.getSelectedDeleteKeys();
        for (let i = 0; i < keys.length; i++) {
            const meta = ScheduleSemesterUtil.fromKey(keys[i]);
            if (meta) {
                labels.push(meta.displayLabel);
            }
        }
        return labels;
    }
    private requestDelete(): void {
        const keys = this.getSelectedDeleteKeys();
        if (keys.length === 0) {
            this.showToastOnce('请勾选要删除的学期');
            return;
        }
        const labels = this.getSelectedDeleteLabels();
        this.pendingDeleteKeys = keys;
        this.deleteConfirmText = `确定删除以下课表吗？\n${labels.join('、')}`;
        this.showDeletePicker = false;
        this.showDeleteConfirm = true;
    }
    private confirmDelete(): void {
        const count = ScheduleStore.deleteSchedules(this.pendingDeleteKeys);
        this.showDeleteConfirm = false;
        this.pendingDeleteKeys = [];
        if (count > 0) {
            this.viewWeekNum = this.anchorWeek > 0 ? this.anchorWeek : 1;
            this.refreshData();
            this.showToastOnce(`已删除 ${count} 个学期课表`);
        }
        else {
            this.showToastOnce('删除失败，请重试');
        }
    }
    private async importSchedule(): Promise<void> {
        this.showMenuPanel = false;
        try {
            this.isImporting = true;
            const documentPicker = new picker.DocumentViewPicker();
            const uris = await documentPicker.select({
                maxSelectNumber: 1,
                fileSuffixFilters: ['.xls', '.XLS', '.xlsx', '.XLSX', '.html', '.HTML', '.htm', '.HTM'],
            });
            if (uris && uris.length > 0) {
                const schedule = await ScheduleStore.importFromUri(uris[0]);
                const meta = ScheduleSemesterUtil.parse(schedule.semester);
                this.viewWeekNum = this.anchorWeek > 0 ? this.anchorWeek : 1;
                this.refreshData();
                this.showToastOnce(meta ? `${meta.displayLabel} 课表导入成功` : '课表导入成功');
            }
        }
        catch (e) {
            const errMsg = e instanceof Error ? e.message : '';
            this.showToastOnce(errMsg.length > 0 ? errMsg : '导入失败，请确认文件格式正确');
            console.error('importSchedule failed: ' + JSON.stringify(e));
        }
        finally {
            this.isImporting = false;
        }
    }
    private isCoveredBySpan(day: number, period: number): boolean {
        return this.scheduleCells.some((c: ScheduleCell) => c.dayOfWeek === day && c.startPeriod < period && c.endPeriod >= period);
    }
    private getCellAt(day: number, period: number): ScheduleCell | null {
        const matched = this.scheduleCells.find((c: ScheduleCell) => c.dayOfWeek === day && c.startPeriod === period);
        return matched !== undefined ? matched : null;
    }
    private showToastOnce(msg: string): void {
        this.toastMsg = msg;
        this.showToast = true;
        setTimeout(() => { this.showToast = false; }, 2000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.BottomEnd });
            Stack.debugLine("entry/src/main/ets/pages/SchedulePage.ets(338:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(339:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FAFBFC');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LoadingPlaceholder(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 341, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "LoadingPlaceholder" });
                    }
                });
            }
            else if (ScheduleStore.getScheduleCount() === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildEmptyState.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildScheduleHeader.bind(this)();
                    this.buildDayHeaderRow.bind(this)();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/SchedulePage.ets(347:11)", "entry");
                        Scroll.width('100%');
                        Scroll.layoutWeight(1);
                        Scroll.scrollBar(BarState.Off);
                        Scroll.edgeEffect(EdgeEffect.Spring);
                    }, Scroll);
                    this.buildScheduleBody.bind(this)();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isLoading && ScheduleStore.getScheduleCount() > 0 && !this.isViewingCurrentWeek()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildReturnFab.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showWeekPicker) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildWeekPicker.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showSemesterPicker) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildSemesterPicker.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showMenuPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildMenuPanel.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDeletePicker) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildDeletePicker.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDeleteConfirm) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ConfirmDialog(this, {
                                    title: '删除课表',
                                    content: this.deleteConfirmText,
                                    visible: this.__showDeleteConfirm,
                                    confirmText: '删除',
                                    cancelText: '取消',
                                    onConfirm: () => this.confirmDelete(),
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 377, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: '删除课表',
                                        content: this.deleteConfirmText,
                                        visible: this.showDeleteConfirm,
                                        confirmText: '删除',
                                        cancelText: '取消',
                                        onConfirm: () => this.confirmDelete()
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: '删除课表',
                                    content: this.deleteConfirmText,
                                    confirmText: '删除',
                                    cancelText: '取消'
                                });
                            }
                        }, { name: "ConfirmDialog" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDetail && this.detailCourse) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildCourseDetailSheet.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showToast) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.toastMsg);
                        Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(390:9)", "entry");
                        Text.fontSize(13);
                        Text.fontWeight(500);
                        Text.fontColor('#FFFFFF');
                        Text.padding({ left: 18, right: 18, top: 10, bottom: 10 });
                        Text.borderRadius(999);
                        Text.backgroundColor('rgba(15, 23, 42, 0.88)');
                        Text.margin({ bottom: 90 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    buildEmptyState(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(406:5)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new EmptyPlaceholder(this, {
                        message: '暂无课表数据',
                        subMessage: '请导入教务系统导出的 xls 课表文件',
                        iconText: '📅'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 407, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            message: '暂无课表数据',
                            subMessage: '请导入教务系统导出的 xls 课表文件',
                            iconText: '📅'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        message: '暂无课表数据',
                        subMessage: '请导入教务系统导出的 xls 课表文件',
                        iconText: '📅'
                    });
                }
            }, { name: "EmptyPlaceholder" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isImporting ? '导入中...' : '导入课表');
            Button.debugLine("entry/src/main/ets/pages/SchedulePage.ets(412:7)", "entry");
            Button.type(ButtonType.Normal);
            Button.fontSize(14);
            Button.fontWeight(600);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#4A90E2');
            Button.borderRadius(22);
            Button.padding({ left: 28, right: 28, top: 10, bottom: 10 });
            Button.margin({ top: 20 });
            Button.enabled(!this.isImporting);
            Button.onClick(() => this.importSchedule());
        }, Button);
        Button.pop();
        Column.pop();
    }
    buildScheduleHeader(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(431:5)", "entry");
            Row.width('100%');
            Row.height(52);
            Row.padding({ left: 4, right: 4 });
            Row.backgroundColor('#FFFFFF');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.embedded) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('‹');
                        Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(433:9)", "entry");
                        Text.fontSize(28);
                        Text.fontColor('#333333');
                        Text.width(44);
                        Text.height(44);
                        Text.textAlign(TextAlign.Center);
                        Text.onClick(() => router.back());
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(441:9)", "entry");
                        Row.width(44);
                        Row.height(44);
                    }, Row);
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(444:7)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => { this.showWeekPicker = true; });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(445:9)", "entry");
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`第${this.viewWeekNum}周`);
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(446:11)", "entry");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▾');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(450:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 4, top: 2 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isViewingCurrentWeek() ? '本周' : '非本周');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(457:9)", "entry");
            Text.fontSize(11);
            Text.fontColor('#AAAAAA');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☰');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(466:7)", "entry");
            Text.fontSize(20);
            Text.fontColor('#333333');
            Text.width(44);
            Text.height(44);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => { this.showMenuPanel = true; });
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildDayHeaderRow(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(483:5)", "entry");
            Row.width('100%');
            Row.backgroundColor('#FFFFFF');
            Row.borderWidth({ bottom: 0.5 });
            Row.borderColor('#EEEEEE');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(484:7)", "entry");
            Column.width(TIME_COL_WIDTH);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const header = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(487:9)", "entry");
                    Column.layoutWeight(1);
                    Column.alignItems(HorizontalAlign.Center);
                    Column.padding({ top: 8, bottom: 8 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(header);
                    Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(488:11)", "entry");
                    Text.fontSize(12);
                    Text.fontColor(index + 1 === this.todayDayOfWeek && this.isViewingCurrentWeek() ? '#4A90E2' : '#666666');
                    Text.fontWeight(index + 1 === this.todayDayOfWeek && this.isViewingCurrentWeek() ? FontWeight.Bold : FontWeight.Normal);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.weekDateLabels[index] || '');
                    Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(492:11)", "entry");
                    Text.fontSize(10);
                    Text.fontColor(index + 1 === this.todayDayOfWeek && this.isViewingCurrentWeek() ? '#4A90E2' : '#AAAAAA');
                    Text.margin({ top: 2 });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.weekHeaders, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    buildScheduleBody(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(510:5)", "entry");
            Column.width('100%');
            Column.backgroundColor('#FAFBFC');
            Column.clip(false);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const period = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(512:9)", "entry");
                    Row.width('100%');
                    Row.height(PERIOD_ROW_HEIGHT);
                    Row.clip(false);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(513:11)", "entry");
                    Column.width(TIME_COL_WIDTH);
                    Column.height(PERIOD_ROW_HEIGHT);
                    Column.justifyContent(FlexAlign.Center);
                    Column.padding({ left: 2, right: 2 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(String(period));
                    Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(514:13)", "entry");
                    Text.fontSize(11);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#888888');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(getPeriodTimeSlot(period));
                    Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(518:13)", "entry");
                    Text.fontSize(8);
                    Text.fontColor('#BBBBBB');
                    Text.margin({ top: 2 });
                    Text.maxLines(2);
                    Text.textAlign(TextAlign.Center);
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const day = _item;
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ScheduleGridCell(this, {
                                        cell: this.getCellAt(day, period),
                                        isCovered: this.isCoveredBySpan(day, period),
                                        rowHeight: PERIOD_ROW_HEIGHT,
                                        cellGap: CELL_GAP,
                                        colorStyle: this.getCellColorStyle(day, period),
                                        onCellTap: (cell: ScheduleCell) => {
                                            this.detailCourse = cell;
                                            this.showDetail = true;
                                        }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 531, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            cell: this.getCellAt(day, period),
                                            isCovered: this.isCoveredBySpan(day, period),
                                            rowHeight: PERIOD_ROW_HEIGHT,
                                            cellGap: CELL_GAP,
                                            colorStyle: this.getCellColorStyle(day, period),
                                            onCellTap: (cell: ScheduleCell) => {
                                                this.detailCourse = cell;
                                                this.showDetail = true;
                                            }
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        cell: this.getCellAt(day, period),
                                        isCovered: this.isCoveredBySpan(day, period),
                                        rowHeight: PERIOD_ROW_HEIGHT,
                                        cellGap: CELL_GAP,
                                        colorStyle: this.getCellColorStyle(day, period)
                                    });
                                }
                            }, { name: "ScheduleGridCell" });
                        }
                    };
                    this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5, 6, 7], forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.periodRange, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(548:7)", "entry");
            Column.height(80);
        }, Column);
        Column.pop();
        Column.pop();
    }
    private getCellColorStyle(day: number, period: number): CourseColorStyle {
        const cell = this.getCellAt(day, period);
        if (cell) {
            return this.getCourseColor(cell.courseCode);
        }
        return COURSE_COLORS[0];
    }
    buildReturnFab(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(565:5)", "entry");
            Row.padding({ left: 16, right: 16, top: 10, bottom: 10 });
            Row.backgroundColor('#4A90E2');
            Row.borderRadius(22);
            Row.shadow({ radius: 8, color: 'rgba(74, 144, 226, 0.35)', offsetY: 4 });
            Row.margin({ right: 16, bottom: this.embedded ? 16 : 24 });
            Row.onClick(() => this.returnToCurrentWeek());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('↩');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(566:7)", "entry");
            Text.fontSize(14);
            Text.fontColor('#FFFFFF');
            Text.margin({ right: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('返回本周');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(570:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#FFFFFF');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildWeekPicker(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(585:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.position({ x: 0, y: 0 });
            Column.zIndex(55);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(586:7)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.backgroundColor('rgba(0, 0, 0, 0.35)');
            Column.onClick(() => { this.showWeekPicker = false; });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(592:7)", "entry");
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius({ topLeft: 16, topRight: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(593:9)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择教学周');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(594:11)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/SchedulePage.ets(598:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✕');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(599:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#999999');
            Text.onClick(() => { this.showWeekPicker = false; });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start });
            Flex.debugLine("entry/src/main/ets/pages/SchedulePage.ets(607:9)", "entry");
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const week = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`第${week}周`);
                    Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(609:13)", "entry");
                    Text.fontSize(13);
                    Text.fontColor(this.viewWeekNum === week ? '#FFFFFF' : '#333333');
                    Text.backgroundColor(this.viewWeekNum === week ? '#4A90E2' : '#F5F5F5');
                    Text.borderRadius(8);
                    Text.padding({ left: 14, right: 14, top: 10, bottom: 10 });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.onClick(() => this.switchToWeek(week));
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.getWeekPickerOptions(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Column.pop();
        Column.pop();
    }
    buildMenuPanel(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(634:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.position({ x: 0, y: 0 });
            Column.zIndex(58);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(635:7)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.backgroundColor('rgba(0, 0, 0, 0.35)');
            Column.onClick(() => { this.showMenuPanel = false; });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(641:7)", "entry");
            Column.width('100%');
            Column.padding({ left: 20, right: 20, top: 16, bottom: 24 });
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius({ topLeft: 16, topRight: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentSemester || '未选择学期');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(642:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#888888');
            Text.width('100%');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(648:9)", "entry");
            Row.width('100%');
            Row.padding({ top: 14, bottom: 14 });
            Row.borderWidth({ bottom: 0.5 });
            Row.borderColor('#F0F0F0');
            Row.onClick(() => this.openSemesterPicker());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('切换学期');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(649:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#1A1A1A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(653:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(663:9)", "entry");
            Row.width('100%');
            Row.padding({ top: 14, bottom: 14 });
            Row.borderWidth({ bottom: 0.5 });
            Row.borderColor('#F0F0F0');
            Row.enabled(!this.isImporting);
            Row.onClick(() => this.importSchedule());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isImporting ? '导入中...' : '导入课表');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(664:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#1A1A1A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(668:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(679:9)", "entry");
            Row.width('100%');
            Row.padding({ top: 14, bottom: 14 });
            Row.enabled(ScheduleStore.getCatalog().length > 0);
            Row.onClick(() => this.openDeletePicker());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('删除课表');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(680:11)", "entry");
            Text.fontSize(15);
            Text.fontColor('#E53935');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(684:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    buildSemesterPicker(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(706:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.position({ x: 0, y: 0 });
            Column.zIndex(60);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(707:7)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.backgroundColor('rgba(0, 0, 0, 0.35)');
            Column.onClick(() => { this.showSemesterPicker = false; });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(713:7)", "entry");
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius({ topLeft: 16, topRight: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(714:9)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择学年学期');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(715:11)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/SchedulePage.ets(719:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✕');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(720:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#999999');
            Text.onClick(() => { this.showSemesterPicker = false; });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(728:9)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(729:11)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
            Column.padding({ right: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学年');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(730:13)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888888');
            Text.margin({ bottom: 10 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start });
            Flex.debugLine("entry/src/main/ets/pages/SchedulePage.ets(736:13)", "entry");
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const group = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(group.yearRange);
                    Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(738:17)", "entry");
                    Text.fontSize(13);
                    Text.fontWeight(this.pickerYear === group.yearRange ? FontWeight.Bold : FontWeight.Normal);
                    Text.fontColor(this.pickerYear === group.yearRange ? '#E53935' : '#333333');
                    Text.backgroundColor(this.pickerYear === group.yearRange ? '#F5F5F5' : '#FFFFFF');
                    Text.borderRadius(6);
                    Text.borderWidth(1);
                    Text.borderColor(this.pickerYear === group.yearRange ? '#DDDDDD' : '#EEEEEE');
                    Text.padding({ left: 14, right: 14, top: 10, bottom: 10 });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.onClick(() => this.onPickerYearSelect(group.yearRange));
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.catalog, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(757:11)", "entry");
            Column.width(1);
            Column.height(120);
            Column.backgroundColor('#EEEEEE');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(762:11)", "entry");
            Column.width(100);
            Column.alignItems(HorizontalAlign.Start);
            Column.padding({ left: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学期');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(763:13)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888888');
            Text.margin({ bottom: 10 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(769:13)", "entry");
            Column.width('100%');
        }, Column);
        this.buildTermOption.bind(this)(1);
        this.buildTermOption.bind(this)(2);
        Column.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定');
            Button.debugLine("entry/src/main/ets/pages/SchedulePage.ets(782:9)", "entry");
            Button.type(ButtonType.Normal);
            Button.width('100%');
            Button.height(44);
            Button.fontSize(15);
            Button.fontWeight(600);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#4A90E2');
            Button.borderRadius(10);
            Button.margin({ top: 20 });
            Button.enabled(this.isTermAvailable(this.pickerTerm));
            Button.onClick(() => this.confirmSemesterSwitch());
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    buildTermOption(term: number, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isTermAvailable(term)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`学期${term}`);
                        Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(809:7)", "entry");
                        Text.fontSize(14);
                        Text.fontWeight(this.pickerTerm === term ? FontWeight.Bold : FontWeight.Normal);
                        Text.fontColor(this.pickerTerm === term ? '#E53935' : '#333333');
                        Text.backgroundColor(this.pickerTerm === term ? '#F5F5F5' : '#FFFFFF');
                        Text.borderRadius(6);
                        Text.borderWidth(1);
                        Text.borderColor(this.pickerTerm === term ? '#DDDDDD' : '#EEEEEE');
                        Text.padding({ left: 16, right: 16, top: 12, bottom: 12 });
                        Text.margin({ bottom: 10 });
                        Text.width('100%');
                        Text.textAlign(TextAlign.Center);
                        Text.onClick(() => { this.pickerTerm = term; });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    buildDeletePicker(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(827:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.position({ x: 0, y: 0 });
            Column.zIndex(62);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(828:7)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.backgroundColor('rgba(0, 0, 0, 0.35)');
            Column.onClick(() => { this.showDeletePicker = false; });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(834:7)", "entry");
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius({ topLeft: 16, topRight: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(835:9)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('删除课表');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(836:11)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1A1A1A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/SchedulePage.ets(840:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✕');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(841:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#999999');
            Text.onClick(() => { this.showDeletePicker = false; });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('勾选要删除的学年学期，仅显示已导入的课表');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(849:9)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888888');
            Text.width('100%');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(855:9)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(856:11)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
            Column.padding({ right: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学年');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(857:13)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888888');
            Text.margin({ bottom: 10 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start });
            Flex.debugLine("entry/src/main/ets/pages/SchedulePage.ets(863:13)", "entry");
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const group = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(group.yearRange);
                    Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(865:17)", "entry");
                    Text.fontSize(13);
                    Text.fontWeight(this.deleteYear === group.yearRange ? FontWeight.Bold : FontWeight.Normal);
                    Text.fontColor(this.deleteYear === group.yearRange ? '#E53935' : '#333333');
                    Text.backgroundColor(this.deleteYear === group.yearRange ? '#F5F5F5' : '#FFFFFF');
                    Text.borderRadius(6);
                    Text.borderWidth(1);
                    Text.borderColor(this.deleteYear === group.yearRange ? '#DDDDDD' : '#EEEEEE');
                    Text.padding({ left: 14, right: 14, top: 10, bottom: 10 });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.onClick(() => this.onDeleteYearSelect(group.yearRange));
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.catalog, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(884:11)", "entry");
            Column.width(1);
            Column.height(120);
            Column.backgroundColor('#EEEEEE');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(889:11)", "entry");
            Column.width(120);
            Column.alignItems(HorizontalAlign.Start);
            Column.padding({ left: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学期');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(890:13)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888888');
            Text.margin({ bottom: 10 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(896:13)", "entry");
            Column.width('100%');
        }, Column);
        this.buildDeleteTermCheckbox.bind(this)(1);
        this.buildDeleteTermCheckbox.bind(this)(2);
        Column.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('删除所选');
            Button.debugLine("entry/src/main/ets/pages/SchedulePage.ets(909:9)", "entry");
            Button.type(ButtonType.Normal);
            Button.width('100%');
            Button.height(44);
            Button.fontSize(15);
            Button.fontWeight(600);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#E53935');
            Button.borderRadius(10);
            Button.margin({ top: 20 });
            Button.enabled(this.getSelectedDeleteKeys().length > 0);
            Button.onClick(() => this.requestDelete());
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    buildDeleteTermCheckbox(term: number, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isDeleteTermAvailable(term)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(936:7)", "entry");
                        Row.width('100%');
                        Row.padding({ top: 10, bottom: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Checkbox.create();
                        Checkbox.debugLine("entry/src/main/ets/pages/SchedulePage.ets(937:9)", "entry");
                        Checkbox.select(term === 1 ? this.deleteTerm1Checked : this.deleteTerm2Checked);
                        Checkbox.selectedColor('#E53935');
                        Checkbox.onChange((checked: boolean) => {
                            if (term === 1) {
                                this.deleteTerm1Checked = checked;
                            }
                            else {
                                this.deleteTerm2Checked = checked;
                            }
                        });
                    }, Checkbox);
                    Checkbox.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`学期${term}`);
                        Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(947:9)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#333333');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    buildCourseDetailSheet(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(959:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.position({ x: 0, y: 0 });
            Column.zIndex(50);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(960:7)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.backgroundColor('rgba(0, 0, 0, 0.4)');
            Column.onClick(() => { this.showDetail = false; });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(966:7)", "entry");
            Column.width('100%');
            Column.padding(24);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius({ topLeft: 18, topRight: 18 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(967:9)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('课程详情');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(968:11)", "entry");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/SchedulePage.ets(969:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✕');
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(970:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#999999');
            Text.onClick(() => { this.showDetail = false; });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.detailCourse) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(977:11)", "entry");
                        Column.width('100%');
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '课程名称', value: this.detailCourse.courseName || '—' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 978, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '课程名称',
                                        value: this.detailCourse.courseName || '—'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '课程名称', value: this.detailCourse.courseName || '—'
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '课程序号', value: this.detailCourse.courseCode || '—' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 979, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '课程序号',
                                        value: this.detailCourse.courseCode || '—'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '课程序号', value: this.detailCourse.courseCode || '—'
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '授课教师', value: this.detailCourse.teacher || '—' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 980, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '授课教师',
                                        value: this.detailCourse.teacher || '—'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '授课教师', value: this.detailCourse.teacher || '—'
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '上课教室', value: this.detailCourse.classroom || '—' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 981, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '上课教室',
                                        value: this.detailCourse.classroom || '—'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '上课教室', value: this.detailCourse.classroom || '—'
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '上课周次', value: this.detailCourse.weekRange || '—' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 982, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '上课周次',
                                        value: this.detailCourse.weekRange || '—'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '上课周次', value: this.detailCourse.weekRange || '—'
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '节次', value: `${this.detailCourse.startPeriod}-${this.detailCourse.endPeriod}节` }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SchedulePage.ets", line: 983, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '节次',
                                        value: `${this.detailCourse.startPeriod}-${this.detailCourse.endPeriod}节`
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '节次', value: `${this.detailCourse.startPeriod}-${this.detailCourse.endPeriod}节`
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SchedulePage";
    }
}
class ScheduleGridCell extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cell = new SynchedPropertyObjectOneWayPU(params.cell, this, "cell");
        this.__isCovered = new SynchedPropertySimpleOneWayPU(params.isCovered, this, "isCovered");
        this.__rowHeight = new SynchedPropertySimpleOneWayPU(params.rowHeight, this, "rowHeight");
        this.__cellGap = new SynchedPropertySimpleOneWayPU(params.cellGap, this, "cellGap");
        this.__colorStyle = new SynchedPropertyObjectOneWayPU(params.colorStyle, this, "colorStyle");
        this.onCellTap = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScheduleGridCell_Params) {
        if (params.cell === undefined) {
            this.__cell.set(null);
        }
        if (params.isCovered === undefined) {
            this.__isCovered.set(false);
        }
        if (params.rowHeight === undefined) {
            this.__rowHeight.set(56);
        }
        if (params.cellGap === undefined) {
            this.__cellGap.set(2);
        }
        if (params.colorStyle === undefined) {
            this.__colorStyle.set({ bg: '#E8F4FD', text: '#1976D2' });
        }
        if (params.onCellTap !== undefined) {
            this.onCellTap = params.onCellTap;
        }
    }
    updateStateVars(params: ScheduleGridCell_Params) {
        this.__cell.reset(params.cell);
        this.__isCovered.reset(params.isCovered);
        this.__rowHeight.reset(params.rowHeight);
        this.__cellGap.reset(params.cellGap);
        this.__colorStyle.reset(params.colorStyle);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cell.purgeDependencyOnElmtId(rmElmtId);
        this.__isCovered.purgeDependencyOnElmtId(rmElmtId);
        this.__rowHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__cellGap.purgeDependencyOnElmtId(rmElmtId);
        this.__colorStyle.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cell.aboutToBeDeleted();
        this.__isCovered.aboutToBeDeleted();
        this.__rowHeight.aboutToBeDeleted();
        this.__cellGap.aboutToBeDeleted();
        this.__colorStyle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cell: SynchedPropertySimpleOneWayPU<ScheduleCell | null>;
    get cell() {
        return this.__cell.get();
    }
    set cell(newValue: ScheduleCell | null) {
        this.__cell.set(newValue);
    }
    private __isCovered: SynchedPropertySimpleOneWayPU<boolean>;
    get isCovered() {
        return this.__isCovered.get();
    }
    set isCovered(newValue: boolean) {
        this.__isCovered.set(newValue);
    }
    private __rowHeight: SynchedPropertySimpleOneWayPU<number>;
    get rowHeight() {
        return this.__rowHeight.get();
    }
    set rowHeight(newValue: number) {
        this.__rowHeight.set(newValue);
    }
    private __cellGap: SynchedPropertySimpleOneWayPU<number>;
    get cellGap() {
        return this.__cellGap.get();
    }
    set cellGap(newValue: number) {
        this.__cellGap.set(newValue);
    }
    private __colorStyle: SynchedPropertySimpleOneWayPU<CourseColorStyle>;
    get colorStyle() {
        return this.__colorStyle.get();
    }
    set colorStyle(newValue: CourseColorStyle) {
        this.__colorStyle.set(newValue);
    }
    private onCellTap?: (cell: ScheduleCell) => void;
    private getCardHeight(): number {
        if (!this.cell) {
            return 0;
        }
        return this.rowHeight * this.cell.span - this.cellGap * 2;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.debugLine("entry/src/main/ets/pages/SchedulePage.ets(1017:5)", "entry");
            Stack.layoutWeight(1);
            Stack.height(this.rowHeight);
            Stack.backgroundColor(this.isCovered ? 'transparent' : '#FAFBFC');
            Stack.borderWidth({ right: 0.5, bottom: this.isCovered ? 0 : 0.5 });
            Stack.borderColor('#EEEEEE');
            Stack.clip(false);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.cell) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/SchedulePage.ets(1019:9)", "entry");
                        Column.width('100%');
                        Column.height(this.getCardHeight());
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.padding({ left: 4, right: 4, top: 4, bottom: 4 });
                        Column.backgroundColor(this.colorStyle.bg);
                        Column.borderRadius(8);
                        Column.margin(this.cellGap);
                        Column.zIndex(10);
                        Column.onClick(() => {
                            if (this.onCellTap) {
                                this.onCellTap(this.cell!);
                            }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.cell.courseName);
                        Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(1020:11)", "entry");
                        Text.fontSize(10);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(this.colorStyle.text);
                        Text.maxLines(this.cell.span >= 2 ? 5 : 2);
                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                        Text.textAlign(TextAlign.Center);
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.cell.classroom && this.cell.classroom.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`@${this.cell.classroom}`);
                                    Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(1029:13)", "entry");
                                    Text.fontSize(8);
                                    Text.fontColor(this.colorStyle.text);
                                    Text.opacity(0.75);
                                    Text.maxLines(this.cell.span >= 2 ? 2 : 1);
                                    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                    Text.textAlign(TextAlign.Center);
                                    Text.width('100%');
                                    Text.margin({ top: 2 });
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class DetailRow extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__label = new SynchedPropertySimpleOneWayPU(params.label, this, "label");
        this.__value = new SynchedPropertySimpleOneWayPU(params.value, this, "value");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DetailRow_Params) {
        if (params.label === undefined) {
            this.__label.set('');
        }
        if (params.value === undefined) {
            this.__value.set('');
        }
    }
    updateStateVars(params: DetailRow_Params) {
        this.__label.reset(params.label);
        this.__value.reset(params.value);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__label.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__label.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __label: SynchedPropertySimpleOneWayPU<string>;
    get label() {
        return this.__label.get();
    }
    set label(newValue: string) {
        this.__label.set(newValue);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SchedulePage.ets(1071:5)", "entry");
            Row.width('100%');
            Row.padding({ top: 10, bottom: 10 });
            Row.borderWidth({ bottom: 0.5 });
            Row.borderColor('#F0F0F0');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.label);
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(1072:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#888888');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.value);
            Text.debugLine("entry/src/main/ets/pages/SchedulePage.ets(1073:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#1A1A1A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new SchedulePage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/SchedulePage", pageFullPath: "entry/src/main/ets/pages/SchedulePage", integratedHsp: "false", moduleType: "followWithHap" });
