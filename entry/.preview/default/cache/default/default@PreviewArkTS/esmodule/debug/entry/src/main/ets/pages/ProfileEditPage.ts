if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface EditableField_Params {
    label?: string;
    placeholder?: string;
    errorMsg?: string;
    value?: string;
    onChange?: (val: string) => void;
}
interface ReadOnlyField_Params {
    label?: string;
    value?: string;
    isLast?: boolean;
}
interface ProfileEditPage_Params {
    phone?: string;
    email?: string;
    address?: string;
    phoneError?: string;
    emailError?: string;
    isSubmitting?: boolean;
    toastMsg?: string;
    showToast?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { CommonButton } from "@normalized:N&&&entry/src/main/ets/components/CommonButton&";
import { MOCK_STUDENT } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
class ProfileEditPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__phone = new ObservedPropertySimplePU(MOCK_STUDENT.phone, this, "phone");
        this.__email = new ObservedPropertySimplePU(MOCK_STUDENT.email, this, "email");
        this.__address = new ObservedPropertySimplePU(MOCK_STUDENT.address, this, "address");
        this.__phoneError = new ObservedPropertySimplePU('', this, "phoneError");
        this.__emailError = new ObservedPropertySimplePU('', this, "emailError");
        this.__isSubmitting = new ObservedPropertySimplePU(false, this, "isSubmitting");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfileEditPage_Params) {
        if (params.phone !== undefined) {
            this.phone = params.phone;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.address !== undefined) {
            this.address = params.address;
        }
        if (params.phoneError !== undefined) {
            this.phoneError = params.phoneError;
        }
        if (params.emailError !== undefined) {
            this.emailError = params.emailError;
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
    updateStateVars(params: ProfileEditPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__phone.purgeDependencyOnElmtId(rmElmtId);
        this.__email.purgeDependencyOnElmtId(rmElmtId);
        this.__address.purgeDependencyOnElmtId(rmElmtId);
        this.__phoneError.purgeDependencyOnElmtId(rmElmtId);
        this.__emailError.purgeDependencyOnElmtId(rmElmtId);
        this.__isSubmitting.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__phone.aboutToBeDeleted();
        this.__email.aboutToBeDeleted();
        this.__address.aboutToBeDeleted();
        this.__phoneError.aboutToBeDeleted();
        this.__emailError.aboutToBeDeleted();
        this.__isSubmitting.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __phone: ObservedPropertySimplePU<string>;
    get phone() {
        return this.__phone.get();
    }
    set phone(newValue: string) {
        this.__phone.set(newValue);
    }
    private __email: ObservedPropertySimplePU<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __address: ObservedPropertySimplePU<string>;
    get address() {
        return this.__address.get();
    }
    set address(newValue: string) {
        this.__address.set(newValue);
    }
    private __phoneError: ObservedPropertySimplePU<string>;
    get phoneError() {
        return this.__phoneError.get();
    }
    set phoneError(newValue: string) {
        this.__phoneError.set(newValue);
    }
    private __emailError: ObservedPropertySimplePU<string>;
    get emailError() {
        return this.__emailError.get();
    }
    set emailError(newValue: string) {
        this.__emailError.set(newValue);
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
            Stack.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(24:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(25:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '修改个人信息', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 26, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '修改个人信息',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '修改个人信息', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(28:9)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(29:11)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 头像区域
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(31:13)", "entry");
            // 头像区域
            Column.width('100%');
            // 头像区域
            Column.alignItems(HorizontalAlign.Center);
            // 头像区域
            Column.margin({ top: 20, bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(32:15)", "entry");
            Column.width(80);
            Column.height(80);
            Column.borderRadius(20);
            Column.backgroundColor('#1E40AF');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(MOCK_STUDENT.avatarInitial);
            Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(33:17)", "entry");
            Text.fontSize(36);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('点击更换头像');
            Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(41:15)", "entry");
            Text.fontSize(12);
            Text.fontColor('#2563EB');
        }, Text);
        Text.pop();
        // 头像区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 只读字段
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(48:13)", "entry");
            // 只读字段
            Column.width('100%');
            // 只读字段
            Column.padding(18);
            // 只读字段
            Column.backgroundColor('#F8FAFC');
            // 只读字段
            Column.borderRadius(12);
            // 只读字段
            Column.margin({ left: 14, right: 14, bottom: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基本信息（不可编辑）');
            Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(49:15)", "entry");
            Text.fontSize(11);
            Text.fontWeight(700);
            Text.fontColor('#64748B');
            Text.width('100%');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ReadOnlyField(this, { label: '学号', value: MOCK_STUDENT.studentId }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 52, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '学号',
                            value: MOCK_STUDENT.studentId
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '学号', value: MOCK_STUDENT.studentId
                    });
                }
            }, { name: "ReadOnlyField" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ReadOnlyField(this, { label: '学院', value: MOCK_STUDENT.college }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 53, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '学院',
                            value: MOCK_STUDENT.college
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '学院', value: MOCK_STUDENT.college
                    });
                }
            }, { name: "ReadOnlyField" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ReadOnlyField(this, { label: '专业', value: MOCK_STUDENT.major }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 54, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '专业',
                            value: MOCK_STUDENT.major
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '专业', value: MOCK_STUDENT.major
                    });
                }
            }, { name: "ReadOnlyField" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ReadOnlyField(this, { label: '班级', value: MOCK_STUDENT.className, isLast: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 55, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '班级',
                            value: MOCK_STUDENT.className,
                            isLast: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '班级', value: MOCK_STUDENT.className, isLast: true
                    });
                }
            }, { name: "ReadOnlyField" });
        }
        // 只读字段
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 可编辑字段
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(62:13)", "entry");
            // 可编辑字段
            Column.width('100%');
            // 可编辑字段
            Column.padding(18);
            // 可编辑字段
            Column.backgroundColor('#FFFFFF');
            // 可编辑字段
            Column.borderRadius(12);
            // 可编辑字段
            Column.margin({ left: 14, right: 14, bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('联系信息');
            Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(63:15)", "entry");
            Text.fontSize(11);
            Text.fontWeight(700);
            Text.fontColor('#64748B');
            Text.width('100%');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new EditableField(this, {
                        label: '手机号', value: this.__phone, placeholder: '请输入手机号',
                        errorMsg: this.phoneError,
                        onChange: (val: string) => { this.phone = val; this.phoneError = ''; }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 66, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '手机号',
                            value: this.phone,
                            placeholder: '请输入手机号',
                            errorMsg: this.phoneError,
                            onChange: (val: string) => { this.phone = val; this.phoneError = ''; }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '手机号', placeholder: '请输入手机号',
                        errorMsg: this.phoneError
                    });
                }
            }, { name: "EditableField" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new EditableField(this, {
                        label: '邮箱', value: this.__email, placeholder: '请输入邮箱',
                        errorMsg: this.emailError,
                        onChange: (val: string) => { this.email = val; this.emailError = ''; }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 72, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '邮箱',
                            value: this.email,
                            placeholder: '请输入邮箱',
                            errorMsg: this.emailError,
                            onChange: (val: string) => { this.email = val; this.emailError = ''; }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '邮箱', placeholder: '请输入邮箱',
                        errorMsg: this.emailError
                    });
                }
            }, { name: "EditableField" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new EditableField(this, {
                        label: '通讯地址', value: this.__address, placeholder: '请输入通讯地址',
                        onChange: (val: string) => { this.address = val; }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 78, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '通讯地址',
                            value: this.address,
                            placeholder: '请输入通讯地址',
                            onChange: (val: string) => { this.address = val; }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '通讯地址', placeholder: '请输入通讯地址'
                    });
                }
            }, { name: "EditableField" });
        }
        // 可编辑字段
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 提交按钮
                    CommonButton(this, {
                        label: this.isSubmitting ? '保存中...' : '保存修改',
                        block: true,
                        disabled: this.isSubmitting,
                        loading: this.isSubmitting,
                        onTap: () => this.handleSubmit()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProfileEditPage.ets", line: 88, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: this.isSubmitting ? '保存中...' : '保存修改',
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
                        label: this.isSubmitting ? '保存中...' : '保存修改',
                        block: true,
                        disabled: this.isSubmitting,
                        loading: this.isSubmitting
                    });
                }
            }, { name: "CommonButton" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(96:13)", "entry");
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
                        Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(105:9)", "entry");
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
        // 校验
        if (!/^1[3-9]\d{9}$/.test(this.phone)) {
            this.phoneError = '请输入正确的手机号';
            return;
        }
        if (this.email && !/^[\w.-]+@[\w.-]+\.\w+$/.test(this.email)) {
            this.emailError = '请输入正确的邮箱格式';
            return;
        }
        this.isSubmitting = true;
        setTimeout(() => {
            this.isSubmitting = false;
            this.showToastOnce('保存成功');
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
        return "ProfileEditPage";
    }
}
class ReadOnlyField extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__label = new SynchedPropertySimpleOneWayPU(params.label, this, "label");
        this.__value = new SynchedPropertySimpleOneWayPU(params.value, this, "value");
        this.__isLast = new SynchedPropertySimpleOneWayPU(params.isLast, this, "isLast");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ReadOnlyField_Params) {
        if (params.label === undefined) {
            this.__label.set('');
        }
        if (params.value === undefined) {
            this.__value.set('');
        }
        if (params.isLast === undefined) {
            this.__isLast.set(false);
        }
    }
    updateStateVars(params: ReadOnlyField_Params) {
        this.__label.reset(params.label);
        this.__value.reset(params.value);
        this.__isLast.reset(params.isLast);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__label.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
        this.__isLast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__label.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__isLast.aboutToBeDeleted();
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
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    private __isLast: SynchedPropertySimpleOneWayPU<boolean>;
    get isLast() {
        return this.__isLast.get();
    }
    set isLast(newValue: boolean) {
        this.__isLast.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(149:5)", "entry");
            Row.width('100%');
            Row.padding({ top: 10, bottom: 10 });
            Row.borderWidth({ bottom: this.isLast ? 0 : 0.5 });
            Row.borderColor('#E2E8F0');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.label);
            Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(150:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.value);
            Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(151:7)", "entry");
            Text.fontSize(13);
            Text.fontWeight(500);
            Text.fontColor('#475569');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class EditableField extends ViewPU {
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
    setInitiallyProvidedValue(params: EditableField_Params) {
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
    updateStateVars(params: EditableField_Params) {
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
    private onChange?: (val: string) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(172:5)", "entry");
            Column.width('100%');
            Column.margin({ bottom: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(173:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.label);
            Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(174:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.value, placeholder: this.placeholder });
            TextInput.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(176:9)", "entry");
            TextInput.fontSize(13);
            TextInput.height(38);
            TextInput.layoutWeight(1);
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(8);
            TextInput.padding({ left: 10 });
            TextInput.maxLength(50);
            TextInput.borderWidth(1);
            TextInput.borderColor(this.errorMsg ? '#DC2626' : '#E2E8F0');
            TextInput.onChange((val: string) => {
                this.value = val;
                if (this.onChange)
                    this.onChange(val);
            });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.errorMsg) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMsg);
                        Text.debugLine("entry/src/main/ets/pages/ProfileEditPage.ets(188:9)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#DC2626');
                        Text.margin({ top: 4 });
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
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new ProfileEditPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/ProfileEditPage", pageFullPath: "entry/src/main/ets/pages/ProfileEditPage", integratedHsp: "false", moduleType: "followWithHap" });
