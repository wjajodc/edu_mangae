if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FeedbackPage_Params {
    feedbackType?: string;
    title?: string;
    content?: string;
    titleError?: string;
    contentError?: string;
    isSubmitting?: boolean;
    toastMsg?: string;
    showToast?: boolean;
    types?: string[];
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { CommonButton } from "@normalized:N&&&entry/src/main/ets/components/CommonButton&";
class FeedbackPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__feedbackType = new ObservedPropertySimplePU('功能建议', this, "feedbackType");
        this.__title = new ObservedPropertySimplePU('', this, "title");
        this.__content = new ObservedPropertySimplePU('', this, "content");
        this.__titleError = new ObservedPropertySimplePU('', this, "titleError");
        this.__contentError = new ObservedPropertySimplePU('', this, "contentError");
        this.__isSubmitting = new ObservedPropertySimplePU(false, this, "isSubmitting");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.types = ['功能建议', 'Bug反馈', '使用问题', '其他'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FeedbackPage_Params) {
        if (params.feedbackType !== undefined) {
            this.feedbackType = params.feedbackType;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.titleError !== undefined) {
            this.titleError = params.titleError;
        }
        if (params.contentError !== undefined) {
            this.contentError = params.contentError;
        }
        if (params.isSubmitting !== undefined) {
            this.isSubmitting = params.isSubmitting;
        }
        if (params.toastMsg !== undefined) {
            this.toastMsg = params.toastMsg;
        }
        if (params.showToast !== undefined) {
            this.showToast = params.showToast;
        }
        if (params.types !== undefined) {
            this.types = params.types;
        }
    }
    updateStateVars(params: FeedbackPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__feedbackType.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__content.purgeDependencyOnElmtId(rmElmtId);
        this.__titleError.purgeDependencyOnElmtId(rmElmtId);
        this.__contentError.purgeDependencyOnElmtId(rmElmtId);
        this.__isSubmitting.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__feedbackType.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__titleError.aboutToBeDeleted();
        this.__contentError.aboutToBeDeleted();
        this.__isSubmitting.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __feedbackType: ObservedPropertySimplePU<string>;
    get feedbackType() {
        return this.__feedbackType.get();
    }
    set feedbackType(newValue: string) {
        this.__feedbackType.set(newValue);
    }
    private __title: ObservedPropertySimplePU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __content: ObservedPropertySimplePU<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __titleError: ObservedPropertySimplePU<string>;
    get titleError() {
        return this.__titleError.get();
    }
    set titleError(newValue: string) {
        this.__titleError.set(newValue);
    }
    private __contentError: ObservedPropertySimplePU<string>;
    get contentError() {
        return this.__contentError.get();
    }
    set contentError(newValue: string) {
        this.__contentError.set(newValue);
    }
    private __isSubmitting: ObservedPropertySimplePU<boolean>;
    get isSubmitting() {
        return this.__isSubmitting.get();
    }
    set isSubmitting(newValue: boolean) {
        this.__isSubmitting.set(newValue);
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
    private types: string[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(24:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(25:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '意见反馈', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/FeedbackPage.ets", line: 26, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '意见反馈',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '意见反馈', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(28:9)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(29:11)", "entry");
            Column.width('100%');
            Column.padding({ left: 14, right: 14, top: 18 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 反馈类型
            Text.create('反馈类型');
            Text.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(31:13)", "entry");
            // 反馈类型
            Text.fontSize(13);
            // 反馈类型
            Text.fontWeight(600);
            // 反馈类型
            Text.fontColor('#0F172A');
            // 反馈类型
            Text.width('100%');
            // 反馈类型
            Text.margin({ bottom: 8 });
        }, Text);
        // 反馈类型
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(34:13)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const t = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(t);
                    Text.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(36:17)", "entry");
                    Text.fontSize(12);
                    Text.fontWeight(600);
                    Text.fontColor(this.feedbackType === t ? '#FFFFFF' : '#64748B');
                    Text.backgroundColor(this.feedbackType === t ? '#2563EB' : '#F1F5F9');
                    Text.borderRadius(8);
                    Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                    Text.margin({ right: 8 });
                    Text.onClick(() => { this.feedbackType = t; });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.types, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create('标题');
            Text.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(49:13)", "entry");
            // 标题
            Text.fontSize(13);
            // 标题
            Text.fontWeight(600);
            // 标题
            Text.fontColor('#0F172A');
            // 标题
            Text.width('100%');
            // 标题
            Text.margin({ bottom: 6 });
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.title, placeholder: '请输入反馈标题（必填）' });
            TextInput.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(51:13)", "entry");
            TextInput.fontSize(14);
            TextInput.height(46);
            TextInput.width('100%');
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(10);
            TextInput.borderWidth(1);
            TextInput.borderColor(this.titleError ? '#DC2626' : '#E2E8F0');
            TextInput.padding({ left: 14 });
            TextInput.onChange((val: string) => { this.title = val; this.titleError = ''; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.titleError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.titleError);
                        Text.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(58:15)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#DC2626');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                });
            }
            // 正文
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 正文
            Text.create('详细描述');
            Text.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(62:13)", "entry");
            // 正文
            Text.fontSize(13);
            // 正文
            Text.fontWeight(600);
            // 正文
            Text.fontColor('#0F172A');
            // 正文
            Text.width('100%');
            // 正文
            Text.margin({ top: 18, bottom: 6 });
        }, Text);
        // 正文
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ text: this.content, placeholder: '请详细描述您的问题或建议（必填）' });
            TextArea.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(64:13)", "entry");
            TextArea.fontSize(14);
            TextArea.width('100%');
            TextArea.height(140);
            TextArea.backgroundColor('#F8FAFC');
            TextArea.borderRadius(10);
            TextArea.borderWidth(1);
            TextArea.borderColor(this.contentError ? '#DC2626' : '#E2E8F0');
            TextArea.padding({ left: 14, top: 12 });
            TextArea.onChange((val: string) => { this.content = val; this.contentError = ''; });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.contentError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.contentError);
                        Text.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(71:15)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#DC2626');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                });
            }
            // 提交
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 提交
                    CommonButton(this, {
                        label: this.isSubmitting ? '提交中...' : '提交反馈',
                        block: true, disabled: this.isSubmitting, loading: this.isSubmitting,
                        onTap: () => this.handleSubmit()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/FeedbackPage.ets", line: 75, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: this.isSubmitting ? '提交中...' : '提交反馈',
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
                        label: this.isSubmitting ? '提交中...' : '提交反馈',
                        block: true, disabled: this.isSubmitting, loading: this.isSubmitting
                    });
                }
            }, { name: "CommonButton" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(81:13)", "entry");
            Column.height(24);
        }, Column);
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showToast) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.toastMsg);
                        Text.debugLine("entry/src/main/ets/pages/FeedbackPage.ets(90:9)", "entry");
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
    private handleSubmit(): void {
        if (!this.title.trim()) {
            this.titleError = '请输入标题';
            return;
        }
        if (!this.content.trim()) {
            this.contentError = '请输入详细描述';
            return;
        }
        this.isSubmitting = true;
        setTimeout(() => {
            this.isSubmitting = false;
            this.showToastOnce('反馈提交成功，感谢您的意见！');
            setTimeout(() => router.back(), 600);
        }, 800);
    }
    private showToastOnce(msg: string): void {
        this.toastMsg = msg;
        this.showToast = true;
        setTimeout(() => { this.showToast = false; }, 2000);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FeedbackPage";
    }
}
registerNamedRoute(() => new FeedbackPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/FeedbackPage", pageFullPath: "entry/src/main/ets/pages/FeedbackPage", integratedHsp: "false", moduleType: "followWithHap" });
