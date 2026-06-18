if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CommonButton_Params {
    label?: string;
    variant?: string;
    small?: boolean;
    disabled?: boolean;
    block?: boolean;
    loading?: boolean;
    marginTop?: number;
    /** 点击回调 */
    onTap?: () => void;
}
export class CommonButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__label = new SynchedPropertySimpleOneWayPU(params.label, this, "label");
        this.__variant = new SynchedPropertySimpleOneWayPU(params.variant, this, "variant");
        this.__small = new SynchedPropertySimpleOneWayPU(params.small, this, "small");
        this.__disabled = new SynchedPropertySimpleOneWayPU(params.disabled, this, "disabled");
        this.__block = new SynchedPropertySimpleOneWayPU(params.block, this, "block");
        this.__loading = new SynchedPropertySimpleOneWayPU(params.loading, this, "loading");
        this.__marginTop = new SynchedPropertySimpleOneWayPU(params.marginTop, this, "marginTop");
        this.onTap = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommonButton_Params) {
        if (params.label === undefined) {
            this.__label.set('按钮');
        }
        if (params.variant === undefined) {
            this.__variant.set('primary');
        }
        if (params.small === undefined) {
            this.__small.set(false);
        }
        if (params.disabled === undefined) {
            this.__disabled.set(false);
        }
        if (params.block === undefined) {
            this.__block.set(true);
        }
        if (params.loading === undefined) {
            this.__loading.set(false);
        }
        if (params.marginTop === undefined) {
            this.__marginTop.set(0);
        }
        if (params.onTap !== undefined) {
            this.onTap = params.onTap;
        }
    }
    updateStateVars(params: CommonButton_Params) {
        this.__label.reset(params.label);
        this.__variant.reset(params.variant);
        this.__small.reset(params.small);
        this.__disabled.reset(params.disabled);
        this.__block.reset(params.block);
        this.__loading.reset(params.loading);
        this.__marginTop.reset(params.marginTop);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__label.purgeDependencyOnElmtId(rmElmtId);
        this.__variant.purgeDependencyOnElmtId(rmElmtId);
        this.__small.purgeDependencyOnElmtId(rmElmtId);
        this.__disabled.purgeDependencyOnElmtId(rmElmtId);
        this.__block.purgeDependencyOnElmtId(rmElmtId);
        this.__loading.purgeDependencyOnElmtId(rmElmtId);
        this.__marginTop.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__label.aboutToBeDeleted();
        this.__variant.aboutToBeDeleted();
        this.__small.aboutToBeDeleted();
        this.__disabled.aboutToBeDeleted();
        this.__block.aboutToBeDeleted();
        this.__loading.aboutToBeDeleted();
        this.__marginTop.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 按钮文字 */
    private __label: SynchedPropertySimpleOneWayPU<string>;
    get label() {
        return this.__label.get();
    }
    set label(newValue: string) {
        this.__label.set(newValue);
    }
    /** 按钮样式变体 */
    private __variant: SynchedPropertySimpleOneWayPU<string>; // primary | ghost | danger | block-primary | block-ghost
    get variant() {
        return this.__variant.get();
    }
    set variant(newValue: string) {
        this.__variant.set(newValue);
    }
    /** 是否小尺寸 */
    private __small: SynchedPropertySimpleOneWayPU<boolean>;
    get small() {
        return this.__small.get();
    }
    set small(newValue: boolean) {
        this.__small.set(newValue);
    }
    /** 是否禁用 */
    private __disabled: SynchedPropertySimpleOneWayPU<boolean>;
    get disabled() {
        return this.__disabled.get();
    }
    set disabled(newValue: boolean) {
        this.__disabled.set(newValue);
    }
    /** 是否全宽 */
    private __block: SynchedPropertySimpleOneWayPU<boolean>;
    get block() {
        return this.__block.get();
    }
    set block(newValue: boolean) {
        this.__block.set(newValue);
    }
    /** 是否显示加载状态 */
    private __loading: SynchedPropertySimpleOneWayPU<boolean>;
    get loading() {
        return this.__loading.get();
    }
    set loading(newValue: boolean) {
        this.__loading.set(newValue);
    }
    /** 顶部外边距 */
    private __marginTop: SynchedPropertySimpleOneWayPU<number>;
    get marginTop() {
        return this.__marginTop.get();
    }
    set marginTop(newValue: number) {
        this.__marginTop.set(newValue);
    }
    /** 点击回调 */
    private onTap?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/components/CommonButton.ets(27:5)", "entry");
            Button.type(ButtonType.Normal);
            Button.backgroundColor(this.getBgColor());
            Button.borderRadius(10);
            Button.borderWidth(this.variant === 'ghost' || this.variant === 'block-ghost' ? 1 : 0);
            Button.borderColor('#E2E8F0');
            Button.width(this.block ? '100%' : 'auto');
            Button.padding({
                left: this.small ? 14 : 18,
                right: this.small ? 14 : 18,
                top: this.small ? 8 : 12,
                bottom: this.small ? 8 : 12,
            });
            Button.margin({ top: this.marginTop > 0 ? this.marginTop : (this.block ? 8 : 0) });
            Button.enabled(!this.disabled && !this.loading);
            Button.opacity(this.disabled ? 0.5 : 1.0);
            Button.onClick(() => {
                if (!this.disabled && !this.loading && this.onTap) {
                    this.onTap();
                }
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/components/CommonButton.ets(29:9)", "entry");
                        Row.justifyContent(FlexAlign.Center);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/components/CommonButton.ets(30:11)", "entry");
                        LoadingProgress.width(16);
                        LoadingProgress.height(16);
                        LoadingProgress.color(this.getTextColor());
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(' 处理中...');
                        Text.debugLine("entry/src/main/ets/components/CommonButton.ets(34:11)", "entry");
                        Text.fontSize(this.small ? 13 : 15);
                        Text.fontWeight(600);
                        Text.fontColor(this.getTextColor());
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.label);
                        Text.debugLine("entry/src/main/ets/components/CommonButton.ets(41:9)", "entry");
                        Text.fontSize(this.small ? 13 : 15);
                        Text.fontWeight(600);
                        Text.fontColor(this.getTextColor());
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Button.pop();
    }
    /** 获取背景色 */
    private getBgColor(): string | Color {
        switch (this.variant) {
            case 'ghost':
            case 'block-ghost':
                return '#FFFFFF';
            case 'danger':
                return '#DC2626';
            default:
                return '#2563EB'; // primary / block-primary
        }
    }
    /** 获取文字色 */
    private getTextColor(): string | Color {
        switch (this.variant) {
            case 'ghost':
            case 'block-ghost':
                return '#2563EB';
            case 'danger':
                return '#FFFFFF';
            default:
                return '#FFFFFF'; // primary / block-primary
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
