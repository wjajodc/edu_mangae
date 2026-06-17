if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConfirmDialog_Params {
    title?: string;
    content?: string;
    visible?: boolean;
    confirmText?: string;
    cancelText?: string;
    /** 确认回调 */
    onConfirm?: () => void;
    /** 取消回调 */
    onCancel?: () => void;
}
export class ConfirmDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.__content = new SynchedPropertySimpleOneWayPU(params.content, this, "content");
        this.__visible = new SynchedPropertySimpleTwoWayPU(params.visible, this, "visible");
        this.__confirmText = new SynchedPropertySimpleOneWayPU(params.confirmText, this, "confirmText");
        this.__cancelText = new SynchedPropertySimpleOneWayPU(params.cancelText, this, "cancelText");
        this.onConfirm = undefined;
        this.onCancel = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConfirmDialog_Params) {
        if (params.title === undefined) {
            this.__title.set('提示');
        }
        if (params.content === undefined) {
            this.__content.set('');
        }
        if (params.confirmText === undefined) {
            this.__confirmText.set('确定');
        }
        if (params.cancelText === undefined) {
            this.__cancelText.set('取消');
        }
        if (params.onConfirm !== undefined) {
            this.onConfirm = params.onConfirm;
        }
        if (params.onCancel !== undefined) {
            this.onCancel = params.onCancel;
        }
    }
    updateStateVars(params: ConfirmDialog_Params) {
        this.__title.reset(params.title);
        this.__content.reset(params.content);
        this.__confirmText.reset(params.confirmText);
        this.__cancelText.reset(params.cancelText);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__content.purgeDependencyOnElmtId(rmElmtId);
        this.__visible.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmText.purgeDependencyOnElmtId(rmElmtId);
        this.__cancelText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        this.__confirmText.aboutToBeDeleted();
        this.__cancelText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 弹窗标题 */
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    /** 弹窗内容 */
    private __content: SynchedPropertySimpleOneWayPU<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    /** 是否显示 */
    private __visible: SynchedPropertySimpleTwoWayPU<boolean>;
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: boolean) {
        this.__visible.set(newValue);
    }
    /** 确认按钮文案 */
    private __confirmText: SynchedPropertySimpleOneWayPU<string>;
    get confirmText() {
        return this.__confirmText.get();
    }
    set confirmText(newValue: string) {
        this.__confirmText.set(newValue);
    }
    /** 取消按钮文案 */
    private __cancelText: SynchedPropertySimpleOneWayPU<string>;
    get cancelText() {
        return this.__cancelText.get();
    }
    set cancelText(newValue: string) {
        this.__cancelText.set(newValue);
    }
    /** 确认回调 */
    private onConfirm?: () => void;
    /** 取消回调 */
    private onCancel?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.visible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/components/ConfirmDialog.ets(25:7)", "entry");
                        Column.width('100%');
                        Column.height('100%');
                        Column.position({ x: 0, y: 0 });
                        Column.zIndex(100);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 遮罩层
                        Column.create();
                        Column.debugLine("entry/src/main/ets/components/ConfirmDialog.ets(27:9)", "entry");
                        // 遮罩层
                        Column.width('100%');
                        // 遮罩层
                        Column.height('100%');
                        // 遮罩层
                        Column.backgroundColor('rgba(15, 23, 42, 0.45)');
                        // 遮罩层
                        Column.onClick(() => {
                            this.visible = false;
                            if (this.onCancel) {
                                this.onCancel();
                            }
                        });
                    }, Column);
                    // 遮罩层
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 弹窗卡片
                        Column.create();
                        Column.debugLine("entry/src/main/ets/components/ConfirmDialog.ets(39:9)", "entry");
                        // 弹窗卡片
                        Column.width('80%');
                        // 弹窗卡片
                        Column.padding(24);
                        // 弹窗卡片
                        Column.backgroundColor('#FFFFFF');
                        // 弹窗卡片
                        Column.borderRadius(16);
                        // 弹窗卡片
                        Column.position({ left: '10%', bottom: 180 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 标题
                        Text.create(this.title);
                        Text.debugLine("entry/src/main/ets/components/ConfirmDialog.ets(41:11)", "entry");
                        // 标题
                        Text.fontSize(17);
                        // 标题
                        Text.fontWeight(FontWeight.Bold);
                        // 标题
                        Text.fontColor('#0F172A');
                        // 标题
                        Text.textAlign(TextAlign.Center);
                        // 标题
                        Text.width('100%');
                        // 标题
                        Text.margin({ bottom: 12 });
                    }, Text);
                    // 标题
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 内容
                        Text.create(this.content);
                        Text.debugLine("entry/src/main/ets/components/ConfirmDialog.ets(50:11)", "entry");
                        // 内容
                        Text.fontSize(14);
                        // 内容
                        Text.fontColor('#475569');
                        // 内容
                        Text.textAlign(TextAlign.Center);
                        // 内容
                        Text.width('100%');
                        // 内容
                        Text.margin({ bottom: 20 });
                    }, Text);
                    // 内容
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 操作按钮
                        Row.create();
                        Row.debugLine("entry/src/main/ets/components/ConfirmDialog.ets(58:11)", "entry");
                        // 操作按钮
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.cancelText);
                        Button.debugLine("entry/src/main/ets/components/ConfirmDialog.ets(59:13)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.layoutWeight(1);
                        Button.height(44);
                        Button.fontSize(14);
                        Button.fontWeight(FontWeight.Medium);
                        Button.fontColor('#0F172A');
                        Button.backgroundColor('#F1F5F9');
                        Button.borderRadius(10);
                        Button.onClick(() => {
                            this.visible = false;
                            if (this.onCancel) {
                                this.onCancel();
                            }
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.confirmText);
                        Button.debugLine("entry/src/main/ets/components/ConfirmDialog.ets(75:13)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.layoutWeight(1);
                        Button.height(44);
                        Button.fontSize(14);
                        Button.fontWeight(FontWeight.Medium);
                        Button.fontColor('#FFFFFF');
                        Button.backgroundColor('#2563EB');
                        Button.borderRadius(10);
                        Button.margin({ left: 12 });
                        Button.onClick(() => {
                            this.visible = false;
                            if (this.onConfirm) {
                                this.onConfirm();
                            }
                        });
                    }, Button);
                    Button.pop();
                    // 操作按钮
                    Row.pop();
                    // 弹窗卡片
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
    }
    rerender() {
        this.updateDirtyElements();
    }
}
