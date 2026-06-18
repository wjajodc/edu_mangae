if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SelectionCourseCard_Params {
    course?: SelectableCourse;
    isSelectMode?: boolean;
    onAction?: () => void;
}
interface SelectionPage_Params {
    round?: SelectionRound;
    selectableCourses?: SelectableCourse[];
    mySelections?: SelectableCourse[];
    selectedCredit?: number;
    isLoading?: boolean;
    activeTab?: number;
    searchKeyword?: string;
    filterType?: string;
    showConfirm?: boolean;
    confirmTitle?: string;
    confirmContent?: string;
    pendingCourse?: SelectableCourse | null;
    toastMsg?: string;
    showToast?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import { EmptyPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/EmptyPlaceholder&";
import { ConfirmDialog } from "@normalized:N&&&entry/src/main/ets/components/ConfirmDialog&";
import { MOCK_SELECTION_ROUND, MOCK_SELECTABLE_COURSES, MOCK_MY_SELECTIONS } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
import type { SelectableCourse, SelectionRound } from '../model/CourseModel';
class SelectionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__round = new ObservedPropertyObjectPU(MOCK_SELECTION_ROUND, this, "round");
        this.__selectableCourses = new ObservedPropertyObjectPU([], this, "selectableCourses");
        this.__mySelections = new ObservedPropertyObjectPU([], this, "mySelections");
        this.__selectedCredit = new ObservedPropertySimplePU(0, this, "selectedCredit");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__activeTab = new ObservedPropertySimplePU(0, this, "activeTab");
        this.__searchKeyword = new ObservedPropertySimplePU('', this, "searchKeyword");
        this.__filterType = new ObservedPropertySimplePU('全部', this, "filterType");
        this.__showConfirm = new ObservedPropertySimplePU(false, this, "showConfirm");
        this.__confirmTitle = new ObservedPropertySimplePU('', this, "confirmTitle");
        this.__confirmContent = new ObservedPropertySimplePU('', this, "confirmContent");
        this.__pendingCourse = new ObservedPropertyObjectPU(null, this, "pendingCourse");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SelectionPage_Params) {
        if (params.round !== undefined) {
            this.round = params.round;
        }
        if (params.selectableCourses !== undefined) {
            this.selectableCourses = params.selectableCourses;
        }
        if (params.mySelections !== undefined) {
            this.mySelections = params.mySelections;
        }
        if (params.selectedCredit !== undefined) {
            this.selectedCredit = params.selectedCredit;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.activeTab !== undefined) {
            this.activeTab = params.activeTab;
        }
        if (params.searchKeyword !== undefined) {
            this.searchKeyword = params.searchKeyword;
        }
        if (params.filterType !== undefined) {
            this.filterType = params.filterType;
        }
        if (params.showConfirm !== undefined) {
            this.showConfirm = params.showConfirm;
        }
        if (params.confirmTitle !== undefined) {
            this.confirmTitle = params.confirmTitle;
        }
        if (params.confirmContent !== undefined) {
            this.confirmContent = params.confirmContent;
        }
        if (params.pendingCourse !== undefined) {
            this.pendingCourse = params.pendingCourse;
        }
        if (params.toastMsg !== undefined) {
            this.toastMsg = params.toastMsg;
        }
        if (params.showToast !== undefined) {
            this.showToast = params.showToast;
        }
    }
    updateStateVars(params: SelectionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__round.purgeDependencyOnElmtId(rmElmtId);
        this.__selectableCourses.purgeDependencyOnElmtId(rmElmtId);
        this.__mySelections.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCredit.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__activeTab.purgeDependencyOnElmtId(rmElmtId);
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
        this.__filterType.purgeDependencyOnElmtId(rmElmtId);
        this.__showConfirm.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmContent.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingCourse.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__round.aboutToBeDeleted();
        this.__selectableCourses.aboutToBeDeleted();
        this.__mySelections.aboutToBeDeleted();
        this.__selectedCredit.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__activeTab.aboutToBeDeleted();
        this.__searchKeyword.aboutToBeDeleted();
        this.__filterType.aboutToBeDeleted();
        this.__showConfirm.aboutToBeDeleted();
        this.__confirmTitle.aboutToBeDeleted();
        this.__confirmContent.aboutToBeDeleted();
        this.__pendingCourse.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 选课轮次 */
    private __round: ObservedPropertyObjectPU<SelectionRound>;
    get round() {
        return this.__round.get();
    }
    set round(newValue: SelectionRound) {
        this.__round.set(newValue);
    }
    /** 可选课程列表 */
    private __selectableCourses: ObservedPropertyObjectPU<SelectableCourse[]>;
    get selectableCourses() {
        return this.__selectableCourses.get();
    }
    set selectableCourses(newValue: SelectableCourse[]) {
        this.__selectableCourses.set(newValue);
    }
    /** 已选课程列表 */
    private __mySelections: ObservedPropertyObjectPU<SelectableCourse[]>;
    get mySelections() {
        return this.__mySelections.get();
    }
    set mySelections(newValue: SelectableCourse[]) {
        this.__mySelections.set(newValue);
    }
    /** 已选学分 */
    private __selectedCredit: ObservedPropertySimplePU<number>;
    get selectedCredit() {
        return this.__selectedCredit.get();
    }
    set selectedCredit(newValue: number) {
        this.__selectedCredit.set(newValue);
    }
    /** 加载状态 */
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    /** 当前 Tab */
    private __activeTab: ObservedPropertySimplePU<number>;
    get activeTab() {
        return this.__activeTab.get();
    }
    set activeTab(newValue: number) {
        this.__activeTab.set(newValue);
    }
    /** 搜索关键词 */
    private __searchKeyword: ObservedPropertySimplePU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    /** 课程类型筛选 */
    private __filterType: ObservedPropertySimplePU<string>;
    get filterType() {
        return this.__filterType.get();
    }
    set filterType(newValue: string) {
        this.__filterType.set(newValue);
    }
    /** 确认弹窗 */
    private __showConfirm: ObservedPropertySimplePU<boolean>;
    get showConfirm() {
        return this.__showConfirm.get();
    }
    set showConfirm(newValue: boolean) {
        this.__showConfirm.set(newValue);
    }
    private __confirmTitle: ObservedPropertySimplePU<string>;
    get confirmTitle() {
        return this.__confirmTitle.get();
    }
    set confirmTitle(newValue: string) {
        this.__confirmTitle.set(newValue);
    }
    private __confirmContent: ObservedPropertySimplePU<string>;
    get confirmContent() {
        return this.__confirmContent.get();
    }
    set confirmContent(newValue: string) {
        this.__confirmContent.set(newValue);
    }
    private __pendingCourse: ObservedPropertyObjectPU<SelectableCourse | null>;
    get pendingCourse() {
        return this.__pendingCourse.get();
    }
    set pendingCourse(newValue: SelectableCourse | null) {
        this.__pendingCourse.set(newValue);
    }
    /** Toast */
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
    aboutToAppear(): void {
        this.loadData();
    }
    private async loadData(): Promise<void> {
        this.isLoading = true;
        await new Promise<void>((r) => setTimeout(r, 500));
        this.selectableCourses = MOCK_SELECTABLE_COURSES.slice();
        this.mySelections = MOCK_MY_SELECTIONS.slice();
        this.selectedCredit = this.mySelections.reduce((sum, c) => sum + c.credit, 0);
        this.isLoading = false;
    }
    /** 选课操作 */
    private handleSelect(course: SelectableCourse): void {
        // 检查是否已在选课轮次内
        if (!this.round.isActive) {
            this.showToastOnce('当前不在选课轮次时间内');
            return;
        }
        // 检查学分上限
        if (this.selectedCredit + course.credit > this.round.maxCredit) {
            this.showToastOnce('学分超限，当前已选 ' + this.selectedCredit + ' 学分');
            return;
        }
        // 检查人数已满
        if (course.enrolled >= course.capacity) {
            this.showToastOnce('该课程选课人数已满');
            return;
        }
        // 二次确认
        this.pendingCourse = course;
        this.confirmTitle = '确认选课';
        this.confirmContent = `确定要选择「${course.courseName}」吗？`;
        this.showConfirm = true;
    }
    /** 确认选课 */
    private confirmSelect(): void {
        if (!this.pendingCourse)
            return;
        const course = this.pendingCourse;
        this.pendingCourse = null;
        // 模拟冲突检测（随机15%概率时间冲突）
        if (Math.random() < 0.15) {
            this.showToastOnce('选课失败：与已有课程时间冲突');
            return;
        }
        // 选课成功
        course.isSelected = true;
        course.enrolled++;
        this.mySelections.push(this.copyCourse(course));
        this.selectedCredit += course.credit;
        this.refreshList();
        this.showToastOnce('选课成功');
    }
    /** 退选操作 */
    private handleDrop(course: SelectableCourse): void {
        if (!this.round.isActive) {
            this.showToastOnce('当前不在选课轮次时间内');
            return;
        }
        this.pendingCourse = course;
        this.confirmTitle = '确认退选';
        this.confirmContent = `确定要退选「${course.courseName}」吗？`;
        this.showConfirm = true;
    }
    /** 确认退选 */
    private confirmDrop(): void {
        if (!this.pendingCourse)
            return;
        const course = this.pendingCourse;
        this.pendingCourse = null;
        // 从已选列表移除
        this.mySelections = this.mySelections.filter(c => c.courseCode !== course.courseCode);
        this.selectedCredit -= course.credit;
        // 更新可选列表状态
        const idx = this.selectableCourses.findIndex(c => c.courseCode === course.courseCode);
        if (idx >= 0) {
            this.selectableCourses[idx].isSelected = false;
            this.selectableCourses[idx].enrolled--;
        }
        this.refreshList();
        this.showToastOnce('退选成功');
    }
    private refreshList(): void {
        this.selectableCourses = this.selectableCourses.slice();
        this.mySelections = this.mySelections.slice();
    }
    private copyCourse(course: SelectableCourse): SelectableCourse {
        return {
            courseCode: course.courseCode,
            courseName: course.courseName,
            teacher: course.teacher,
            scheduleInfo: course.scheduleInfo,
            capacity: course.capacity,
            enrolled: course.enrolled,
            credit: course.credit,
            courseType: course.courseType,
            isSelected: course.isSelected,
        };
    }
    /** 过滤可选课程 */
    private getFilteredCourses(): SelectableCourse[] {
        let list = this.selectableCourses.filter(c => !c.isSelected);
        if (this.filterType !== '全部') {
            list = list.filter(c => c.courseType === this.filterType);
        }
        if (this.searchKeyword.trim()) {
            const kw = this.searchKeyword.trim().toLowerCase();
            list = list.filter(c => c.courseName.toLowerCase().includes(kw) ||
                c.courseCode.toLowerCase().includes(kw) ||
                c.teacher.toLowerCase().includes(kw));
        }
        return list;
    }
    private showToastOnce(msg: string): void {
        this.toastMsg = msg;
        this.showToast = true;
        setTimeout(() => { this.showToast = false; this.toastMsg = ''; }, 2000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/SelectionPage.ets(174:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(175:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '选课', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SelectionPage.ets", line: 176, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '选课',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '选课', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LoadingPlaceholder(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SelectionPage.ets", line: 179, col: 11 });
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
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(181:11)", "entry");
                        Column.layoutWeight(1);
                    }, Column);
                    // 选课轮次信息
                    this.buildRoundInfo.bind(this)();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Tab切换
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/SelectionPage.ets(186:13)", "entry");
                        // Tab切换
                        Row.width('100%');
                        // Tab切换
                        Row.padding({ left: 14, top: 8, bottom: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`可选课程 ${this.getFilteredCourses().length}`);
                        Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(187:15)", "entry");
                        Text.fontSize(13);
                        Text.fontWeight(this.activeTab === 0 ? 700 : 500);
                        Text.fontColor(this.activeTab === 0 ? '#2563EB' : '#64748B');
                        Text.padding({ left: 14, right: 14, top: 10, bottom: 10 });
                        Text.borderRadius(8);
                        Text.backgroundColor(this.activeTab === 0 ? '#E8EFFF' : 'transparent');
                        Text.onClick(() => { this.activeTab = 0; });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`已选课程 ${this.mySelections.length}`);
                        Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(195:15)", "entry");
                        Text.fontSize(13);
                        Text.fontWeight(this.activeTab === 1 ? 700 : 500);
                        Text.fontColor(this.activeTab === 1 ? '#2563EB' : '#64748B');
                        Text.padding({ left: 14, right: 14, top: 10, bottom: 10 });
                        Text.borderRadius(8);
                        Text.backgroundColor(this.activeTab === 1 ? '#E8EFFF' : 'transparent');
                        Text.margin({ left: 10 });
                        Text.onClick(() => { this.activeTab = 1; });
                    }, Text);
                    Text.pop();
                    // Tab切换
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 内容区域
                        if (this.activeTab === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.buildSelectableList.bind(this)();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.buildMySelectionList.bind(this)();
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 确认弹窗
                    ConfirmDialog(this, {
                        title: this.confirmTitle,
                        content: this.confirmContent,
                        visible: this.__showConfirm,
                        onConfirm: () => {
                            if (this.confirmTitle === '确认选课') {
                                this.confirmSelect();
                            }
                            else {
                                this.confirmDrop();
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SelectionPage.ets", line: 220, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.confirmTitle,
                            content: this.confirmContent,
                            visible: this.showConfirm,
                            onConfirm: () => {
                                if (this.confirmTitle === '确认选课') {
                                    this.confirmSelect();
                                }
                                else {
                                    this.confirmDrop();
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.confirmTitle,
                        content: this.confirmContent
                    });
                }
            }, { name: "ConfirmDialog" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Toast
            if (this.showToast) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.toastMsg);
                        Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(235:9)", "entry");
                        Text.fontSize(13);
                        Text.fontWeight(500);
                        Text.fontColor('#FFFFFF');
                        Text.padding({ left: 18, right: 18, top: 10, bottom: 10 });
                        Text.borderRadius(999);
                        Text.backgroundColor('rgba(15, 23, 42, 0.88)');
                        Text.position({ bottom: 100, left: '50%' });
                        Text.translate({ x: '-50%' });
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
    buildRoundInfo(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(246:5)", "entry");
            Column.width('100%');
            Column.padding(14);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ left: 14, right: 14, top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SelectionPage.ets(247:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(248:9)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`选课轮次：${this.round.roundName}`);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(249:11)", "entry");
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.round.startTime} ~ ${this.round.endTime}`);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(251:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#64748B');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`已选 ${this.selectedCredit}/${this.round.maxCredit} 学分`);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(256:9)", "entry");
            Text.fontSize(13);
            Text.fontWeight(600);
            Text.fontColor('#2563EB');
            Text.padding({ left: 10, right: 10, top: 6, bottom: 6 });
            Text.borderRadius(8);
            Text.backgroundColor('#E8EFFF');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 搜索框
            if (this.activeTab === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/SelectionPage.ets(265:9)", "entry");
                        Row.width('100%');
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: '搜索课程名/课号/教师', text: this.searchKeyword });
                        TextInput.debugLine("entry/src/main/ets/pages/SelectionPage.ets(266:11)", "entry");
                        TextInput.fontSize(13);
                        TextInput.height(38);
                        TextInput.layoutWeight(1);
                        TextInput.backgroundColor('#F8FAFC');
                        TextInput.borderRadius(8);
                        TextInput.padding({ left: 10 });
                        TextInput.onChange((val: string) => { this.searchKeyword = val; });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const t = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(t === '专业核心' ? '核心' : t === '专业拓展' ? '拓展' : t === '专业选修' ? '选修' : t);
                                Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(272:13)", "entry");
                                Text.fontSize(11);
                                Text.fontWeight(600);
                                Text.fontColor(this.filterType === t ? '#FFFFFF' : '#64748B');
                                Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
                                Text.borderRadius(6);
                                Text.backgroundColor(this.filterType === t ? '#2563EB' : '#F1F5F9');
                                Text.margin({ left: 6 });
                                Text.onClick(() => { this.filterType = t; });
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, ['全部', '专业核心', '专业拓展', '专业选修'], forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    buildSelectableList(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.getFilteredCourses().length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new EmptyPlaceholder(this, { message: '暂无符合条件的课程', subMessage: '请调整筛选条件', iconText: '📋' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SelectionPage.ets", line: 295, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        message: '暂无符合条件的课程',
                                        subMessage: '请调整筛选条件',
                                        iconText: '📋'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    message: '暂无符合条件的课程', subMessage: '请调整筛选条件', iconText: '📋'
                                });
                            }
                        }, { name: "EmptyPlaceholder" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/SelectionPage.ets(297:7)", "entry");
                        Scroll.scrollBar(BarState.Off);
                        Scroll.layoutWeight(1);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(298:9)", "entry");
                        Column.width('100%');
                        Column.padding({ left: 14, right: 14 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const course = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SelectionCourseCard(this, {
                                            course: course,
                                            isSelectMode: true,
                                            onAction: () => this.handleSelect(course)
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SelectionPage.ets", line: 300, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                course: course,
                                                isSelectMode: true,
                                                onAction: () => this.handleSelect(course)
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            course: course,
                                            isSelectMode: true
                                        });
                                    }
                                }, { name: "SelectionCourseCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.getFilteredCourses(), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(306:11)", "entry");
                        Column.height(16);
                    }, Column);
                    Column.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
    }
    buildMySelectionList(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.mySelections.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new EmptyPlaceholder(this, { message: '暂无已选课程', subMessage: '请在可选课程中选择', iconText: '📋' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SelectionPage.ets", line: 316, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        message: '暂无已选课程',
                                        subMessage: '请在可选课程中选择',
                                        iconText: '📋'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    message: '暂无已选课程', subMessage: '请在可选课程中选择', iconText: '📋'
                                });
                            }
                        }, { name: "EmptyPlaceholder" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/SelectionPage.ets(318:7)", "entry");
                        Scroll.scrollBar(BarState.Off);
                        Scroll.layoutWeight(1);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(319:9)", "entry");
                        Column.width('100%');
                        Column.padding({ left: 14, right: 14 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const course = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SelectionCourseCard(this, {
                                            course: course,
                                            isSelectMode: false,
                                            onAction: () => this.handleDrop(course)
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SelectionPage.ets", line: 321, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                course: course,
                                                isSelectMode: false,
                                                onAction: () => this.handleDrop(course)
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            course: course,
                                            isSelectMode: false
                                        });
                                    }
                                }, { name: "SelectionCourseCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.mySelections, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(327:11)", "entry");
                        Column.height(16);
                    }, Column);
                    Column.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SelectionPage";
    }
}
class SelectionCourseCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__course = new SynchedPropertyObjectOneWayPU(params.course, this, "course");
        this.__isSelectMode = new SynchedPropertySimpleOneWayPU(params.isSelectMode, this, "isSelectMode");
        this.onAction = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SelectionCourseCard_Params) {
        if (params.isSelectMode === undefined) {
            this.__isSelectMode.set(true);
        }
        if (params.onAction !== undefined) {
            this.onAction = params.onAction;
        }
    }
    updateStateVars(params: SelectionCourseCard_Params) {
        this.__course.reset(params.course);
        this.__isSelectMode.reset(params.isSelectMode);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__course.purgeDependencyOnElmtId(rmElmtId);
        this.__isSelectMode.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__course.aboutToBeDeleted();
        this.__isSelectMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __course: SynchedPropertySimpleOneWayPU<SelectableCourse>;
    get course() {
        return this.__course.get();
    }
    set course(newValue: SelectableCourse) {
        this.__course.set(newValue);
    }
    private __isSelectMode: SynchedPropertySimpleOneWayPU<boolean>;
    get isSelectMode() {
        return this.__isSelectMode.get();
    }
    set isSelectMode(newValue: boolean) {
        this.__isSelectMode.set(newValue);
    }
    private onAction?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(345:5)", "entry");
            Column.width('100%');
            Column.padding(14);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SelectionPage.ets(346:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(347:9)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.course.courseName);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(348:11)", "entry");
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.course.courseCode);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(350:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#64748B');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`教师：${this.course.teacher} · ${this.course.scheduleInfo}`);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(352:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#94A3B8');
            Text.margin({ top: 2 });
            Text.maxLines(1);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SelectionPage.ets(357:9)", "entry");
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.course.credit} 学分`);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(358:11)", "entry");
            Text.fontSize(13);
            Text.fontWeight(600);
            Text.fontColor('#2563EB');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.course.enrolled}/${this.course.capacity}`);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(360:11)", "entry");
            Text.fontSize(11);
            Text.fontColor(this.course.enrolled >= this.course.capacity ? '#DC2626' : '#64748B');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作按钮
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SelectionPage.ets(370:7)", "entry");
            // 操作按钮
            Row.width('100%');
            // 操作按钮
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 课程类型标签
            Text.create(this.course.courseType);
            Text.debugLine("entry/src/main/ets/pages/SelectionPage.ets(372:9)", "entry");
            // 课程类型标签
            Text.fontSize(10);
            // 课程类型标签
            Text.fontWeight(600);
            // 课程类型标签
            Text.fontColor('#3730A3');
            // 课程类型标签
            Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
            // 课程类型标签
            Text.borderRadius(4);
            // 课程类型标签
            Text.backgroundColor('#E0E7FF');
        }, Text);
        // 课程类型标签
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/SelectionPage.ets(377:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isSelectMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.course.enrolled >= this.course.capacity ? '已满' : '选课');
                        Button.debugLine("entry/src/main/ets/pages/SelectionPage.ets(380:11)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.fontSize(12);
                        Button.fontWeight(600);
                        Button.fontColor(this.course.enrolled >= this.course.capacity ? '#94A3B8' : '#FFFFFF');
                        Button.backgroundColor(this.course.enrolled >= this.course.capacity ? '#F1F5F9' : '#2563EB');
                        Button.borderRadius(8);
                        Button.padding({ left: 14, right: 14, top: 6, bottom: 6 });
                        Button.enabled(this.course.enrolled < this.course.capacity);
                        Button.onClick(() => { if (this.onAction)
                            this.onAction(); });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('退选');
                        Button.debugLine("entry/src/main/ets/pages/SelectionPage.ets(390:11)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.fontSize(12);
                        Button.fontWeight(600);
                        Button.fontColor('#DC2626');
                        Button.backgroundColor('#FEF2F2');
                        Button.borderRadius(8);
                        Button.padding({ left: 14, right: 14, top: 6, bottom: 6 });
                        Button.onClick(() => { if (this.onAction)
                            this.onAction(); });
                    }, Button);
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        // 操作按钮
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new SelectionPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/SelectionPage", pageFullPath: "entry/src/main/ets/pages/SelectionPage", integratedHsp: "false", moduleType: "followWithHap" });
