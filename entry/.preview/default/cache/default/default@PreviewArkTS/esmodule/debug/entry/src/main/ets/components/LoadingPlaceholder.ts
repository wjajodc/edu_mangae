if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoadMoreIndicator_Params {
    hasMore?: boolean;
    loadingText?: string;
    noMoreText?: string;
}
interface LoadingPlaceholder_Params {
    message?: string;
    fullScreen?: boolean;
}
export class LoadingPlaceholder extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new SynchedPropertySimpleOneWayPU(params.message, this, "message");
        this.__fullScreen = new SynchedPropertySimpleOneWayPU(params.fullScreen, this, "fullScreen");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoadingPlaceholder_Params) {
        if (params.message === undefined) {
            this.__message.set('加载中...');
        }
        if (params.fullScreen === undefined) {
            this.__fullScreen.set(true);
        }
    }
    updateStateVars(params: LoadingPlaceholder_Params) {
        this.__message.reset(params.message);
        this.__fullScreen.reset(params.fullScreen);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__fullScreen.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__fullScreen.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 提示文字 */
    private __message: SynchedPropertySimpleOneWayPU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    /** 是否全屏居中 */
    private __fullScreen: SynchedPropertySimpleOneWayPU<boolean>;
    get fullScreen() {
        return this.__fullScreen.get();
    }
    set fullScreen(newValue: boolean) {
        this.__fullScreen.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/components/LoadingPlaceholder.ets(13:5)", "entry");
            Column.width('100%');
            Column.height(this.fullScreen ? '60%' : 'auto');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.padding({ top: this.fullScreen ? 60 : 24, bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 旋转动画指示器
            LoadingProgress.create();
            LoadingProgress.debugLine("entry/src/main/ets/components/LoadingPlaceholder.ets(15:7)", "entry");
            // 旋转动画指示器
            LoadingProgress.width(36);
            // 旋转动画指示器
            LoadingProgress.height(36);
            // 旋转动画指示器
            LoadingProgress.color('#2563EB');
        }, LoadingProgress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.debugLine("entry/src/main/ets/components/LoadingPlaceholder.ets(20:7)", "entry");
            Text.fontSize(14);
            Text.fontColor('#64748B');
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class LoadMoreIndicator extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__hasMore = new SynchedPropertySimpleOneWayPU(params.hasMore, this, "hasMore");
        this.__loadingText = new SynchedPropertySimpleOneWayPU(params.loadingText, this, "loadingText");
        this.__noMoreText = new SynchedPropertySimpleOneWayPU(params.noMoreText, this, "noMoreText");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoadMoreIndicator_Params) {
        if (params.hasMore === undefined) {
            this.__hasMore.set(true);
        }
        if (params.loadingText === undefined) {
            this.__loadingText.set('加载中...');
        }
        if (params.noMoreText === undefined) {
            this.__noMoreText.set('— 没有更多了 —');
        }
    }
    updateStateVars(params: LoadMoreIndicator_Params) {
        this.__hasMore.reset(params.hasMore);
        this.__loadingText.reset(params.loadingText);
        this.__noMoreText.reset(params.noMoreText);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__hasMore.purgeDependencyOnElmtId(rmElmtId);
        this.__loadingText.purgeDependencyOnElmtId(rmElmtId);
        this.__noMoreText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__hasMore.aboutToBeDeleted();
        this.__loadingText.aboutToBeDeleted();
        this.__noMoreText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __hasMore: SynchedPropertySimpleOneWayPU<boolean>;
    get hasMore() {
        return this.__hasMore.get();
    }
    set hasMore(newValue: boolean) {
        this.__hasMore.set(newValue);
    }
    private __loadingText: SynchedPropertySimpleOneWayPU<string>;
    get loadingText() {
        return this.__loadingText.get();
    }
    set loadingText(newValue: string) {
        this.__loadingText.set(newValue);
    }
    private __noMoreText: SynchedPropertySimpleOneWayPU<string>;
    get noMoreText() {
        return this.__noMoreText.get();
    }
    set noMoreText(newValue: string) {
        this.__noMoreText.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/components/LoadingPlaceholder.ets(43:5)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.padding({ top: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.hasMore) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/components/LoadingPlaceholder.ets(45:9)", "entry");
                        LoadingProgress.width(16);
                        LoadingProgress.height(16);
                        LoadingProgress.color('#2563EB');
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.loadingText);
                        Text.debugLine("entry/src/main/ets/components/LoadingPlaceholder.ets(49:9)", "entry");
                        Text.fontSize(12);
                        Text.fontColor('#64748B');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.noMoreText);
                        Text.debugLine("entry/src/main/ets/components/LoadingPlaceholder.ets(54:9)", "entry");
                        Text.fontSize(12);
                        Text.fontColor('#94A3B8');
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
