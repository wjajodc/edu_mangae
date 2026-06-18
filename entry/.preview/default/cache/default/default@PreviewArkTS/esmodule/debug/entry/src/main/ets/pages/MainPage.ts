if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    activeIndex?: number;
    scheduleTabToken?: number;
}
import { TabBar } from "@normalized:N&&&entry/src/main/ets/components/TabBar&";
import { HomePage } from "@normalized:N&&&entry/src/main/ets/pages/HomePage&";
import { SchedulePage } from "@normalized:N&&&entry/src/main/ets/pages/SchedulePage&";
import { GradesPage } from "@normalized:N&&&entry/src/main/ets/pages/GradesPage&";
import { MinePage } from "@normalized:N&&&entry/src/main/ets/pages/MinePage&";
import { Colors } from "@normalized:N&&&entry/src/main/ets/utils/StyleConstants&";
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__activeIndex = this.createStorageLink('mainTabIndex', 0, "activeIndex");
        this.__scheduleTabToken = this.createStorageLink('scheduleTabToken', 0, "scheduleTabToken");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__activeIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__scheduleTabToken.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__activeIndex.aboutToBeDeleted();
        this.__scheduleTabToken.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __activeIndex: ObservedPropertyAbstractPU<number>;
    get activeIndex() {
        return this.__activeIndex.get();
    }
    set activeIndex(newValue: number) {
        this.__activeIndex.set(newValue);
    }
    private __scheduleTabToken: ObservedPropertyAbstractPU<number>;
    get scheduleTabToken() {
        return this.__scheduleTabToken.get();
    }
    set scheduleTabToken(newValue: number) {
        this.__scheduleTabToken.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MainPage.ets(19:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(Colors.BG);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/MainPage.ets(20:7)", "entry");
            Stack.layoutWeight(1);
            Stack.width('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('100%');
            __Common__.height('100%');
            __Common__.visibility(this.activeIndex === 0 ? Visibility.Visible : Visibility.Hidden);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 21, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HomePage" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('100%');
            __Common__.height('100%');
            __Common__.visibility(this.activeIndex === 1 ? Visibility.Visible : Visibility.Hidden);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SchedulePage(this, { embedded: true, tabToken: this.scheduleTabToken }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 26, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            embedded: true,
                            tabToken: this.scheduleTabToken
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        embedded: true, tabToken: this.scheduleTabToken
                    });
                }
            }, { name: "SchedulePage" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('100%');
            __Common__.height('100%');
            __Common__.visibility(this.activeIndex === 2 ? Visibility.Visible : Visibility.Hidden);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new GradesPage(this, { embedded: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 31, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            embedded: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        embedded: true
                    });
                }
            }, { name: "GradesPage" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('100%');
            __Common__.height('100%');
            __Common__.visibility(this.activeIndex === 3 ? Visibility.Visible : Visibility.Hidden);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MinePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 36, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MinePage" });
        }
        __Common__.pop();
        Stack.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TabBar(this, { activeIndex: this.__activeIndex }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 44, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            activeIndex: this.activeIndex
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TabBar" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
