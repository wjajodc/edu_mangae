if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StatusPage_Params {
    activeTab?: number;
    statusData?: StudentStatus;
    isLoading?: boolean;
    tabs?: string[];
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import { MOCK_STATUS, STATUS_FIELDS, MOCK_STUDENT } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
import type { StudentStatus } from '../model/CommonModel';
class StatusPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__activeTab = new ObservedPropertySimplePU(0, this, "activeTab");
        this.__statusData = new ObservedPropertyObjectPU(MOCK_STATUS, this, "statusData");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.tabs = ['学籍信息', '资料修改', '联系信息'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StatusPage_Params) {
        if (params.activeTab !== undefined) {
            this.activeTab = params.activeTab;
        }
        if (params.statusData !== undefined) {
            this.statusData = params.statusData;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.tabs !== undefined) {
            this.tabs = params.tabs;
        }
    }
    updateStateVars(params: StatusPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__activeTab.purgeDependencyOnElmtId(rmElmtId);
        this.__statusData.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__activeTab.aboutToBeDeleted();
        this.__statusData.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __activeTab: ObservedPropertySimplePU<number>;
    get activeTab() {
        return this.__activeTab.get();
    }
    set activeTab(newValue: number) {
        this.__activeTab.set(newValue);
    }
    private __statusData: ObservedPropertyObjectPU<StudentStatus>;
    get statusData() {
        return this.__statusData.get();
    }
    set statusData(newValue: StudentStatus) {
        this.__statusData.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private tabs: string[];
    aboutToAppear(): void {
        this.loadData();
    }
    private async loadData(): Promise<void> {
        this.isLoading = true;
        await new Promise<void>((r) => setTimeout(r, 300));
        this.statusData = MOCK_STATUS;
        this.isLoading = false;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StatusPage.ets(33:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '学籍信息', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/StatusPage.ets", line: 34, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '学籍信息',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '学籍信息', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LoadingPlaceholder(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/StatusPage.ets", line: 37, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "LoadingPlaceholder" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Tab 切换
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/StatusPage.ets(40:9)", "entry");
                        // Tab 切换
                        Row.width('100%');
                        // Tab 切换
                        Row.backgroundColor('#FFFFFF');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, idx: number) => {
                            const tab = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(tab);
                                Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(42:13)", "entry");
                                Text.fontSize(14);
                                Text.fontWeight(this.activeTab === idx ? 700 : 400);
                                Text.fontColor(this.activeTab === idx ? '#2563EB' : '#64748B');
                                Text.layoutWeight(1);
                                Text.textAlign(TextAlign.Center);
                                Text.padding({ top: 12, bottom: 12 });
                                Text.borderWidth({ bottom: this.activeTab === idx ? 2 : 0 });
                                Text.borderColor('#2563EB');
                                Text.onClick(() => { this.activeTab = idx; });
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.tabs, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    // Tab 切换
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 内容区域
                        if (this.activeTab === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.buildStatusInfo.bind(this)();
                            });
                        }
                        else if (this.activeTab === 1) {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.buildDocumentChange.bind(this)();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(2, () => {
                                this.buildContactInfo.bind(this)();
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    /**
     * 学籍信息 Tab
     * 只读展示所有学籍字段，DL 网格布局
     */
    buildStatusInfo(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/StatusPage.ets(76:5)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StatusPage.ets(77:7)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StatusPage.ets(78:9)", "entry");
            Column.width('100%');
            Column.padding({ left: 16, right: 16 });
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ top: 14, left: 14, right: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx: number) => {
                const field = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/StatusPage.ets(80:13)", "entry");
                    Row.width('100%');
                    Row.padding({ top: 12, bottom: 12 });
                    Row.borderWidth({ bottom: idx < STATUS_FIELDS.length - 1 ? 0.5 : 0 });
                    Row.borderColor('#E2E8F0');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(field);
                    Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(81:15)", "entry");
                    Text.fontSize(13);
                    Text.fontColor('#64748B');
                    Text.width(80);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.getFieldValue(field));
                    Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(83:15)", "entry");
                    Text.fontSize(13);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#0F172A');
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, STATUS_FIELDS, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StatusPage.ets(99:9)", "entry");
            Column.height(24);
        }, Column);
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    /**
     * 资料申请修改 Tab（占位）
     */
    buildDocumentChange(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StatusPage.ets(111:5)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('资料申请修改');
            Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(112:7)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('资料修改功能开发中，如需修改学籍资料，请联系教务处。');
            Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(114:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.textAlign(TextAlign.Center);
            Text.padding({ left: 24, right: 24 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    /**
     * 联系信息 Tab（占位）
     */
    buildContactInfo(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/StatusPage.ets(127:5)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StatusPage.ets(128:7)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StatusPage.ets(129:9)", "entry");
            Column.width('100%');
            Column.padding({ left: 16, right: 16 });
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ top: 14, left: 14, right: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/StatusPage.ets(130:11)", "entry");
            Row.width('100%');
            Row.padding({ top: 14, bottom: 14 });
            Row.borderWidth({ bottom: 0.5 });
            Row.borderColor('#E2E8F0');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('手机号');
            Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(131:13)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(MOCK_STUDENT.phone);
            Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(132:13)", "entry");
            Text.fontSize(13);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/StatusPage.ets(135:11)", "entry");
            Row.width('100%');
            Row.padding({ top: 14, bottom: 14 });
            Row.borderWidth({ bottom: 0.5 });
            Row.borderColor('#E2E8F0');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('邮箱');
            Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(136:13)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(MOCK_STUDENT.email);
            Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(137:13)", "entry");
            Text.fontSize(13);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/StatusPage.ets(140:11)", "entry");
            Row.width('100%');
            Row.padding({ top: 14, bottom: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('通讯地址');
            Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(141:13)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(MOCK_STUDENT.address);
            Text.debugLine("entry/src/main/ets/pages/StatusPage.ets(142:13)", "entry");
            Text.fontSize(13);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StatusPage.ets(149:9)", "entry");
            Column.height(24);
        }, Column);
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    /** 根据字段名获取对应的值 */
    private getFieldValue(field: string): string {
        if (field === '学号') {
            return this.statusData.studentId;
        }
        if (field === '姓名') {
            return this.statusData.name;
        }
        if (field === '性别') {
            return this.statusData.gender;
        }
        if (field === '院系') {
            return this.statusData.department;
        }
        if (field === '专业') {
            return this.statusData.major;
        }
        if (field === '班级') {
            return this.statusData.className;
        }
        if (field === '学籍状态') {
            return this.statusData.status;
        }
        if (field === '入校时间') {
            return this.statusData.enrollmentDate;
        }
        if (field === '预计毕业时间') {
            return this.statusData.expectedGraduation;
        }
        if (field === '培养层次') {
            return this.statusData.educationLevel;
        }
        if (field === '学制') {
            return this.statusData.schoolSystem;
        }
        return '—';
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "StatusPage";
    }
}
registerNamedRoute(() => new StatusPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/StatusPage", pageFullPath: "entry/src/main/ets/pages/StatusPage", integratedHsp: "false", moduleType: "followWithHap" });
