if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ErrorPlaceholder_Params {
    message?: string;
    showRetry?: boolean;
    /** 重试回调 */
    onRetry?: () => void;
}
interface EmptyPlaceholder_Params {
    message?: string;
    subMessage?: string;
    showAction?: boolean;
    actionText?: string;
    iconText?: string;
    /** 操作按钮点击回调 */
    onAction?: () => void;
}
export class EmptyPlaceholder extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new SynchedPropertySimpleOneWayPU(params.message, this, "message");
        this.__subMessage = new SynchedPropertySimpleOneWayPU(params.subMessage, this, "subMessage");
        this.__showAction = new SynchedPropertySimpleOneWayPU(params.showAction, this, "showAction");
        this.__actionText = new SynchedPropertySimpleOneWayPU(params.actionText, this, "actionText");
        this.__iconText = new SynchedPropertySimpleOneWayPU(params.iconText, this, "iconText");
        this.onAction = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EmptyPlaceholder_Params) {
        if (params.message === undefined) {
            this.__message.set('暂无数据');
        }
        if (params.subMessage === undefined) {
            this.__subMessage.set('');
        }
        if (params.showAction === undefined) {
            this.__showAction.set(false);
        }
        if (params.actionText === undefined) {
            this.__actionText.set('刷新');
        }
        if (params.iconText === undefined) {
            this.__iconText.set('📭');
        }
        if (params.onAction !== undefined) {
            this.onAction = params.onAction;
        }
    }
    updateStateVars(params: EmptyPlaceholder_Params) {
        this.__message.reset(params.message);
        this.__subMessage.reset(params.subMessage);
        this.__showAction.reset(params.showAction);
        this.__actionText.reset(params.actionText);
        this.__iconText.reset(params.iconText);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__subMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__showAction.purgeDependencyOnElmtId(rmElmtId);
        this.__actionText.purgeDependencyOnElmtId(rmElmtId);
        this.__iconText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__subMessage.aboutToBeDeleted();
        this.__showAction.aboutToBeDeleted();
        this.__actionText.aboutToBeDeleted();
        this.__iconText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 提示文字 */
    private __message: SynchedPropertySimpleOneWayPU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    /** 副提示文字 */
    private __subMessage: SynchedPropertySimpleOneWayPU<string>;
    get subMessage() {
        return this.__subMessage.get();
    }
    set subMessage(newValue: string) {
        this.__subMessage.set(newValue);
    }
    /** 是否显示操作按钮 */
    private __showAction: SynchedPropertySimpleOneWayPU<boolean>;
    get showAction() {
        return this.__showAction.get();
    }
    set showAction(newValue: boolean) {
        this.__showAction.set(newValue);
    }
    /** 操作按钮文字 */
    private __actionText: SynchedPropertySimpleOneWayPU<string>;
    get actionText() {
        return this.__actionText.get();
    }
    set actionText(newValue: string) {
        this.__actionText.set(newValue);
    }
    /** 图标文字 */
    private __iconText: SynchedPropertySimpleOneWayPU<string>;
    get iconText() {
        return this.__iconText.get();
    }
    set iconText(newValue: string) {
        this.__iconText.set(newValue);
    }
    /** 操作按钮点击回调 */
    private onAction?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(22:5)", "entry");
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding({ top: 80, bottom: 40, left: 24, right: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图标
            Text.create(this.iconText);
            Text.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(24:7)", "entry");
            // 图标
            Text.fontSize(48);
            // 图标
            Text.margin({ bottom: 16 });
        }, Text);
        // 图标
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主提示
            Text.create(this.message);
            Text.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(29:7)", "entry");
            // 主提示
            Text.fontSize(16);
            // 主提示
            Text.fontWeight(FontWeight.Medium);
            // 主提示
            Text.fontColor('#0F172A');
            // 主提示
            Text.margin({ bottom: 6 });
        }, Text);
        // 主提示
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 副提示
            if (this.subMessage && this.subMessage.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.subMessage);
                        Text.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(37:9)", "entry");
                        Text.fontSize(13);
                        Text.fontColor('#64748B');
                        Text.textAlign(TextAlign.Center);
                        Text.maxLines(2);
                    }, Text);
                    Text.pop();
                });
            }
            // 操作按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 操作按钮
            if (this.showAction) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.actionText);
                        Button.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(46:9)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.backgroundColor('#2563EB');
                        Button.fontColor(Color.White);
                        Button.fontSize(14);
                        Button.fontWeight(600);
                        Button.borderRadius(10);
                        Button.padding({ left: 24, right: 24, top: 10, bottom: 10 });
                        Button.margin({ top: 20 });
                        Button.onClick(() => {
                            if (this.onAction) {
                                this.onAction();
                            }
                        });
                    }, Button);
                    Button.pop();
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
export class ErrorPlaceholder extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new SynchedPropertySimpleOneWayPU(params.message, this, "message");
        this.__showRetry = new SynchedPropertySimpleOneWayPU(params.showRetry, this, "showRetry");
        this.onRetry = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ErrorPlaceholder_Params) {
        if (params.message === undefined) {
            this.__message.set('加载失败，请检查网络后重试');
        }
        if (params.showRetry === undefined) {
            this.__showRetry.set(true);
        }
        if (params.onRetry !== undefined) {
            this.onRetry = params.onRetry;
        }
    }
    updateStateVars(params: ErrorPlaceholder_Params) {
        this.__message.reset(params.message);
        this.__showRetry.reset(params.showRetry);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__showRetry.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__showRetry.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 错误消息 */
    private __message: SynchedPropertySimpleOneWayPU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    /** 是否显示重试按钮 */
    private __showRetry: SynchedPropertySimpleOneWayPU<boolean>;
    get showRetry() {
        return this.__showRetry.get();
    }
    set showRetry(newValue: boolean) {
        this.__showRetry.set(newValue);
    }
    /** 重试回调 */
    private onRetry?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(84:5)", "entry");
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding({ top: 80, bottom: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚠️');
            Text.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(85:7)", "entry");
            Text.fontSize(48);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('出错了');
            Text.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(89:7)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(95:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.textAlign(TextAlign.Center);
            Text.maxLines(3);
            Text.padding({ left: 24, right: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showRetry) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('重试');
                        Button.debugLine("entry/src/main/ets/components/EmptyPlaceholder.ets(103:9)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.backgroundColor('#FFFFFF');
                        Button.fontColor('#2563EB');
                        Button.fontSize(14);
                        Button.fontWeight(600);
                        Button.borderWidth(1);
                        Button.borderColor('#E2E8F0');
                        Button.borderRadius(10);
                        Button.padding({ left: 28, right: 28, top: 10, bottom: 10 });
                        Button.margin({ top: 20 });
                        Button.onClick(() => {
                            if (this.onRetry) {
                                this.onRetry();
                            }
                        });
                    }, Button);
                    Button.pop();
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
