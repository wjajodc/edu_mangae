if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SettingsPage_Params {
    notifEnabled?: boolean;
    darkMode?: boolean;
    showClearCache?: boolean;
    toastMsg?: string;
    showToast?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { ConfirmDialog } from "@normalized:N&&&entry/src/main/ets/components/ConfirmDialog&";
class SettingsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__notifEnabled = new ObservedPropertySimplePU(true, this, "notifEnabled");
        this.__darkMode = new ObservedPropertySimplePU(false, this, "darkMode");
        this.__showClearCache = new ObservedPropertySimplePU(false, this, "showClearCache");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SettingsPage_Params) {
        if (params.notifEnabled !== undefined) {
            this.notifEnabled = params.notifEnabled;
        }
        if (params.darkMode !== undefined) {
            this.darkMode = params.darkMode;
        }
        if (params.showClearCache !== undefined) {
            this.showClearCache = params.showClearCache;
        }
        if (params.toastMsg !== undefined) {
            this.toastMsg = params.toastMsg;
        }
        if (params.showToast !== undefined) {
            this.showToast = params.showToast;
        }
    }
    updateStateVars(params: SettingsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__notifEnabled.purgeDependencyOnElmtId(rmElmtId);
        this.__darkMode.purgeDependencyOnElmtId(rmElmtId);
        this.__showClearCache.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__notifEnabled.aboutToBeDeleted();
        this.__darkMode.aboutToBeDeleted();
        this.__showClearCache.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __notifEnabled: ObservedPropertySimplePU<boolean>;
    get notifEnabled() {
        return this.__notifEnabled.get();
    }
    set notifEnabled(newValue: boolean) {
        this.__notifEnabled.set(newValue);
    }
    private __darkMode: ObservedPropertySimplePU<boolean>;
    get darkMode() {
        return this.__darkMode.get();
    }
    set darkMode(newValue: boolean) {
        this.__darkMode.set(newValue);
    }
    private __showClearCache: ObservedPropertySimplePU<boolean>;
    get showClearCache() {
        return this.__showClearCache.get();
    }
    set showClearCache(newValue: boolean) {
        this.__showClearCache.set(newValue);
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
            Stack.debugLine("entry/src/main/ets/pages/SettingsPage.ets(20:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SettingsPage.ets(21:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '系统设置', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SettingsPage.ets", line: 22, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '系统设置',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '系统设置', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/SettingsPage.ets(24:9)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SettingsPage.ets(25:11)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 通知设置
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SettingsPage.ets(27:13)", "entry");
            // 通知设置
            Column.width('100%');
            // 通知设置
            Column.backgroundColor('#FFFFFF');
            // 通知设置
            Column.borderRadius(14);
            // 通知设置
            Column.margin({ left: 14, right: 14, top: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('通知设置');
            Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(28:15)", "entry");
            Text.fontSize(11);
            Text.fontWeight(700);
            Text.fontColor('#64748B');
            Text.padding({ left: 18, top: 16, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SettingsPage.ets(31:15)", "entry");
            Row.width('100%');
            Row.padding({ left: 18, right: 18, top: 14, bottom: 14 });
            Row.borderWidth({ top: 0.5 });
            Row.borderColor('#E2E8F0');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('消息通知');
            Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(32:17)", "entry");
            Text.fontSize(14);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: { value: this.notifEnabled, changeEvent: newValue => { this.notifEnabled = newValue; } } });
            Toggle.debugLine("entry/src/main/ets/pages/SettingsPage.ets(33:17)", "entry");
            Toggle.selectedColor('#2563EB');
            Toggle.onChange((val: boolean) => { this.notifEnabled = val; });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        // 通知设置
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 显示设置
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SettingsPage.ets(44:13)", "entry");
            // 显示设置
            Column.width('100%');
            // 显示设置
            Column.backgroundColor('#FFFFFF');
            // 显示设置
            Column.borderRadius(14);
            // 显示设置
            Column.margin({ left: 14, right: 14, top: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('显示设置');
            Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(45:15)", "entry");
            Text.fontSize(11);
            Text.fontWeight(700);
            Text.fontColor('#64748B');
            Text.padding({ left: 18, top: 16, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SettingsPage.ets(48:15)", "entry");
            Row.width('100%');
            Row.padding({ left: 18, right: 18, top: 14, bottom: 14 });
            Row.borderWidth({ bottom: 0.5 });
            Row.borderColor('#E2E8F0');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('深色模式');
            Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(49:17)", "entry");
            Text.fontSize(14);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: { value: this.darkMode, changeEvent: newValue => { this.darkMode = newValue; } } });
            Toggle.debugLine("entry/src/main/ets/pages/SettingsPage.ets(50:17)", "entry");
            Toggle.selectedColor('#2563EB');
            Toggle.onChange((val: boolean) => {
                this.darkMode = val;
                this.showToastOnce(val ? '已切换深色模式' : '已切换浅色模式');
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SettingsPage.ets(60:15)", "entry");
            Row.width('100%');
            Row.padding({ left: 18, right: 18, top: 14, bottom: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('清除缓存');
            Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(61:17)", "entry");
            Text.fontSize(14);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('128.5MB ›');
            Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(62:17)", "entry");
            Text.fontSize(12);
            Text.fontColor('#64748B');
            Text.onClick(() => { this.showClearCache = true; });
        }, Text);
        Text.pop();
        Row.pop();
        // 显示设置
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关于
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SettingsPage.ets(72:13)", "entry");
            // 关于
            Column.width('100%');
            // 关于
            Column.backgroundColor('#FFFFFF');
            // 关于
            Column.borderRadius(14);
            // 关于
            Column.margin({ left: 14, right: 14, top: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/SettingsPage.ets(73:15)", "entry");
            Row.width('100%');
            Row.padding({ left: 18, right: 18, top: 14, bottom: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关于');
            Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(74:17)", "entry");
            Text.fontSize(14);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('v1.0.0 ›');
            Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(75:17)", "entry");
            Text.fontSize(12);
            Text.fontColor('#64748B');
            Text.onClick(() => this.showToastOnce('教学管理系统学生端 v1.0.0'));
        }, Text);
        Text.pop();
        Row.pop();
        // 关于
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SettingsPage.ets(84:13)", "entry");
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
                        title: '清除缓存',
                        content: '确定清除所有缓存数据？这不会影响您的个人数据。',
                        visible: this.__showClearCache,
                        onConfirm: () => {
                            this.showToastOnce('缓存已清除');
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SettingsPage.ets", line: 91, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '清除缓存',
                            content: '确定清除所有缓存数据？这不会影响您的个人数据。',
                            visible: this.showClearCache,
                            onConfirm: () => {
                                this.showToastOnce('缓存已清除');
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '清除缓存',
                        content: '确定清除所有缓存数据？这不会影响您的个人数据。'
                    });
                }
            }, { name: "ConfirmDialog" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showToast) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.toastMsg);
                        Text.debugLine("entry/src/main/ets/pages/SettingsPage.ets(101:9)", "entry");
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
    private showToastOnce(msg: string): void {
        this.toastMsg = msg;
        this.showToast = true;
        setTimeout(() => { this.showToast = false; }, 2000);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SettingsPage";
    }
}
registerNamedRoute(() => new SettingsPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/SettingsPage", pageFullPath: "entry/src/main/ets/pages/SettingsPage", integratedHsp: "false", moduleType: "followWithHap" });
