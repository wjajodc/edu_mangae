if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineMenuRow_Params {
    title?: string;
    icon?: string;
    iconBg?: string;
    showDivider?: boolean;
    onTap?: () => void;
}
interface MinePage_Params {
    studentName?: string;
    studentId?: string;
    showLogoutConfirm?: boolean;
}
import router from "@ohos:router";
import { ConfirmDialog } from "@normalized:N&&&entry/src/main/ets/components/ConfirmDialog&";
import { MOCK_STUDENT } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
interface MineMenuItem {
    title: string;
    icon: string;
    iconBg: string;
    onTap: () => void;
}
export class MinePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__studentName = this.createStorageLink('studentName', '同学', "studentName");
        this.__studentId = this.createStorageLink('studentId', '', "studentId");
        this.__showLogoutConfirm = new ObservedPropertySimplePU(false, this, "showLogoutConfirm");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MinePage_Params) {
        if (params.showLogoutConfirm !== undefined) {
            this.showLogoutConfirm = params.showLogoutConfirm;
        }
    }
    updateStateVars(params: MinePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__studentName.purgeDependencyOnElmtId(rmElmtId);
        this.__studentId.purgeDependencyOnElmtId(rmElmtId);
        this.__showLogoutConfirm.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__studentName.aboutToBeDeleted();
        this.__studentId.aboutToBeDeleted();
        this.__showLogoutConfirm.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __studentName: ObservedPropertyAbstractPU<string>;
    get studentName() {
        return this.__studentName.get();
    }
    set studentName(newValue: string) {
        this.__studentName.set(newValue);
    }
    private __studentId: ObservedPropertyAbstractPU<string>;
    get studentId() {
        return this.__studentId.get();
    }
    set studentId(newValue: string) {
        this.__studentId.set(newValue);
    }
    private __showLogoutConfirm: ObservedPropertySimplePU<boolean>;
    get showLogoutConfirm() {
        return this.__showLogoutConfirm.get();
    }
    set showLogoutConfirm(newValue: boolean) {
        this.__showLogoutConfirm.set(newValue);
    }
    aboutToAppear(): void {
        if (!this.studentId || this.studentId.length === 0) {
            const storedId = AppStorage.get<string>('studentId');
            if (storedId) {
                this.studentId = storedId;
            }
            else {
                this.studentId = MOCK_STUDENT.studentId;
            }
        }
    }
    private getAvatarInitial(): string {
        if (this.studentName && this.studentName.length > 0) {
            return this.studentName.substring(0, 1);
        }
        return MOCK_STUDENT.avatarInitial || '学';
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/MinePage.ets(41:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(42:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F2F2F2');
        }, Column);
        this.buildHeader.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/MinePage.ets(45:9)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(46:11)", "entry");
            Column.width('100%');
        }, Column);
        this.buildProfileRow.bind(this)();
        this.buildMenuGroup.bind(this)([
            {
                title: '个人信息',
                icon: '👤',
                iconBg: '#E3F2FD',
                onTap: () => { router.pushUrl({ url: 'pages/ProfileEditPage' }); },
            },
            {
                title: '修改密码',
                icon: '🔒',
                iconBg: '#FFF3E0',
                onTap: () => { router.pushUrl({ url: 'pages/PasswordEditPage' }); },
            },
        ]);
        this.buildMenuGroup.bind(this)([
            {
                title: '学籍信息',
                icon: '📄',
                iconBg: '#E8F5E9',
                onTap: () => { router.pushUrl({ url: 'pages/StatusPage' }); },
            },
            {
                title: '我的课表',
                icon: '📅',
                iconBg: '#FFEBEE',
                onTap: () => { router.pushUrl({ url: 'pages/SchedulePage' }); },
            },
            {
                title: '系统设置',
                icon: '⚙️',
                iconBg: '#F5F5F5',
                onTap: () => { router.pushUrl({ url: 'pages/SettingsPage' }); },
            },
            {
                title: '意见反馈',
                icon: '💬',
                iconBg: '#E0F7FA',
                onTap: () => { router.pushUrl({ url: 'pages/FeedbackPage' }); },
            },
        ]);
        this.buildMenuGroup.bind(this)([
            {
                title: '退出登录',
                icon: '🚪',
                iconBg: '#FFEBEE',
                onTap: () => { this.showLogoutConfirm = true; },
            },
        ]);
        this.buildFooter.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(97:13)", "entry");
            Column.height(24);
        }, Column);
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ConfirmDialog(this, {
                        title: '退出登录',
                        content: '确定要退出登录吗？退出后需要重新输入学号和密码。',
                        confirmText: '退出',
                        cancelText: '取消',
                        visible: this.__showLogoutConfirm,
                        onConfirm: () => this.handleLogout(),
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 109, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '退出登录',
                            content: '确定要退出登录吗？退出后需要重新输入学号和密码。',
                            confirmText: '退出',
                            cancelText: '取消',
                            visible: this.showLogoutConfirm,
                            onConfirm: () => this.handleLogout()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '退出登录',
                        content: '确定要退出登录吗？退出后需要重新输入学号和密码。',
                        confirmText: '退出',
                        cancelText: '取消'
                    });
                }
            }, { name: "ConfirmDialog" });
        }
        Stack.pop();
    }
    buildHeader(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MinePage.ets(122:5)", "entry");
            Row.width('100%');
            Row.height(48);
            Row.padding({ left: 8, right: 8 });
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MinePage.ets(123:7)", "entry");
            Row.width(40);
            Row.height(40);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的');
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(124:7)", "entry");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#1A1A1A');
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⊞');
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(130:7)", "entry");
            Text.fontSize(18);
            Text.fontColor('#BBBBBB');
            Text.width(40);
            Text.height(40);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildProfileRow(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MinePage.ets(145:5)", "entry");
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 18, bottom: 18 });
            Row.backgroundColor('#FFFFFF');
            Row.margin({ top: 10 });
            Row.onClick(() => {
                router.pushUrl({ url: 'pages/ProfileEditPage' });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(146:7)", "entry");
            Column.width(52);
            Column.height(52);
            Column.borderRadius(26);
            Column.backgroundColor('#4A90E2');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getAvatarInitial());
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(147:9)", "entry");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.studentName || '同学');
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(159:7)", "entry");
            Text.fontSize(16);
            Text.fontColor('#1A1A1A');
            Text.layoutWeight(1);
            Text.margin({ left: 14 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(165:7)", "entry");
            Text.fontSize(20);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildMenuGroup(items: MineMenuItem[], parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(180:5)", "entry");
            Column.width('100%');
            Column.backgroundColor('#FFFFFF');
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new MineMenuRow(this, {
                                title: item.title,
                                icon: item.icon,
                                iconBg: item.iconBg,
                                showDivider: index < items.length - 1,
                                onTap: item.onTap,
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 182, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: item.title,
                                    icon: item.icon,
                                    iconBg: item.iconBg,
                                    showDivider: index < items.length - 1,
                                    onTap: item.onTap
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                title: item.title,
                                icon: item.icon,
                                iconBg: item.iconBg,
                                showDivider: index < items.length - 1
                            });
                        }
                    }, { name: "MineMenuRow" });
                }
            };
            this.forEachUpdateFunction(elmtId, items, forEachItemGenFunction, (item: MineMenuItem, index: number) => `${item.title}_${index}`, true, true);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    buildFooter(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(198:5)", "entry");
            Column.width('100%');
            Column.padding({ top: 20, bottom: 8 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('教学管理系统 · 学生端');
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(199:7)", "entry");
            Text.fontSize(11);
            Text.fontColor('#BBBBBB');
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`学号 ${this.studentId || '—'}`);
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(203:7)", "entry");
            Text.fontSize(11);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        Column.pop();
    }
    private handleLogout(): void {
        AppStorage.setOrCreate('isLoggedIn', false);
        AppStorage.setOrCreate('studentId', '');
        AppStorage.setOrCreate('studentName', '');
        router.replaceUrl({ url: 'pages/LoginPage' });
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class MineMenuRow extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.__icon = new SynchedPropertySimpleOneWayPU(params.icon, this, "icon");
        this.__iconBg = new SynchedPropertySimpleOneWayPU(params.iconBg, this, "iconBg");
        this.__showDivider = new SynchedPropertySimpleOneWayPU(params.showDivider, this, "showDivider");
        this.onTap = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineMenuRow_Params) {
        if (params.title === undefined) {
            this.__title.set('');
        }
        if (params.icon === undefined) {
            this.__icon.set('');
        }
        if (params.iconBg === undefined) {
            this.__iconBg.set('#F5F5F5');
        }
        if (params.showDivider === undefined) {
            this.__showDivider.set(true);
        }
        if (params.onTap !== undefined) {
            this.onTap = params.onTap;
        }
    }
    updateStateVars(params: MineMenuRow_Params) {
        this.__title.reset(params.title);
        this.__icon.reset(params.icon);
        this.__iconBg.reset(params.iconBg);
        this.__showDivider.reset(params.showDivider);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__icon.purgeDependencyOnElmtId(rmElmtId);
        this.__iconBg.purgeDependencyOnElmtId(rmElmtId);
        this.__showDivider.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__icon.aboutToBeDeleted();
        this.__iconBg.aboutToBeDeleted();
        this.__showDivider.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __icon: SynchedPropertySimpleOneWayPU<string>;
    get icon() {
        return this.__icon.get();
    }
    set icon(newValue: string) {
        this.__icon.set(newValue);
    }
    private __iconBg: SynchedPropertySimpleOneWayPU<string>;
    get iconBg() {
        return this.__iconBg.get();
    }
    set iconBg(newValue: string) {
        this.__iconBg.set(newValue);
    }
    private __showDivider: SynchedPropertySimpleOneWayPU<boolean>;
    get showDivider() {
        return this.__showDivider.get();
    }
    set showDivider(newValue: boolean) {
        this.__showDivider.set(newValue);
    }
    private onTap?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(229:5)", "entry");
            Column.width('100%');
            Column.onClick(() => {
                if (this.onTap) {
                    this.onTap();
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MinePage.ets(230:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 14, bottom: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(231:9)", "entry");
            Column.width(32);
            Column.height(32);
            Column.borderRadius(8);
            Column.backgroundColor(this.iconBg);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.icon);
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(232:11)", "entry");
            Text.fontSize(18);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(242:9)", "entry");
            Text.fontSize(15);
            Text.fontColor(this.title === '退出登录' ? '#E53935' : '#1A1A1A');
            Text.layoutWeight(1);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(248:9)", "entry");
            Text.fontSize(20);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDivider) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/MinePage.ets(256:9)", "entry");
                        Row.width('100%');
                        Row.height(0.5);
                        Row.backgroundColor('#F0F0F0');
                        Row.margin({ left: 60 });
                    }, Row);
                    Row.pop();
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
