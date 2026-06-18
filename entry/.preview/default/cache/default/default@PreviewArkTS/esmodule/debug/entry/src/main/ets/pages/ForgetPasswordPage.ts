if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ForgetPasswordPage_Params {
    step?: number;
    phone?: string;
    verifyCode?: string;
    newPassword?: string;
    confirmPassword?: string;
    phoneError?: string;
    codeError?: string;
    passwordError?: string;
    isSending?: boolean;
    isSubmitting?: boolean;
    countdown?: number;
    toastMsg?: string;
    showToast?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { CommonButton } from "@normalized:N&&&entry/src/main/ets/components/CommonButton&";
class ForgetPasswordPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__step = new ObservedPropertySimplePU(1, this, "step");
        this.__phone = new ObservedPropertySimplePU('', this, "phone");
        this.__verifyCode = new ObservedPropertySimplePU('', this, "verifyCode");
        this.__newPassword = new ObservedPropertySimplePU('', this, "newPassword");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.__phoneError = new ObservedPropertySimplePU('', this, "phoneError");
        this.__codeError = new ObservedPropertySimplePU('', this, "codeError");
        this.__passwordError = new ObservedPropertySimplePU('', this, "passwordError");
        this.__isSending = new ObservedPropertySimplePU(false, this, "isSending");
        this.__isSubmitting = new ObservedPropertySimplePU(false, this, "isSubmitting");
        this.__countdown = new ObservedPropertySimplePU(0, this, "countdown");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ForgetPasswordPage_Params) {
        if (params.step !== undefined) {
            this.step = params.step;
        }
        if (params.phone !== undefined) {
            this.phone = params.phone;
        }
        if (params.verifyCode !== undefined) {
            this.verifyCode = params.verifyCode;
        }
        if (params.newPassword !== undefined) {
            this.newPassword = params.newPassword;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
        if (params.phoneError !== undefined) {
            this.phoneError = params.phoneError;
        }
        if (params.codeError !== undefined) {
            this.codeError = params.codeError;
        }
        if (params.passwordError !== undefined) {
            this.passwordError = params.passwordError;
        }
        if (params.isSending !== undefined) {
            this.isSending = params.isSending;
        }
        if (params.isSubmitting !== undefined) {
            this.isSubmitting = params.isSubmitting;
        }
        if (params.countdown !== undefined) {
            this.countdown = params.countdown;
        }
        if (params.toastMsg !== undefined) {
            this.toastMsg = params.toastMsg;
        }
        if (params.showToast !== undefined) {
            this.showToast = params.showToast;
        }
    }
    updateStateVars(params: ForgetPasswordPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__step.purgeDependencyOnElmtId(rmElmtId);
        this.__phone.purgeDependencyOnElmtId(rmElmtId);
        this.__verifyCode.purgeDependencyOnElmtId(rmElmtId);
        this.__newPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__phoneError.purgeDependencyOnElmtId(rmElmtId);
        this.__codeError.purgeDependencyOnElmtId(rmElmtId);
        this.__passwordError.purgeDependencyOnElmtId(rmElmtId);
        this.__isSending.purgeDependencyOnElmtId(rmElmtId);
        this.__isSubmitting.purgeDependencyOnElmtId(rmElmtId);
        this.__countdown.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__step.aboutToBeDeleted();
        this.__phone.aboutToBeDeleted();
        this.__verifyCode.aboutToBeDeleted();
        this.__newPassword.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__phoneError.aboutToBeDeleted();
        this.__codeError.aboutToBeDeleted();
        this.__passwordError.aboutToBeDeleted();
        this.__isSending.aboutToBeDeleted();
        this.__isSubmitting.aboutToBeDeleted();
        this.__countdown.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __step: ObservedPropertySimplePU<number>; // 1=输入手机号, 2=验证码, 3=设置新密码
    get step() {
        return this.__step.get();
    }
    set step(newValue: number) {
        this.__step.set(newValue);
    }
    private __phone: ObservedPropertySimplePU<string>;
    get phone() {
        return this.__phone.get();
    }
    set phone(newValue: string) {
        this.__phone.set(newValue);
    }
    private __verifyCode: ObservedPropertySimplePU<string>;
    get verifyCode() {
        return this.__verifyCode.get();
    }
    set verifyCode(newValue: string) {
        this.__verifyCode.set(newValue);
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
    private __phoneError: ObservedPropertySimplePU<string>;
    get phoneError() {
        return this.__phoneError.get();
    }
    set phoneError(newValue: string) {
        this.__phoneError.set(newValue);
    }
    private __codeError: ObservedPropertySimplePU<string>;
    get codeError() {
        return this.__codeError.get();
    }
    set codeError(newValue: string) {
        this.__codeError.set(newValue);
    }
    private __passwordError: ObservedPropertySimplePU<string>;
    get passwordError() {
        return this.__passwordError.get();
    }
    set passwordError(newValue: string) {
        this.__passwordError.set(newValue);
    }
    private __isSending: ObservedPropertySimplePU<boolean>;
    get isSending() {
        return this.__isSending.get();
    }
    set isSending(newValue: boolean) {
        this.__isSending.set(newValue);
    }
    private __isSubmitting: ObservedPropertySimplePU<boolean>;
    get isSubmitting() {
        return this.__isSubmitting.get();
    }
    set isSubmitting(newValue: boolean) {
        this.__isSubmitting.set(newValue);
    }
    private __countdown: ObservedPropertySimplePU<number>;
    get countdown() {
        return this.__countdown.get();
    }
    set countdown(newValue: number) {
        this.__countdown.set(newValue);
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
    aboutToDisappear(): void {
        // 清理定时器
        this.countdown = 0;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(32:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(33:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '忘记密码', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ForgetPasswordPage.ets", line: 34, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '忘记密码',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '忘记密码', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(36:9)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(37:11)", "entry");
            Column.width('100%');
            Column.padding({ left: 24, right: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步骤指示器
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(39:13)", "entry");
            // 步骤指示器
            Row.width('100%');
            // 步骤指示器
            Row.padding({ left: 40, right: 40, top: 30, bottom: 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx: number) => {
                const s = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(41:17)", "entry");
                    Row.layoutWeight(1);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(42:19)", "entry");
                    Column.width(32);
                    Column.height(32);
                    Column.borderRadius(16);
                    Column.backgroundColor(idx + 1 <= this.step ? '#2563EB' : '#E2E8F0');
                    Column.justifyContent(FlexAlign.Center);
                    Column.alignItems(HorizontalAlign.Center);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(s);
                    Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(43:21)", "entry");
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor(idx + 1 <= this.step ? '#FFFFFF' : '#94A3B8');
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (idx < 2) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(53:21)", "entry");
                                Column.height(2);
                                Column.layoutWeight(1);
                                Column.backgroundColor(idx + 1 < this.step ? '#2563EB' : '#E2E8F0');
                                Column.margin({ left: 4, right: 4 });
                            }, Column);
                            Column.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, ['1', '2', '3'], forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 步骤指示器
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步骤标签
            Text.create(this.step === 1 ? '验证身份' : this.step === 2 ? '输入验证码' : '设置新密码');
            Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(65:13)", "entry");
            // 步骤标签
            Text.fontSize(18);
            // 步骤标签
            Text.fontWeight(FontWeight.Bold);
            // 步骤标签
            Text.fontColor('#0F172A');
            // 步骤标签
            Text.margin({ bottom: 24 });
        }, Text);
        // 步骤标签
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.step === 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildStep1.bind(this)();
                });
            }
            else if (this.step === 2) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildStep2.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildStep3.bind(this)();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(76:13)", "entry");
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
                        Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(84:9)", "entry");
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
    buildStep1(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(94:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('请输入绑定的手机号，我们将发送验证码');
            Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(95:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.phone, placeholder: '请输入手机号' });
            TextInput.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(98:7)", "entry");
            TextInput.type(InputType.PhoneNumber);
            TextInput.maxLength(11);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(10);
            TextInput.borderWidth(1);
            TextInput.borderColor(this.phoneError ? '#DC2626' : '#E2E8F0');
            TextInput.padding({ left: 14 });
            TextInput.onChange((val: string) => { this.phone = val; this.phoneError = ''; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.phoneError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.phoneError);
                        Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(106:9)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#DC2626');
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
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CommonButton(this, {
                        label: '获取验证码', block: true,
                        onTap: () => {
                            if (!/^1[3-9]\d{9}$/.test(this.phone)) {
                                this.phoneError = '请输入正确的手机号';
                                return;
                            }
                            this.step = 2;
                            this.showToastOnce('验证码已发送，Mock 码：888888');
                            // 开始倒计时
                            this.countdown = 60;
                            const timer = setInterval(() => {
                                this.countdown--;
                                if (this.countdown <= 0) {
                                    clearInterval(timer);
                                }
                            }, 1000);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ForgetPasswordPage.ets", line: 109, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '获取验证码',
                            block: true,
                            onTap: () => {
                                if (!/^1[3-9]\d{9}$/.test(this.phone)) {
                                    this.phoneError = '请输入正确的手机号';
                                    return;
                                }
                                this.step = 2;
                                this.showToastOnce('验证码已发送，Mock 码：888888');
                                // 开始倒计时
                                this.countdown = 60;
                                const timer = setInterval(() => {
                                    this.countdown--;
                                    if (this.countdown <= 0) {
                                        clearInterval(timer);
                                    }
                                }, 1000);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '获取验证码', block: true
                    });
                }
            }, { name: "CommonButton" });
        }
        Column.pop();
    }
    buildStep2(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(132:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`验证码已发送至 ${this.phone}`);
            Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(133:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.verifyCode, placeholder: '请输入6位验证码' });
            TextInput.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(136:7)", "entry");
            TextInput.type(InputType.Number);
            TextInput.maxLength(6);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(10);
            TextInput.borderWidth(1);
            TextInput.borderColor(this.codeError ? '#DC2626' : '#E2E8F0');
            TextInput.padding({ left: 14 });
            TextInput.onChange((val: string) => { this.verifyCode = val; this.codeError = ''; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.codeError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.codeError);
                        Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(144:9)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#DC2626');
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
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CommonButton(this, {
                        label: '验证', block: true,
                        onTap: () => {
                            if (this.verifyCode !== '888888') {
                                this.codeError = '验证码错误，请重试';
                                return;
                            }
                            this.step = 3;
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ForgetPasswordPage.ets", line: 147, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '验证',
                            block: true,
                            onTap: () => {
                                if (this.verifyCode !== '888888') {
                                    this.codeError = '验证码错误，请重试';
                                    return;
                                }
                                this.step = 3;
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '验证', block: true
                    });
                }
            }, { name: "CommonButton" });
        }
        Column.pop();
    }
    buildStep3(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(161:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('请设置新的登录密码');
            Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(162:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.newPassword, placeholder: '新密码（6-20位字母+数字）' });
            TextInput.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(164:7)", "entry");
            TextInput.type(InputType.Password);
            TextInput.maxLength(20);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(10);
            TextInput.borderWidth(1);
            TextInput.borderColor('#E2E8F0');
            TextInput.padding({ left: 14 });
            TextInput.margin({ bottom: 14 });
            TextInput.onChange((val: string) => { this.newPassword = val; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.confirmPassword, placeholder: '确认新密码' });
            TextInput.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(171:7)", "entry");
            TextInput.type(InputType.Password);
            TextInput.maxLength(20);
            TextInput.fontSize(16);
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(10);
            TextInput.borderWidth(1);
            TextInput.borderColor(this.passwordError ? '#DC2626' : '#E2E8F0');
            TextInput.padding({ left: 14 });
            TextInput.onChange((val: string) => { this.confirmPassword = val; this.passwordError = ''; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.passwordError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.passwordError);
                        Text.debugLine("entry/src/main/ets/pages/ForgetPasswordPage.ets(179:9)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#DC2626');
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
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CommonButton(this, {
                        label: '重置密码', block: true,
                        onTap: () => {
                            if (!this.newPassword || this.newPassword.length < 6) {
                                this.passwordError = '密码至少6位';
                                return;
                            }
                            if (this.newPassword !== this.confirmPassword) {
                                this.passwordError = '两次密码不一致';
                                return;
                            }
                            this.showToastOnce('密码重置成功');
                            setTimeout(() => router.back(), 800);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ForgetPasswordPage.ets", line: 182, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '重置密码',
                            block: true,
                            onTap: () => {
                                if (!this.newPassword || this.newPassword.length < 6) {
                                    this.passwordError = '密码至少6位';
                                    return;
                                }
                                if (this.newPassword !== this.confirmPassword) {
                                    this.passwordError = '两次密码不一致';
                                    return;
                                }
                                this.showToastOnce('密码重置成功');
                                setTimeout(() => router.back(), 800);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '重置密码', block: true
                    });
                }
            }, { name: "CommonButton" });
        }
        Column.pop();
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
        return "ForgetPasswordPage";
    }
}
registerNamedRoute(() => new ForgetPasswordPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/ForgetPasswordPage", pageFullPath: "entry/src/main/ets/pages/ForgetPasswordPage", integratedHsp: "false", moduleType: "followWithHap" });
