if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface QuestionCard_Params {
    question?: EvaluationQuestion;
    index?: number;
}
interface EvalQuestionnairePage_Params {
    questions?: EvaluationQuestion[];
    isSubmitting?: boolean;
    showSuccess?: boolean;
    taskId?: string;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { CommonButton } from "@normalized:N&&&entry/src/main/ets/components/CommonButton&";
import { MOCK_EVAL_QUESTIONS } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
import type { EvaluationOption, EvaluationQuestion } from '../model/EvalModel';
export class EvalQuestionnairePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__questions = new ObservedPropertyObjectPU([], this, "questions");
        this.__isSubmitting = new ObservedPropertySimplePU(false, this, "isSubmitting");
        this.__showSuccess = new ObservedPropertySimplePU(false, this, "showSuccess");
        this.__taskId = new ObservedPropertySimplePU('', this, "taskId");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EvalQuestionnairePage_Params) {
        if (params.questions !== undefined) {
            this.questions = params.questions;
        }
        if (params.isSubmitting !== undefined) {
            this.isSubmitting = params.isSubmitting;
        }
        if (params.showSuccess !== undefined) {
            this.showSuccess = params.showSuccess;
        }
        if (params.taskId !== undefined) {
            this.taskId = params.taskId;
        }
    }
    updateStateVars(params: EvalQuestionnairePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__questions.purgeDependencyOnElmtId(rmElmtId);
        this.__isSubmitting.purgeDependencyOnElmtId(rmElmtId);
        this.__showSuccess.purgeDependencyOnElmtId(rmElmtId);
        this.__taskId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__questions.aboutToBeDeleted();
        this.__isSubmitting.aboutToBeDeleted();
        this.__showSuccess.aboutToBeDeleted();
        this.__taskId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 问卷题目列表 */
    private __questions: ObservedPropertyObjectPU<EvaluationQuestion[]>;
    get questions() {
        return this.__questions.get();
    }
    set questions(newValue: EvaluationQuestion[]) {
        this.__questions.set(newValue);
    }
    private __isSubmitting: ObservedPropertySimplePU<boolean>;
    get isSubmitting() {
        return this.__isSubmitting.get();
    }
    set isSubmitting(newValue: boolean) {
        this.__isSubmitting.set(newValue);
    }
    private __showSuccess: ObservedPropertySimplePU<boolean>;
    get showSuccess() {
        return this.__showSuccess.get();
    }
    set showSuccess(newValue: boolean) {
        this.__showSuccess.set(newValue);
    }
    private __taskId: ObservedPropertySimplePU<string>;
    get taskId() {
        return this.__taskId.get();
    }
    set taskId(newValue: string) {
        this.__taskId.set(newValue);
    }
    aboutToAppear(): void {
        // 从路由参数获取 taskId
        const params = router.getParams() as Record<string, string>;
        if (params && params['taskId']) {
            this.taskId = params['taskId'];
        }
        this.loadQuestions();
    }
    private async loadQuestions(): Promise<void> {
        await new Promise<void>((r) => setTimeout(r, 300));
        this.questions = MOCK_EVAL_QUESTIONS.slice();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(36:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(37:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '评教问卷', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EvalQuestionnairePage.ets", line: 38, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '评教问卷',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '评教问卷', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.questions.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(41:11)", "entry");
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('加载中...');
                        Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(42:13)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#64748B');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(46:11)", "entry");
                        Scroll.width('100%');
                        Scroll.layoutWeight(1);
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(47:13)", "entry");
                        Column.width('100%');
                        Column.padding({ left: 14, right: 14, top: 14 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, idx: number) => {
                            const q = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new QuestionCard(this, { question: q, index: idx + 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EvalQuestionnairePage.ets", line: 49, col: 17 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                question: q,
                                                index: idx + 1
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            question: q, index: idx + 1
                                        });
                                    }
                                }, { name: "QuestionCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.questions, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 提交按钮
                                CommonButton(this, {
                                    label: this.isSubmitting ? '提交中...' : '提交评教',
                                    block: true,
                                    disabled: this.isSubmitting,
                                    loading: this.isSubmitting,
                                    onTap: () => this.handleSubmit()
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EvalQuestionnairePage.ets", line: 53, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: this.isSubmitting ? '提交中...' : '提交评教',
                                        block: true,
                                        disabled: this.isSubmitting,
                                        loading: this.isSubmitting,
                                        onTap: () => this.handleSubmit()
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: this.isSubmitting ? '提交中...' : '提交评教',
                                    block: true,
                                    disabled: this.isSubmitting,
                                    loading: this.isSubmitting
                                });
                            }
                        }, { name: "CommonButton" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(61:15)", "entry");
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 提交成功弹窗
            if (this.showSuccess) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(77:9)", "entry");
                        Column.width('100%');
                        Column.height('100%');
                        Column.position({ x: 0, y: 0 });
                        Column.zIndex(50);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(78:11)", "entry");
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.backgroundColor('rgba(15, 23, 42, 0.45)');
                        Column.onClick(() => { });
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(84:11)", "entry");
                        Column.width('80%');
                        Column.padding(24);
                        Column.backgroundColor('#FFFFFF');
                        Column.borderRadius(16);
                        Column.position({ bottom: 120, left: '10%' });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('✅');
                        Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(85:13)", "entry");
                        Text.fontSize(48);
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('提交成功');
                        Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(88:13)", "entry");
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#0F172A');
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('感谢您的评教，您的意见对我们很重要！');
                        Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(93:13)", "entry");
                        Text.fontSize(13);
                        Text.fontColor('#64748B');
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('返回');
                        Button.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(98:13)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.width('100%');
                        Button.height(44);
                        Button.fontSize(15);
                        Button.fontWeight(FontWeight.Medium);
                        Button.fontColor('#FFFFFF');
                        Button.backgroundColor('#2563EB');
                        Button.borderRadius(10);
                        Button.onClick(() => {
                            this.showSuccess = false;
                            router.back();
                        });
                    }, Button);
                    Button.pop();
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
    /**
     * 提交评教
     * 校验所有题目是否已作答
     */
    private handleSubmit(): void {
        // 校验未完成项
        const unanswered = this.questions.filter((q: EvaluationQuestion) => {
            if (q.type === 'single' || q.type === 'star') {
                return q.answer === null || q.answer === undefined || q.answer === '';
            }
            if (q.type === 'multi') {
                const multiAnswer = q.answer as string[];
                return !multiAnswer || multiAnswer.length === 0;
            }
            if (q.type === 'text') {
                const textAnswer = q.answer as string;
                return !textAnswer || textAnswer.trim().length === 0;
            }
            return false;
        });
        if (unanswered.length > 0) {
            // 提示未完成
            const firstUnanswered = unanswered[0];
            if (firstUnanswered) {
                const idx = this.questions.findIndex(q => q.id === firstUnanswered.id);
                // 滚动到未完成的题目（简化：弹提示）
                // 实际可结合 Scroll 组件滚动
            }
            return;
        }
        this.isSubmitting = true;
        setTimeout(() => {
            this.isSubmitting = false;
            this.showSuccess = true;
        }, 800);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "EvalQuestionnairePage";
    }
}
class QuestionCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__question = new SynchedPropertyObjectOneWayPU(params.question, this, "question");
        this.__index = new SynchedPropertySimpleOneWayPU(params.index, this, "index");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QuestionCard_Params) {
        if (params.index === undefined) {
            this.__index.set(1);
        }
    }
    updateStateVars(params: QuestionCard_Params) {
        this.__question.reset(params.question);
        this.__index.reset(params.index);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__question.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__question.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __question: SynchedPropertySimpleOneWayPU<EvaluationQuestion>;
    get question() {
        return this.__question.get();
    }
    set question(newValue: EvaluationQuestion) {
        this.__question.set(newValue);
    }
    private __index: SynchedPropertySimpleOneWayPU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(175:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 题目标题
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(177:7)", "entry");
            // 题目标题
            Row.width('100%');
            // 题目标题
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.index}. ${this.question.title}`);
            Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(178:9)", "entry");
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.question.required) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('*');
                        Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(185:11)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#DC2626');
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
        // 题目标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 根据题型渲染
            if (this.question.type === 'single') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildSingleQuestion.bind(this)();
                });
            }
            else if (this.question.type === 'multi') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildMultiQuestion.bind(this)();
                });
            }
            else if (this.question.type === 'star') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildStarQuestion.bind(this)();
                });
            }
            else if (this.question.type === 'text') {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.buildTextQuestion.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(4, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    /** 单选题 */
    buildSingleQuestion(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(214:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const opt = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(216:9)", "entry");
                    Row.width('100%');
                    Row.padding({ top: 8, bottom: 8 });
                    Row.onClick(() => {
                        this.question.answer = opt.id;
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.question.answer === opt.id ? '🔘' : '⚪');
                    Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(217:11)", "entry");
                    Text.fontSize(16);
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(opt.label);
                    Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(220:11)", "entry");
                    Text.fontSize(13);
                    Text.fontColor('#334155');
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.question.options, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    /** 多选题 */
    buildMultiQuestion(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(237:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const opt = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(239:9)", "entry");
                    Row.width('100%');
                    Row.padding({ top: 8, bottom: 8 });
                    Row.onClick(() => this.toggleOption(opt.id));
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.isOptionSelected(opt.id) ? '☑' : '☐');
                    Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(240:11)", "entry");
                    Text.fontSize(16);
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(opt.label);
                    Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(243:11)", "entry");
                    Text.fontSize(13);
                    Text.fontColor('#334155');
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.question.options, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    /** 星级评分 */
    buildStarQuestion(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(258:5)", "entry");
            Row.width('100%');
            Row.padding({ top: 4, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const star = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(star <= (this.question.answer as number || 0) ? '★' : '☆');
                    Text.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(260:9)", "entry");
                    Text.fontSize(28);
                    Text.fontColor(star <= (this.question.answer as number || 0) ? '#F59E0B' : '#CBD5E1');
                    Text.margin({ right: 8 });
                    Text.onClick(() => {
                        this.question.answer = star;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    /** 主观题 */
    buildTextQuestion(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '请输入您的意见...' });
            TextArea.debugLine("entry/src/main/ets/pages/EvalQuestionnairePage.ets(276:5)", "entry");
            TextArea.width('100%');
            TextArea.height(100);
            TextArea.fontSize(13);
            TextArea.backgroundColor('#F8FAFC');
            TextArea.borderRadius(8);
            TextArea.padding(10);
            TextArea.onChange((val: string) => {
                this.question.answer = val;
            });
        }, TextArea);
    }
    /** 判断多选选项是否选中 */
    private isOptionSelected(optionId: string): boolean {
        const answer = this.question.answer as string[];
        return answer ? answer.includes(optionId) : false;
    }
    /** 切换多选选项 */
    private toggleOption(optionId: string): void {
        const current = this.question.answer as string[];
        const answer: string[] = current ? current.slice() : [];
        const pos = answer.indexOf(optionId);
        if (pos >= 0) {
            answer.splice(pos, 1);
        }
        else {
            answer.push(optionId);
        }
        this.question.answer = answer;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new EvalQuestionnairePage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/EvalQuestionnairePage", pageFullPath: "entry/src/main/ets/pages/EvalQuestionnairePage", integratedHsp: "false", moduleType: "followWithHap" });
