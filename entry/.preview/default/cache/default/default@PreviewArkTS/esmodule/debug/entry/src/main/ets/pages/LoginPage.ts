if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    studentId?: string;
    password?: string;
    studentIdError?: string;
    passwordError?: string;
    isLoading?: boolean;
    toastMsg?: string;
    showToast?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { CommonButton } from "@normalized:N&&&entry/src/main/ets/components/CommonButton&";
import { MOCK_STUDENT, isValidStudentId } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
import { syncCurrentTeachingWeek } from "@normalized:N&&&entry/src/main/ets/utils/DateUtils&";
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__studentId = new ObservedPropertySimplePU('2024316020318', this, "studentId");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__studentIdError = new ObservedPropertySimplePU('', this, "studentIdError");
        this.__passwordError = new ObservedPropertySimplePU('', this, "passwordError");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.studentId !== undefined) {
            this.studentId = params.studentId;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.studentIdError !== undefined) {
            this.studentIdError = params.studentIdError;
        }
        if (params.passwordError !== undefined) {
            this.passwordError = params.passwordError;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.toastMsg !== undefined) {
            this.toastMsg = params.toastMsg;
        }
        if (params.showToast !== undefined) {
            this.showToast = params.showToast;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__studentId.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__studentIdError.purgeDependencyOnElmtId(rmElmtId);
        this.__passwordError.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__studentId.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__studentIdError.aboutToBeDeleted();
        this.__passwordError.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 学号输入值 */
    private __studentId: ObservedPropertySimplePU<string>;
    get studentId() {
        return this.__studentId.get();
    }
    set studentId(newValue: string) {
        this.__studentId.set(newValue);
    }
    /** 密码输入值 */
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    /** 学号错误提示 */
    private __studentIdError: ObservedPropertySimplePU<string>;
    get studentIdError() {
        return this.__studentIdError.get();
    }
    set studentIdError(newValue: string) {
        this.__studentIdError.set(newValue);
    }
    /** 密码错误提示 */
    private __passwordError: ObservedPropertySimplePU<string>;
    get passwordError() {
        return this.__passwordError.get();
    }
    set passwordError(newValue: string) {
        this.__passwordError.set(newValue);
    }
    /** 登录加载状态 */
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    /** Toast 提示文字 */
    private __toastMsg: ObservedPropertySimplePU<string>;
    get toastMsg() {
        return this.__toastMsg.get();
    }
    set toastMsg(newValue: string) {
        this.__toastMsg.set(newValue);
    }
    /** 是否显示 Toast */
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
            Stack.debugLine("entry/src/main/ets/pages/LoginPage.ets(31:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/LoginPage.ets(32:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 顶部导航栏
                    TopBar(this, { title: '账号登录', showBack: false }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/LoginPage.ets", line: 34, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '账号登录',
                            showBack: false
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '账号登录', showBack: false
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录表单区域
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/LoginPage.ets(37:7)", "entry");
            // 登录表单区域
            Column.width('100%');
            // 登录表单区域
            Column.padding({ left: 28, right: 28 });
            // 登录表单区域
            Column.layoutWeight(1);
            // 登录表单区域
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Logo 区域
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/LoginPage.ets(39:9)", "entry");
            // Logo 区域
            Column.width('100%');
            // Logo 区域
            Column.alignItems(HorizontalAlign.Center);
            // Logo 区域
            Column.margin({ top: 40, bottom: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 头像图标
            Text.create('🎓');
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(41:11)", "entry");
            // 头像图标
            Text.fontSize(64);
            // 头像图标
            Text.margin({ bottom: 12 });
        }, Text);
        // 头像图标
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('教学管理系统');
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(45:11)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#0F172A');
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学生端');
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(51:11)", "entry");
            Text.fontSize(14);
            Text.fontColor('#64748B');
        }, Text);
        Text.pop();
        // Logo 区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 学号输入框
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/LoginPage.ets(60:9)", "entry");
            // 学号输入框
            Column.width('100%');
            // 学号输入框
            Column.margin({ bottom: 18 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学号');
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(61:11)", "entry");
            Text.fontSize(12);
            Text.fontWeight(600);
            Text.fontColor('#64748B');
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.studentId, placeholder: '请输入学号' });
            TextInput.debugLine("entry/src/main/ets/pages/LoginPage.ets(67:11)", "entry");
            TextInput.type(InputType.Number);
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(10);
            TextInput.borderWidth(1);
            TextInput.borderColor(this.studentIdError ? '#DC2626' : '#E2E8F0');
            TextInput.padding({ left: 16, right: 16 });
            TextInput.maxLength(15);
            TextInput.onChange((value: string) => {
                this.studentId = value;
                this.studentIdError = '';
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.studentIdError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.studentIdError);
                        Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(84:13)", "entry");
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
        // 学号输入框
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 密码输入框
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/LoginPage.ets(94:9)", "entry");
            // 密码输入框
            Column.width('100%');
            // 密码输入框
            Column.margin({ bottom: 28 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('密码');
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(95:11)", "entry");
            Text.fontSize(12);
            Text.fontWeight(600);
            Text.fontColor('#64748B');
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.password, placeholder: '请输入密码' });
            TextInput.debugLine("entry/src/main/ets/pages/LoginPage.ets(101:11)", "entry");
            TextInput.type(InputType.Password);
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.backgroundColor('#F8FAFC');
            TextInput.borderRadius(10);
            TextInput.borderWidth(1);
            TextInput.borderColor(this.passwordError ? '#DC2626' : '#E2E8F0');
            TextInput.padding({ left: 16, right: 16 });
            TextInput.maxLength(20);
            TextInput.onChange((value: string) => {
                this.password = value;
                this.passwordError = '';
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.passwordError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.passwordError);
                        Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(118:13)", "entry");
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
        // 密码输入框
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 登录按钮
                    CommonButton(this, {
                        label: this.isLoading ? '登录中...' : '登 录',
                        block: true,
                        disabled: this.isLoading,
                        loading: this.isLoading,
                        onTap: () => this.handleLogin(),
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/LoginPage.ets", line: 128, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: this.isLoading ? '登录中...' : '登 录',
                            block: true,
                            disabled: this.isLoading,
                            loading: this.isLoading,
                            onTap: () => this.handleLogin()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: this.isLoading ? '登录中...' : '登 录',
                        block: true,
                        disabled: this.isLoading,
                        loading: this.isLoading
                    });
                }
            }, { name: "CommonButton" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 忘记密码链接
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/LoginPage.ets(137:9)", "entry");
            // 忘记密码链接
            Row.width('100%');
            // 忘记密码链接
            Row.justifyContent(FlexAlign.Center);
            // 忘记密码链接
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('忘记密码？');
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(138:11)", "entry");
            Text.fontSize(13);
            Text.fontColor('#2563EB');
            Text.onClick(() => {
                router.pushUrl({ url: 'pages/ForgetPasswordPage' });
            });
        }, Text);
        Text.pop();
        // 忘记密码链接
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 测试提示
            Text.create('测试学号: 2024316020318');
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(150:9)", "entry");
            // 测试提示
            Text.fontSize(11);
            // 测试提示
            Text.fontColor('#94A3B8');
            // 测试提示
            Text.margin({ top: 20 });
        }, Text);
        // 测试提示
        Text.pop();
        // 登录表单区域
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showToast) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.toastMsg);
                        Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(165:9)", "entry");
                        Text.fontSize(13);
                        Text.fontWeight(500);
                        Text.fontColor('#FFFFFF');
                        Text.padding({ left: 18, right: 18, top: 10, bottom: 10 });
                        Text.borderRadius(999);
                        Text.backgroundColor('rgba(15, 23, 42, 0.88)');
                        Text.maxLines(2);
                        Text.textAlign(TextAlign.Center);
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
    /**
     * 登录逻辑
     * 校验学号和密码，模拟异步登录请求
     */
    private handleLogin(): void {
        // 表单校验
        let hasError: boolean = false;
        if (!this.studentId || this.studentId.trim().length === 0) {
            this.studentIdError = '请输入学号';
            hasError = true;
        }
        if (!this.password || this.password.trim().length === 0) {
            this.passwordError = '请输入密码';
            hasError = true;
        }
        if (hasError) {
            return;
        }
        // 开始登录
        this.isLoading = true;
        // 模拟异步登录请求（1秒延迟）
        setTimeout(() => {
            // 验证学号
            if (!isValidStudentId(this.studentId)) {
                this.studentIdError = '账号或密码错误';
                this.showToastOnce('账号或密码错误');
                this.isLoading = false;
                return;
            }
            // 登录成功 - 写入全局状态
            const student = MOCK_STUDENT;
            AppStorage.setOrCreate('isLoggedIn', true);
            AppStorage.setOrCreate('studentId', student.studentId);
            AppStorage.setOrCreate('studentName', student.name);
            AppStorage.setOrCreate('avatarInitial', '林');
            AppStorage.setOrCreate('currentSemester', '2025-2026 第1学期');
            syncCurrentTeachingWeek();
            this.isLoading = false;
            this.showToastOnce('登录成功');
            // 跳转主页面
            setTimeout(() => {
                router.replaceUrl({ url: 'pages/MainPage' });
            }, 300);
        }, 1000);
    }
    /**
     * 显示 Toast（仅触发一次）
     */
    private showToastOnce(msg: string): void {
        this.toastMsg = msg;
        this.showToast = true;
        setTimeout(() => {
            this.showToast = false;
            this.toastMsg = '';
        }, 2000);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/LoginPage", pageFullPath: "entry/src/main/ets/pages/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });
