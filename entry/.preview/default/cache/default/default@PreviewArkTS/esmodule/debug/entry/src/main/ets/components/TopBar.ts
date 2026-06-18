if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TopBar_Params {
    title?: string;
    showBack?: boolean;
    rightText?: string;
    /** 返回点击回调 */
    onBack?: () => void;
    /** 右侧按钮点击回调 */
    onRightClick?: () => void;
}
export class TopBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.__showBack = new SynchedPropertySimpleOneWayPU(params.showBack, this, "showBack");
        this.__rightText = new SynchedPropertySimpleOneWayPU(params.rightText, this, "rightText");
        this.onBack = undefined;
        this.onRightClick = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TopBar_Params) {
        if (params.title === undefined) {
            this.__title.set('教学管理系统');
        }
        if (params.showBack === undefined) {
            this.__showBack.set(false);
        }
        if (params.rightText === undefined) {
            this.__rightText.set('');
        }
        if (params.onBack !== undefined) {
            this.onBack = params.onBack;
        }
        if (params.onRightClick !== undefined) {
            this.onRightClick = params.onRightClick;
        }
    }
    updateStateVars(params: TopBar_Params) {
        this.__title.reset(params.title);
        this.__showBack.reset(params.showBack);
        this.__rightText.reset(params.rightText);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__showBack.purgeDependencyOnElmtId(rmElmtId);
        this.__rightText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__showBack.aboutToBeDeleted();
        this.__rightText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 标题文字 */
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    /** 是否显示返回按钮 */
    private __showBack: SynchedPropertySimpleOneWayPU<boolean>;
    get showBack() {
        return this.__showBack.get();
    }
    set showBack(newValue: boolean) {
        this.__showBack.set(newValue);
    }
    /** 右侧文字按钮（如"退出"） */
    private __rightText: SynchedPropertySimpleOneWayPU<string>;
    get rightText() {
        return this.__rightText.get();
    }
    set rightText(newValue: string) {
        this.__rightText.set(newValue);
    }
    /** 返回点击回调 */
    private onBack?: () => void;
    /** 右侧按钮点击回调 */
    private onRightClick?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/components/TopBar.ets(19:5)", "entry");
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 14, right: 14 });
            Row.backgroundColor('rgba(255, 255, 255, 0.92)');
            Row.backdropBlur(10);
            Row.borderWidth({ bottom: 1 });
            Row.borderColor('#E2E8F0');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 返回按钮区域
            if (this.showBack) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.debugLine("entry/src/main/ets/components/TopBar.ets(22:9)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.backgroundColor(Color.Transparent);
                        Button.width(40);
                        Button.height(40);
                        Button.borderRadius(10);
                        Button.fontColor('#2563EB');
                        Button.onClick(() => {
                            if (this.onBack) {
                                this.onBack();
                            }
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('←');
                        Text.debugLine("entry/src/main/ets/components/TopBar.ets(23:11)", "entry");
                        Text.fontSize(22);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 占位保持标题居中
                        Row.create();
                        Row.debugLine("entry/src/main/ets/components/TopBar.ets(38:9)", "entry");
                        // 占位保持标题居中
                        Row.width(40);
                        // 占位保持标题居中
                        Row.height(40);
                    }, Row);
                    // 占位保持标题居中
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create(this.title);
            Text.debugLine("entry/src/main/ets/components/TopBar.ets(42:7)", "entry");
            // 标题
            Text.fontSize(18);
            // 标题
            Text.fontWeight(FontWeight.Bold);
            // 标题
            Text.fontColor('#0F172A');
            // 标题
            Text.textAlign(TextAlign.Center);
            // 标题
            Text.layoutWeight(1);
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 右侧按钮
            if (this.rightText && this.rightText.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.rightText);
                        Button.debugLine("entry/src/main/ets/components/TopBar.ets(51:9)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.backgroundColor(Color.Transparent);
                        Button.fontSize(13);
                        Button.fontWeight(600);
                        Button.fontColor('#64748B');
                        Button.padding({ left: 10, right: 10 });
                        Button.width(56);
                        Button.height(40);
                        Button.borderRadius(10);
                        Button.onClick(() => {
                            if (this.onRightClick) {
                                this.onRightClick();
                            }
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/components/TopBar.ets(67:9)", "entry");
                        Row.width(40);
                        Row.height(40);
                    }, Row);
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
