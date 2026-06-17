if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabBar_Params {
    activeIndex?: number;
    /** Tab 切换回调 */
    onTabChange?: (index: number) => void;
    tabItems?: TabItem[];
}
export class TabBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__activeIndex = new SynchedPropertySimpleTwoWayPU(params.activeIndex, this, "activeIndex");
        this.onTabChange = undefined;
        this.tabItems = [
            { index: 0, label: '首页', icon: 'home' },
            { index: 1, label: '课表', icon: 'schedule' },
            { index: 2, label: '成绩', icon: 'grades' },
            { index: 3, label: '我的', icon: 'user' },
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBar_Params) {
        if (params.onTabChange !== undefined) {
            this.onTabChange = params.onTabChange;
        }
        if (params.tabItems !== undefined) {
            this.tabItems = params.tabItems;
        }
    }
    updateStateVars(params: TabBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__activeIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__activeIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 当前激活的 Tab 索引 */
    private __activeIndex: SynchedPropertySimpleTwoWayPU<number>;
    get activeIndex() {
        return this.__activeIndex.get();
    }
    set activeIndex(newValue: number) {
        this.__activeIndex.set(newValue);
    }
    /** Tab 切换回调 */
    private onTabChange?: (index: number) => void;
    /** Tab 配置数据 */
    private tabItems: TabItem[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/components/TabBar.ets(22:5)", "entry");
            Row.width('100%');
            Row.padding({ left: 6, right: 6, bottom: 12 });
            Row.backgroundColor('rgba(255, 255, 255, 0.96)');
            Row.backdropBlur(12);
            Row.borderWidth({ top: 1 });
            Row.borderColor('#E2E8F0');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/components/TabBar.ets(24:9)", "entry");
                    Column.layoutWeight(1);
                    Column.padding({ top: 8, bottom: 4 });
                    Column.borderRadius(10);
                    Column.backgroundColor(this.activeIndex === item.index ? '#E8EFFF' : Color.Transparent);
                    Column.onClick(() => {
                        this.activeIndex = item.index;
                        if (this.onTabChange) {
                            this.onTabChange(item.index);
                        }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 图标区域
                    Column.create();
                    Column.debugLine("entry/src/main/ets/components/TabBar.ets(26:11)", "entry");
                    // 图标区域
                    Column.width(22);
                    // 图标区域
                    Column.height(22);
                    // 图标区域
                    Column.justifyContent(FlexAlign.Center);
                    // 图标区域
                    Column.alignItems(HorizontalAlign.Center);
                    // 图标区域
                    Column.margin({ bottom: 2 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 用文字模拟图标（鸿蒙端无SVG sprite，用Unicode/文字代替）
                    Text.create(this.getTabIcon(item.icon));
                    Text.debugLine("entry/src/main/ets/components/TabBar.ets(28:13)", "entry");
                    // 用文字模拟图标（鸿蒙端无SVG sprite，用Unicode/文字代替）
                    Text.fontSize(20);
                    // 用文字模拟图标（鸿蒙端无SVG sprite，用Unicode/文字代替）
                    Text.fontWeight(FontWeight.Medium);
                    // 用文字模拟图标（鸿蒙端无SVG sprite，用Unicode/文字代替）
                    Text.fontColor(this.activeIndex === item.index ? '#2563EB' : '#64748B');
                }, Text);
                // 用文字模拟图标（鸿蒙端无SVG sprite，用Unicode/文字代替）
                Text.pop();
                // 图标区域
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 标签文字
                    Text.create(item.label);
                    Text.debugLine("entry/src/main/ets/components/TabBar.ets(40:11)", "entry");
                    // 标签文字
                    Text.fontSize(11);
                    // 标签文字
                    Text.fontWeight(600);
                    // 标签文字
                    Text.fontColor(this.activeIndex === item.index ? '#2563EB' : '#64748B');
                }, Text);
                // 标签文字
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabItems, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    /** 获取 Tab 图标文字 */
    private getTabIcon(icon: string): string {
        const icons: Record<string, string> = {
            'home': '🏠',
            'schedule': '📅',
            'grades': '📊',
            'user': '👤',
        };
        return icons[icon] || '●';
    }
    rerender() {
        this.updateDirtyElements();
    }
}
/** Tab 配置项接口 */
interface TabItem {
    index: number;
    label: string;
    icon: string;
}
