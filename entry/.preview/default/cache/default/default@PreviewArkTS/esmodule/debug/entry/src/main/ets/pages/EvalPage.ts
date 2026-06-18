if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface EvalTaskCard_Params {
    task?: EvaluationTask;
}
interface EvalPage_Params {
    currentSemester?: string;
    evalTasks?: EvaluationTask[];
    isLoading?: boolean;
    showSemesterPicker?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import { MOCK_EVAL_TASKS, SEMESTER_OPTIONS } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
import type { EvaluationTask } from '../model/EvalModel';
export class EvalPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentSemester = new ObservedPropertySimplePU('2025-2026 第1学期', this, "currentSemester");
        this.__evalTasks = new ObservedPropertyObjectPU([], this, "evalTasks");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__showSemesterPicker = new ObservedPropertySimplePU(false, this, "showSemesterPicker");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EvalPage_Params) {
        if (params.currentSemester !== undefined) {
            this.currentSemester = params.currentSemester;
        }
        if (params.evalTasks !== undefined) {
            this.evalTasks = params.evalTasks;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.showSemesterPicker !== undefined) {
            this.showSemesterPicker = params.showSemesterPicker;
        }
    }
    updateStateVars(params: EvalPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentSemester.purgeDependencyOnElmtId(rmElmtId);
        this.__evalTasks.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__showSemesterPicker.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentSemester.aboutToBeDeleted();
        this.__evalTasks.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__showSemesterPicker.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 当前学期 */
    private __currentSemester: ObservedPropertySimplePU<string>;
    get currentSemester() {
        return this.__currentSemester.get();
    }
    set currentSemester(newValue: string) {
        this.__currentSemester.set(newValue);
    }
    /** 评教任务列表 */
    private __evalTasks: ObservedPropertyObjectPU<EvaluationTask[]>;
    get evalTasks() {
        return this.__evalTasks.get();
    }
    set evalTasks(newValue: EvaluationTask[]) {
        this.__evalTasks.set(newValue);
    }
    /** 加载状态 */
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    /** 学期选择弹窗 */
    private __showSemesterPicker: ObservedPropertySimplePU<boolean>;
    get showSemesterPicker() {
        return this.__showSemesterPicker.get();
    }
    set showSemesterPicker(newValue: boolean) {
        this.__showSemesterPicker.set(newValue);
    }
    aboutToAppear(): void {
        this.loadData();
    }
    private async loadData(): Promise<void> {
        this.isLoading = true;
        await new Promise<void>((r) => setTimeout(r, 500));
        this.evalTasks = MOCK_EVAL_TASKS;
        this.isLoading = false;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/EvalPage.ets(37:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(38:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '量化评教', showBack: false }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EvalPage.ets", line: 39, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '量化评教',
                            showBack: false
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '量化评教', showBack: false
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
                                let componentCall = new LoadingPlaceholder(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EvalPage.ets", line: 42, col: 11 });
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
                        Scroll.debugLine("entry/src/main/ets/pages/EvalPage.ets(44:11)", "entry");
                        Scroll.width('100%');
                        Scroll.layoutWeight(1);
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(45:13)", "entry");
                        Column.width('100%');
                    }, Column);
                    // 学期选择器
                    this.buildSemesterSelector.bind(this)();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 评教任务列表
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(50:15)", "entry");
                        // 评教任务列表
                        Column.width('100%');
                        // 评教任务列表
                        Column.padding({ left: 14, right: 14 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const task = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new EvalTaskCard(this, { task: task }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EvalPage.ets", line: 52, col: 19 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                task: task
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            task: task
                                        });
                                    }
                                }, { name: "EvalTaskCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.evalTasks, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    // 评教任务列表
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 底部间距
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(59:15)", "entry");
                        // 底部间距
                        Column.height(24);
                    }, Column);
                    // 底部间距
                    Column.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 学期选择弹窗（简化版，使用确认选择）
            if (this.showSemesterPicker) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(74:9)", "entry");
                        Column.width('100%');
                        Column.height('100%');
                        Column.position({ x: 0, y: 0 });
                        Column.zIndex(50);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(75:11)", "entry");
                        Column.width('100%');
                        Column.height('100%');
                        Column.backgroundColor('rgba(15, 23, 42, 0.45)');
                        Column.onClick(() => { this.showSemesterPicker = false; });
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(81:11)", "entry");
                        Column.width('86%');
                        Column.padding(20);
                        Column.backgroundColor('#FFFFFF');
                        Column.borderRadius(16);
                        Column.position({ bottom: 30 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('选择学期');
                        Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(82:13)", "entry");
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const sem = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(sem);
                                Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(88:15)", "entry");
                                Text.fontSize(15);
                                Text.padding({ top: 12, bottom: 12 });
                                Text.fontColor(this.currentSemester === sem ? '#2563EB' : '#0F172A');
                                Text.fontWeight(this.currentSemester === sem ? 600 : 400);
                                Text.width('100%');
                                Text.textAlign(TextAlign.Center);
                                Text.onClick(() => {
                                    this.currentSemester = sem;
                                    this.showSemesterPicker = false;
                                });
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, SEMESTER_OPTIONS, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
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
    buildSemesterSelector(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/EvalPage.ets(117:5)", "entry");
            Row.padding({ left: 14, right: 14, top: 12, bottom: 6 });
            Row.margin({ bottom: 6 });
            Row.onClick(() => { this.showSemesterPicker = true; });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentSemester);
            Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(118:7)", "entry");
            Text.fontSize(14);
            Text.fontWeight(600);
            Text.fontColor('#2563EB');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' ▾');
            Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(123:7)", "entry");
            Text.fontSize(12);
            Text.fontColor('#2563EB');
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "EvalPage";
    }
}
class EvalTaskCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__task = new SynchedPropertyObjectOneWayPU(params.task, this, "task");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EvalTaskCard_Params) {
    }
    updateStateVars(params: EvalTaskCard_Params) {
        this.__task.reset(params.task);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__task.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__task.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __task: SynchedPropertySimpleOneWayPU<EvaluationTask>;
    get task() {
        return this.__task.get();
    }
    set task(newValue: EvaluationTask) {
        this.__task.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(141:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/EvalPage.ets(142:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/EvalPage.ets(143:9)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.task.courseName);
            Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(144:11)", "entry");
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.task.courseCode} · ${this.task.teacher}`);
            Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(150:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#64748B');
            Text.margin({ bottom: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.task.courseType}`);
            Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(155:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#94A3B8');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 状态标签
            if (this.task.status === 'closed') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.task.statusText);
                        Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(164:11)", "entry");
                        Text.fontSize(11);
                        Text.fontWeight(600);
                        Text.fontColor('#64748B');
                        Text.padding({ left: 10, right: 10, top: 4, bottom: 4 });
                        Text.borderRadius(8);
                        Text.backgroundColor('#F1F5F9');
                    }, Text);
                    Text.pop();
                });
            }
            else if (this.task.status === 'submitted') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.task.statusText);
                        Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(172:11)", "entry");
                        Text.fontSize(11);
                        Text.fontWeight(600);
                        Text.fontColor('#166534');
                        Text.padding({ left: 10, right: 10, top: 4, bottom: 4 });
                        Text.borderRadius(8);
                        Text.backgroundColor('#DCFCE7');
                    }, Text);
                    Text.pop();
                });
            }
            else if (this.task.status === 'open') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('去评教');
                        Button.debugLine("entry/src/main/ets/pages/EvalPage.ets(180:11)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.backgroundColor('#2563EB');
                        Button.fontColor(Color.White);
                        Button.fontSize(12);
                        Button.fontWeight(600);
                        Button.borderRadius(8);
                        Button.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                        Button.onClick(() => {
                            router.pushUrl({
                                url: 'pages/EvalQuestionnairePage',
                                params: { taskId: this.task.id }
                            });
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 开放时间
            if (this.task.status !== 'submitted') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`开放时间：${this.task.openTime} ~ ${this.task.closeTime}`);
                        Text.debugLine("entry/src/main/ets/pages/EvalPage.ets(200:9)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#94A3B8');
                        Text.margin({ top: 6 });
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
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new EvalPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/EvalPage", pageFullPath: "entry/src/main/ets/pages/EvalPage", integratedHsp: "false", moduleType: "followWithHap" });
