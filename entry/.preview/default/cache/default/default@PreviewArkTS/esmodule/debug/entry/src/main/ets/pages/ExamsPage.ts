if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ExamCard_Params {
    exam?: ExamArrangement;
}
interface ExamsPage_Params {
    currentSemester?: string;
    exams?: ExamArrangement[];
    isLoading?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import { EmptyPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/EmptyPlaceholder&";
import { MOCK_EXAMS, SEMESTER_OPTIONS } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
import type { ExamArrangement } from '../model/GradeModel';
class ExamsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentSemester = new ObservedPropertySimplePU('2025-2026 第1学期', this, "currentSemester");
        this.__exams = new ObservedPropertyObjectPU([], this, "exams");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ExamsPage_Params) {
        if (params.currentSemester !== undefined) {
            this.currentSemester = params.currentSemester;
        }
        if (params.exams !== undefined) {
            this.exams = params.exams;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
    }
    updateStateVars(params: ExamsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentSemester.purgeDependencyOnElmtId(rmElmtId);
        this.__exams.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentSemester.aboutToBeDeleted();
        this.__exams.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentSemester: ObservedPropertySimplePU<string>;
    get currentSemester() {
        return this.__currentSemester.get();
    }
    set currentSemester(newValue: string) {
        this.__currentSemester.set(newValue);
    }
    private __exams: ObservedPropertyObjectPU<ExamArrangement[]>;
    get exams() {
        return this.__exams.get();
    }
    set exams(newValue: ExamArrangement[]) {
        this.__exams.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    aboutToAppear(): void {
        this.loadExams();
    }
    private async loadExams(): Promise<void> {
        this.isLoading = true;
        await new Promise<void>((r) => setTimeout(r, 400));
        this.exams = MOCK_EXAMS.filter(e => e.semester === this.currentSemester);
        this.isLoading = false;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ExamsPage.ets(32:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '考试安排', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ExamsPage.ets", line: 33, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '考试安排',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '考试安排', showBack: true
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
                                let componentCall = new LoadingPlaceholder(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ExamsPage.ets", line: 36, col: 9 });
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
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/ExamsPage.ets(38:9)", "entry");
                        Scroll.width('100%');
                        Scroll.layoutWeight(1);
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/ExamsPage.ets(39:11)", "entry");
                        Column.width('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 学期选择
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/ExamsPage.ets(41:13)", "entry");
                        // 学期选择
                        Row.width('100%');
                        // 学期选择
                        Row.padding({ left: 14, top: 12, bottom: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/ExamsPage.ets(42:15)", "entry");
                        Scroll.scrollable(ScrollDirection.Horizontal);
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/ExamsPage.ets(43:17)", "entry");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const sem = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(sem);
                                Text.debugLine("entry/src/main/ets/pages/ExamsPage.ets(45:21)", "entry");
                                Text.fontSize(12);
                                Text.fontWeight(600);
                                Text.fontColor(this.currentSemester === sem ? '#FFFFFF' : '#2563EB');
                                Text.backgroundColor(this.currentSemester === sem ? '#2563EB' : '#FFFFFF');
                                Text.borderRadius(8);
                                Text.borderWidth(1);
                                Text.borderColor('#2563EB');
                                Text.padding({ left: 10, right: 10, top: 6, bottom: 6 });
                                Text.margin({ right: 8 });
                                Text.onClick(() => {
                                    this.currentSemester = sem;
                                    this.loadExams();
                                });
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, SEMESTER_OPTIONS, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                    Scroll.pop();
                    // 学期选择
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 考试列表
                        if (this.exams.length === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new EmptyPlaceholder(this, { message: '暂无考试安排', iconText: '📅' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ExamsPage.ets", line: 65, col: 15 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    message: '暂无考试安排',
                                                    iconText: '📅'
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                message: '暂无考试安排', iconText: '📅'
                                            });
                                        }
                                    }, { name: "EmptyPlaceholder" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("entry/src/main/ets/pages/ExamsPage.ets(67:15)", "entry");
                                    Column.width('100%');
                                    Column.padding({ left: 14, right: 14 });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const exam = _item;
                                        {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                if (isInitialRender) {
                                                    let componentCall = new ExamCard(this, { exam: exam }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ExamsPage.ets", line: 69, col: 19 });
                                                    ViewPU.create(componentCall);
                                                    let paramsLambda = () => {
                                                        return {
                                                            exam: exam
                                                        };
                                                    };
                                                    componentCall.paramsGenerator_ = paramsLambda;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                                        exam: exam
                                                    });
                                                }
                                            }, { name: "ExamCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(elmtId, this.exams, forEachItemGenFunction);
                                }, ForEach);
                                ForEach.pop();
                                Column.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/ExamsPage.ets(75:13)", "entry");
                        Column.height(24);
                    }, Column);
                    Column.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ExamsPage";
    }
}
class ExamCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__exam = new SynchedPropertyObjectOneWayPU(params.exam, this, "exam");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ExamCard_Params) {
    }
    updateStateVars(params: ExamCard_Params) {
        this.__exam.reset(params.exam);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__exam.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__exam.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __exam: SynchedPropertySimpleOneWayPU<ExamArrangement>;
    get exam() {
        return this.__exam.get();
    }
    set exam(newValue: ExamArrangement) {
        this.__exam.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ExamsPage.ets(94:5)", "entry");
            Column.width('100%');
            Column.padding(14);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ExamsPage.ets(95:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 日期色块
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ExamsPage.ets(97:9)", "entry");
            // 日期色块
            Column.width(60);
            // 日期色块
            Column.height(64);
            // 日期色块
            Column.borderRadius(10);
            // 日期色块
            Column.backgroundColor('#6366F1');
            // 日期色块
            Column.justifyContent(FlexAlign.Center);
            // 日期色块
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getDayNumber(this.exam.examDate));
            Text.debugLine("entry/src/main/ets/pages/ExamsPage.ets(98:11)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getMonthText(this.exam.examDate));
            Text.debugLine("entry/src/main/ets/pages/ExamsPage.ets(100:11)", "entry");
            Text.fontSize(10);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        // 日期色块
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 考试信息
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ExamsPage.ets(110:9)", "entry");
            // 考试信息
            Column.alignItems(HorizontalAlign.Start);
            // 考试信息
            Column.layoutWeight(1);
            // 考试信息
            Column.margin({ left: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.exam.courseName);
            Text.debugLine("entry/src/main/ets/pages/ExamsPage.ets(111:11)", "entry");
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.exam.examType} · ${this.exam.examTime}`);
            Text.debugLine("entry/src/main/ets/pages/ExamsPage.ets(113:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#64748B');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.exam.examRoom} · 座位 ${this.exam.seatNumber}`);
            Text.debugLine("entry/src/main/ets/pages/ExamsPage.ets(115:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#94A3B8');
            Text.margin({ top: 1 });
        }, Text);
        Text.pop();
        // 考试信息
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.exam.notes) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.exam.notes);
                        Text.debugLine("entry/src/main/ets/pages/ExamsPage.ets(123:9)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#EA580C');
                        Text.margin({ top: 8 });
                        Text.width('100%');
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
    }
    /** 从日期字符串提取日期数字 */
    private getDayNumber(dateStr: string): string {
        const parts = dateStr.split('-');
        return parts.length >= 3 ? parts[2] : dateStr;
    }
    /** 从日期字符串提取月份文本 */
    private getMonthText(dateStr: string): string {
        const parts = dateStr.split('-');
        return parts.length >= 2 ? `${parts[1]}月` : '';
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new ExamsPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/ExamsPage", pageFullPath: "entry/src/main/ets/pages/ExamsPage", integratedHsp: "false", moduleType: "followWithHap" });
