if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DetailRow_Params {
    label?: string;
    value?: string;
}
interface AssignmentCard_Params {
    item?: AssignmentItem;
    onTap?: () => void;
}
interface AssignmentsPage_Params {
    assignments?: AssignmentItem[];
    isLoading?: boolean;
    activeFilter?: string;
    showDetail?: boolean;
    detailItem?: AssignmentItem | null;
    submitContent?: string;
    fileList?: string[];
    isSubmitting?: boolean;
    toastMsg?: string;
    showToast?: boolean;
    filters?: string[];
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import { EmptyPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/EmptyPlaceholder&";
import { CommonButton } from "@normalized:N&&&entry/src/main/ets/components/CommonButton&";
import { MOCK_ASSIGNMENTS } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
import type { AssignmentItem } from '../model/CommonModel';
class AssignmentsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__assignments = new ObservedPropertyObjectPU([], this, "assignments");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__activeFilter = new ObservedPropertySimplePU('全部', this, "activeFilter");
        this.__showDetail = new ObservedPropertySimplePU(false, this, "showDetail");
        this.__detailItem = new ObservedPropertyObjectPU(null, this, "detailItem");
        this.__submitContent = new ObservedPropertySimplePU('', this, "submitContent");
        this.__fileList = new ObservedPropertyObjectPU([], this, "fileList");
        this.__isSubmitting = new ObservedPropertySimplePU(false, this, "isSubmitting");
        this.__toastMsg = new ObservedPropertySimplePU('', this, "toastMsg");
        this.__showToast = new ObservedPropertySimplePU(false, this, "showToast");
        this.filters = ['全部', '未提交', '已提交', '已批改'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AssignmentsPage_Params) {
        if (params.assignments !== undefined) {
            this.assignments = params.assignments;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.activeFilter !== undefined) {
            this.activeFilter = params.activeFilter;
        }
        if (params.showDetail !== undefined) {
            this.showDetail = params.showDetail;
        }
        if (params.detailItem !== undefined) {
            this.detailItem = params.detailItem;
        }
        if (params.submitContent !== undefined) {
            this.submitContent = params.submitContent;
        }
        if (params.fileList !== undefined) {
            this.fileList = params.fileList;
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
        if (params.filters !== undefined) {
            this.filters = params.filters;
        }
    }
    updateStateVars(params: AssignmentsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__assignments.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__activeFilter.purgeDependencyOnElmtId(rmElmtId);
        this.__showDetail.purgeDependencyOnElmtId(rmElmtId);
        this.__detailItem.purgeDependencyOnElmtId(rmElmtId);
        this.__submitContent.purgeDependencyOnElmtId(rmElmtId);
        this.__fileList.purgeDependencyOnElmtId(rmElmtId);
        this.__isSubmitting.purgeDependencyOnElmtId(rmElmtId);
        this.__toastMsg.purgeDependencyOnElmtId(rmElmtId);
        this.__showToast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__assignments.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__activeFilter.aboutToBeDeleted();
        this.__showDetail.aboutToBeDeleted();
        this.__detailItem.aboutToBeDeleted();
        this.__submitContent.aboutToBeDeleted();
        this.__fileList.aboutToBeDeleted();
        this.__isSubmitting.aboutToBeDeleted();
        this.__toastMsg.aboutToBeDeleted();
        this.__showToast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __assignments: ObservedPropertyObjectPU<AssignmentItem[]>;
    get assignments() {
        return this.__assignments.get();
    }
    set assignments(newValue: AssignmentItem[]) {
        this.__assignments.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __activeFilter: ObservedPropertySimplePU<string>;
    get activeFilter() {
        return this.__activeFilter.get();
    }
    set activeFilter(newValue: string) {
        this.__activeFilter.set(newValue);
    }
    private __showDetail: ObservedPropertySimplePU<boolean>;
    get showDetail() {
        return this.__showDetail.get();
    }
    set showDetail(newValue: boolean) {
        this.__showDetail.set(newValue);
    }
    private __detailItem: ObservedPropertyObjectPU<AssignmentItem | null>;
    get detailItem() {
        return this.__detailItem.get();
    }
    set detailItem(newValue: AssignmentItem | null) {
        this.__detailItem.set(newValue);
    }
    private __submitContent: ObservedPropertySimplePU<string>;
    get submitContent() {
        return this.__submitContent.get();
    }
    set submitContent(newValue: string) {
        this.__submitContent.set(newValue);
    }
    private __fileList: ObservedPropertyObjectPU<string[]>;
    get fileList() {
        return this.__fileList.get();
    }
    set fileList(newValue: string[]) {
        this.__fileList.set(newValue);
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
    private filters: string[];
    aboutToAppear(): void {
        this.loadData();
    }
    private async loadData(): Promise<void> {
        this.isLoading = true;
        await new Promise<void>((r) => setTimeout(r, 400));
        this.assignments = MOCK_ASSIGNMENTS.slice();
        this.isLoading = false;
    }
    /** 过滤作业列表 */
    private getFilteredList(): AssignmentItem[] {
        if (this.activeFilter === '全部')
            return this.assignments;
        return this.assignments.filter(a => a.status === this.activeFilter);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(48:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(49:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '作业/实验', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 50, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '作业/实验',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '作业/实验', showBack: true
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
                                let componentCall = new LoadingPlaceholder(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 53, col: 11 });
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
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(55:11)", "entry");
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 状态筛选
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(57:13)", "entry");
                        // 状态筛选
                        Scroll.scrollable(ScrollDirection.Horizontal);
                        // 状态筛选
                        Scroll.scrollBar(BarState.Off);
                        // 状态筛选
                        Scroll.width('100%');
                        // 状态筛选
                        Scroll.padding({ left: 14, top: 12, bottom: 8 });
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(58:15)", "entry");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const f = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(f);
                                Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(60:19)", "entry");
                                Text.fontSize(12);
                                Text.fontWeight(600);
                                Text.fontColor(this.activeFilter === f ? '#FFFFFF' : '#2563EB');
                                Text.backgroundColor(this.activeFilter === f ? '#2563EB' : '#FFFFFF');
                                Text.borderRadius(8);
                                Text.borderWidth(1);
                                Text.borderColor('#2563EB');
                                Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                                Text.margin({ right: 8 });
                                Text.onClick(() => { this.activeFilter = f; });
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.filters, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                    // 状态筛选
                    Scroll.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 作业列表
                        if (this.getFilteredList().length === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new EmptyPlaceholder(this, { message: '暂无作业', iconText: '📝' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 81, col: 15 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    message: '暂无作业',
                                                    iconText: '📝'
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                message: '暂无作业', iconText: '📝'
                                            });
                                        }
                                    }, { name: "EmptyPlaceholder" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Scroll.create();
                                    Scroll.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(83:15)", "entry");
                                    Scroll.width('100%');
                                    Scroll.layoutWeight(1);
                                    Scroll.scrollBar(BarState.Off);
                                }, Scroll);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(84:17)", "entry");
                                    Column.width('100%');
                                    Column.padding({ left: 14, right: 14 });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const item = _item;
                                        {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                if (isInitialRender) {
                                                    let componentCall = new AssignmentCard(this, {
                                                        item: item,
                                                        onTap: () => {
                                                            this.detailItem = item;
                                                            this.showDetail = true;
                                                        }
                                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 86, col: 21 });
                                                    ViewPU.create(componentCall);
                                                    let paramsLambda = () => {
                                                        return {
                                                            item: item,
                                                            onTap: () => {
                                                                this.detailItem = item;
                                                                this.showDetail = true;
                                                            }
                                                        };
                                                    };
                                                    componentCall.paramsGenerator_ = paramsLambda;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                                        item: item
                                                    });
                                                }
                                            }, { name: "AssignmentCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(elmtId, this.getFilteredList(), forEachItemGenFunction);
                                }, ForEach);
                                ForEach.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(94:19)", "entry");
                                    Column.height(16);
                                }, Column);
                                Column.pop();
                                Column.pop();
                                Scroll.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 作业详情 + 提交弹窗
            if (this.showDetail && this.detailItem) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildDetailSheet.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showToast) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.toastMsg);
                        Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(117:9)", "entry");
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
    buildDetailSheet(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(128:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.position({ x: 0, y: 0 });
            Column.zIndex(50);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(129:7)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.backgroundColor('rgba(15, 23, 42, 0.45)');
            Column.onClick(() => { this.showDetail = false; });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(135:7)", "entry");
            Column.width('100%');
            Column.padding(24);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius({ topLeft: 18, topRight: 18 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(136:9)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('作业详情');
            Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(137:11)", "entry");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(140:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✕');
            Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(141:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#64748B');
            Text.onClick(() => { this.showDetail = false; });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.detailItem) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(150:11)", "entry");
                        Column.width('100%');
                        Column.margin({ bottom: 16 });
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '作业标题', value: this.detailItem.title }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 151, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '作业标题',
                                        value: this.detailItem.title
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '作业标题', value: this.detailItem.title
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '课程', value: this.detailItem.courseName }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 152, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '课程',
                                        value: this.detailItem.courseName
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '课程', value: this.detailItem.courseName
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '截止时间', value: this.detailItem.deadline }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 153, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '截止时间',
                                        value: this.detailItem.deadline
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '截止时间', value: this.detailItem.deadline
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DetailRow(this, { label: '状态', value: this.detailItem.status }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 154, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '状态',
                                        value: this.detailItem.status
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '状态', value: this.detailItem.status
                                });
                            }
                        }, { name: "DetailRow" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.detailItem.score !== undefined && this.detailItem.score !== null) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new DetailRow(this, { label: '得分', value: String(this.detailItem.score) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 156, col: 15 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    label: '得分',
                                                    value: String(this.detailItem.score)
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                label: '得分', value: String(this.detailItem.score)
                                            });
                                        }
                                    }, { name: "DetailRow" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 提交区域（未提交/已提交未批改可重新提交）
                        if (this.detailItem.status === '未提交' || this.detailItem.status === '已提交') {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('提交内容');
                                    Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(164:13)", "entry");
                                    Text.fontSize(13);
                                    Text.fontWeight(600);
                                    Text.fontColor('#0F172A');
                                    Text.width('100%');
                                    Text.margin({ bottom: 6 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    TextArea.create({ placeholder: '输入作业内容或说明...', text: this.submitContent });
                                    TextArea.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(165:13)", "entry");
                                    TextArea.width('100%');
                                    TextArea.height(100);
                                    TextArea.fontSize(13);
                                    TextArea.backgroundColor('#F8FAFC');
                                    TextArea.borderRadius(8);
                                    TextArea.padding(10);
                                    TextArea.onChange((val: string) => { this.submitContent = val; });
                                }, TextArea);
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new CommonButton(this, {
                                                label: this.isSubmitting ? '提交中...' : '提交作业',
                                                block: true, marginTop: 16,
                                                disabled: this.isSubmitting, loading: this.isSubmitting,
                                                onTap: () => this.handleSubmitAssignment()
                                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AssignmentsPage.ets", line: 170, col: 13 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    label: this.isSubmitting ? '提交中...' : '提交作业',
                                                    block: true,
                                                    marginTop: 16,
                                                    disabled: this.isSubmitting,
                                                    loading: this.isSubmitting,
                                                    onTap: () => this.handleSubmitAssignment()
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                label: this.isSubmitting ? '提交中...' : '提交作业',
                                                block: true, marginTop: 16,
                                                disabled: this.isSubmitting, loading: this.isSubmitting
                                            });
                                        }
                                    }, { name: "CommonButton" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
    }
    private handleSubmitAssignment(): void {
        if (!this.submitContent.trim()) {
            this.showToastOnce('请输入提交内容');
            return;
        }
        this.isSubmitting = true;
        setTimeout(() => {
            this.isSubmitting = false;
            if (this.detailItem) {
                this.detailItem.status = '已提交';
            }
            this.showToastOnce('作业提交成功');
            this.showDetail = false;
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
        return "AssignmentsPage";
    }
}
class AssignmentCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__item = new SynchedPropertyObjectOneWayPU(params.item, this, "item");
        this.onTap = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AssignmentCard_Params) {
        if (params.onTap !== undefined) {
            this.onTap = params.onTap;
        }
    }
    updateStateVars(params: AssignmentCard_Params) {
        this.__item.reset(params.item);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__item.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__item.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __item: SynchedPropertySimpleOneWayPU<AssignmentItem>;
    get item() {
        return this.__item.get();
    }
    set item(newValue: AssignmentItem) {
        this.__item.set(newValue);
    }
    private onTap?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(218:5)", "entry");
            Column.width('100%');
            Column.padding(14);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 10 });
            Column.onClick(() => { if (this.onTap)
                this.onTap(); });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(219:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(220:9)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.title);
            Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(221:11)", "entry");
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.item.courseName} · 截止 ${this.item.deadline}`);
            Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(223:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#64748B');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 状态标签
            Text.create(this.item.status);
            Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(229:9)", "entry");
            // 状态标签
            Text.fontSize(11);
            // 状态标签
            Text.fontWeight(600);
            // 状态标签
            Text.fontColor(this.getStatusColor());
            // 状态标签
            Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
            // 状态标签
            Text.borderRadius(6);
            // 状态标签
            Text.backgroundColor(this.getStatusBg());
        }, Text);
        // 状态标签
        Text.pop();
        Row.pop();
        Column.pop();
    }
    private getStatusColor(): string {
        if (this.item.status === '未提交')
            return '#DC2626';
        if (this.item.status === '已提交')
            return '#2563EB';
        return '#166534';
    }
    private getStatusBg(): string {
        if (this.item.status === '未提交')
            return '#FEF2F2';
        if (this.item.status === '已提交')
            return '#EFF6FF';
        return '#DCFCE7';
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class DetailRow extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__label = new SynchedPropertySimpleOneWayPU(params.label, this, "label");
        this.__value = new SynchedPropertySimpleOneWayPU(params.value, this, "value");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DetailRow_Params) {
        if (params.label === undefined) {
            this.__label.set('');
        }
        if (params.value === undefined) {
            this.__value.set('');
        }
    }
    updateStateVars(params: DetailRow_Params) {
        this.__label.reset(params.label);
        this.__value.reset(params.value);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__label.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__label.aboutToBeDeleted();
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
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(262:5)", "entry");
            Row.width('100%');
            Row.padding({ top: 10, bottom: 10 });
            Row.borderWidth({ bottom: 0.5 });
            Row.borderColor('#E2E8F0');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.label);
            Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(263:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.value);
            Text.debugLine("entry/src/main/ets/pages/AssignmentsPage.ets(264:7)", "entry");
            Text.fontSize(13);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new AssignmentsPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/AssignmentsPage", pageFullPath: "entry/src/main/ets/pages/AssignmentsPage", integratedHsp: "false", moduleType: "followWithHap" });
