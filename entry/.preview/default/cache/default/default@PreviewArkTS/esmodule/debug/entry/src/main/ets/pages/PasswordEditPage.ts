if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PasswordField_Params {
    label?: string;
    placeholder?: string;
    errorMsg?: string;
    value?: string;
    onChange?: () => void;
}
interface PasswordEditPage_Params {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    oldError?: string;
    newError?: string;
    confirmError?: string;
    isSubmitting?: boolean;
    toastMsg?: string;
    showToast?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { CommonButton } from "@normalized:N&&&entry/src/main/ets/components/CommonButton&";
class PasswordEditPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__oldPassword = new ObservedPropertySimplePU('', this, "oldPassword");
        this.__newPassword = new ObservedPropertySimplePU('', this, "newPassword");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.__oldError = new ObservedPropertySimplePU('', this, "oldError");
        this.__newError = new ObservedPropertySimplePU('', this, "newError");
        this.__confirmError = new ObservedPropertySimplePU('', this, "confirmError");
        this.__isSubmitting = new ObservedPropertySimplePU(false, this, "isSubmitting");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PasswordEditPage_Params) {
        if (params.oldPassword !== undefined) {
            this.oldPassword = params.oldPassword;
        }
        if (params.newPassword !== undefined) {
            this.newPassword = params.newPassword;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
        if (params.oldError !== undefined) {
            this.oldError = params.oldError;
        }
        if (params.newError !== undefined) {
            this.newError = params.newError;
        }
        if (params.confirmError !== undefined) {
            this.confirmError = params.confirmError;
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
    }
    updateStateVars(params: PasswordEditPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__oldPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__newPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__oldError.purgeDependencyOnElmtId(rmElmtId);
        this.__newError.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmError.purgeDependencyOnElmtId(rmElmtId);
        this.__isSubmitting.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__oldPassword.aboutToBeDeleted();
        this.__newPassword.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__oldError.aboutToBeDeleted();
        this.__newError.aboutToBeDeleted();
        this.__confirmError.aboutToBeDeleted();
        this.__isSubmitting.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __oldPassword: ObservedPropertySimplePU<string>;
    get oldPassword() {
        return this.__oldPassword.get();
    }
    set oldPassword(newValue: string) {
        this.__oldPassword.set(newValue);
    }
    private __newPassword: ObservedPropertySimplePU<string>;
    get newPassword() {
        return this.__newPassword.get();
    }
    set newPassword(newValue: string) {
        this.__newPassword.set(newValue);
    }
    private __confirmPassword: ObservedPropertySimplePU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    private __oldError: ObservedPropertySimplePU<string>;
    get oldError() {
        return this.__oldError.get();
    }
    set oldError(newValue: string) {
        this.__oldError.set(newValue);
    }
    private __newError: ObservedPropertySimplePU<string>;
    get newError() {
        return this.__newError.get();
    }
    set newError(newValue: string) {
        this.__newError.set(newValue);
    }
    private __confirmError: ObservedPropertySimplePU<string>;
    get confirmError() {
        return this.__confirmError.get();
    }
    set confirmError(newValue: string) {
        this.__confirmError.set(newValue);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(24:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(25:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '修改密码', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PasswordEditPage.ets", line: 26, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '修改密码',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '修改密码', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(28:9)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(29:11)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 安全提示
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(31:13)", "entry");
            // 安全提示
            Column.width('100%');
            // 安全提示
            Column.alignItems(HorizontalAlign.Center);
            // 安全提示
            Column.margin({ top: 24, bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔐');
            Text.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(32:15)", "entry");
            Text.fontSize(24);
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('请妥善保管密码，勿泄露他人');
            Text.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(33:15)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
        }, Text);
        Text.pop();
        // 安全提示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 表单
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(40:13)", "entry");
            // 表单
            Column.width('100%');
            // 表单
            Column.padding(18);
            // 表单
            Column.backgroundColor('#FFFFFF');
            // 表单
            Column.borderRadius(12);
            // 表单
            Column.margin({ left: 14, right: 14, bottom: 20 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PasswordField(this, {
                        label: '原密码', value: this.__oldPassword, placeholder: '请输入原密码',
                        errorMsg: this.oldError, onChange: () => { this.oldError = ''; }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PasswordEditPage.ets", line: 41, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '原密码',
                            value: this.oldPassword,
                            placeholder: '请输入原密码',
                            errorMsg: this.oldError,
                            onChange: () => { this.oldError = ''; }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '原密码', placeholder: '请输入原密码',
                        errorMsg: this.oldError
                    });
                }
            }, { name: "PasswordField" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PasswordField(this, {
                        label: '新密码', value: this.__newPassword, placeholder: '6-20位字母与数字组合',
                        errorMsg: this.newError, onChange: () => { this.newError = ''; }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PasswordEditPage.ets", line: 45, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '新密码',
                            value: this.newPassword,
                            placeholder: '6-20位字母与数字组合',
                            errorMsg: this.newError,
                            onChange: () => { this.newError = ''; }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '新密码', placeholder: '6-20位字母与数字组合',
                        errorMsg: this.newError
                    });
                }
            }, { name: "PasswordField" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PasswordField(this, {
                        label: '确认新密码', value: this.__confirmPassword, placeholder: '请再次输入新密码',
                        errorMsg: this.confirmError, onChange: () => { this.confirmError = ''; }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PasswordEditPage.ets", line: 49, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '确认新密码',
                            value: this.confirmPassword,
                            placeholder: '请再次输入新密码',
                            errorMsg: this.confirmError,
                            onChange: () => { this.confirmError = ''; }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '确认新密码', placeholder: '请再次输入新密码',
                        errorMsg: this.confirmError
                    });
                }
            }, { name: "PasswordField" });
        }
        // 表单
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CommonButton(this, {
                        label: this.isSubmitting ? '修改中...' : '确认修改',
                        block: true, disabled: this.isSubmitting, loading: this.isSubmitting,
                        onTap: () => this.handleSubmit()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PasswordEditPage.ets", line: 58, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: this.isSubmitting ? '修改中...' : '确认修改',
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
                        label: this.isSubmitting ? '修改中...' : '确认修改',
                        block: true, disabled: this.isSubmitting, loading: this.isSubmitting
                    });
                }
            }, { name: "CommonButton" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(64:13)", "entry");
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
                        Text.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(72:9)", "entry");
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
        if (!this.oldPassword) {
            this.oldError = '请输入原密码';
            return;
        }
        if (this.oldPassword !== '123456') {
            this.oldError = '原密码错误';
            return;
        }
        if (!this.newPassword || this.newPassword.length < 6) {
            this.newError = '新密码至少 6 位';
            return;
        }
        if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(this.newPassword)) {
            this.newError = '密码需包含字母和数字';
            return;
        }
        if (this.newPassword !== this.confirmPassword) {
            this.confirmError = '两次密码不一致';
            return;
        }
        this.isSubmitting = true;
        setTimeout(() => {
            this.isSubmitting = false;
            this.showToastOnce('密码修改成功');
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
        return "PasswordEditPage";
    }
}
class PasswordField extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__label = new SynchedPropertySimpleOneWayPU(params.label, this, "label");
        this.__placeholder = new SynchedPropertySimpleOneWayPU(params.placeholder, this, "placeholder");
        this.__errorMsg = new SynchedPropertySimpleOneWayPU(params.errorMsg, this, "errorMsg");
        this.__value = new SynchedPropertySimpleTwoWayPU(params.value, this, "value");
        this.onChange = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PasswordField_Params) {
        if (params.label === undefined) {
            this.__label.set('');
        }
        if (params.placeholder === undefined) {
            this.__placeholder.set('');
        }
        if (params.errorMsg === undefined) {
            this.__errorMsg.set('');
        }
        if (params.onChange !== undefined) {
            this.onChange = params.onChange;
        }
    }
    updateStateVars(params: PasswordField_Params) {
        this.__label.reset(params.label);
        this.__placeholder.reset(params.placeholder);
        this.__errorMsg.reset(params.errorMsg);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__label.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholder.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__label.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__errorMsg.aboutToBeDeleted();
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
    private __placeholder: SynchedPropertySimpleOneWayPU<string>;
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __errorMsg: SynchedPropertySimpleOneWayPU<string>;
    get errorMsg() {
        return this.__errorMsg.get();
    }
    set errorMsg(newValue: string) {
        this.__errorMsg.set(newValue);
    }
    private __value: SynchedPropertySimpleTwoWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    private onChange?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(117:5)", "entry");
            Column.width('100%');
            Column.margin({ bottom: 18 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.label);
            Text.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(118:7)", "entry");
            Text.fontSize(13);
            Text.fontWeight(600);
            Text.fontColor('#0F172A');
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.value, placeholder: this.placeholder });
            TextInput.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(119:7)", "entry");
            TextInput.type(InputType.Password);
            TextInput.fontSize(14);
            TextInput.height(46);
            TextInput.width('100%');
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(10);
            TextInput.borderWidth(1);
            TextInput.borderColor(this.errorMsg ? '#DC2626' : '#E2E8F0');
            TextInput.padding({ left: 14 });
            TextInput.onChange((val: string) => { this.value = val; if (this.onChange)
                this.onChange(); });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.errorMsg) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMsg);
                        Text.debugLine("entry/src/main/ets/pages/PasswordEditPage.ets(127:9)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#DC2626');
                        Text.margin({ top: 4 });
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
registerNamedRoute(() => new PasswordEditPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/PasswordEditPage", pageFullPath: "entry/src/main/ets/pages/PasswordEditPage", integratedHsp: "false", moduleType: "followWithHap" });
