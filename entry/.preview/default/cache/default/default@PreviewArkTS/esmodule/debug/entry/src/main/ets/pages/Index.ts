if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentIndex?: number;
    controller?: TabsController;
}
import { NoteList } from "@normalized:N&&&entry/src/main/ets/view/NoteList&";
import { TodoList } from "@normalized:N&&&entry/src/main/ets/view/TodoList&";
import { DataManager } from "@normalized:N&&&entry/src/main/ets/model/DataManager&";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.controller = new TabsController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private controller: TabsController;
    aboutToAppear() {
        DataManager.getInstance();
    }
    TabBuilder(title: string, targetIndex: number, selectedImg: Resource, normalImg: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(16:5)", "entry");
            Column.width('100%');
            Column.height(50);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.currentIndex = targetIndex;
                this.controller.changeIndex(this.currentIndex);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.currentIndex === targetIndex ? selectedImg : normalImg);
            Image.debugLine("entry/src/main/ets/pages/Index.ets(17:7)", "entry");
            Image.size({ width: 24, height: 24 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(19:7)", "entry");
            Text.fontColor(this.currentIndex === targetIndex ? '#000000' : '#999999');
            Text.fontSize(10);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
            Tabs.debugLine("entry/src/main/ets/pages/Index.ets(34:5)", "entry");
            Tabs.onChange((index: number) => {
                this.currentIndex = index;
            });
            Tabs.barWidth('100%');
            Tabs.barHeight(60);
            Tabs.backgroundColor(Color.White);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new NoteList(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 36, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "NoteList" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, '笔记', 0, { "id": 16777229, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" }, { "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(35:7)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TodoList(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 41, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "TodoList" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, '待办', 1, { "id": 16777230, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" }, { "id": 16777230, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(40:7)", "entry");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
