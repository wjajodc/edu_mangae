if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TodayCourseItemCard_Params {
    course?: TodayCourseItem;
    isLast?: boolean;
}
interface QuickEntry_Params {
    label?: string;
    icon?: string;
    onTap?: () => void;
}
interface HomePage_Params {
    studentName?: string;
    todayCourses?: TodayCourseItem[];
    isLoading?: boolean;
    currentWeek?: number;
    currentSemester?: string;
    carouselIndex?: number;
    banners?: BannerItem[];
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import type { TodayCourseItem } from '../model/CourseModel';
import { ScheduleStore } from "@normalized:N&&&entry/src/main/ets/utils/ScheduleStore&";
import { syncCurrentTeachingWeek } from "@normalized:N&&&entry/src/main/ets/utils/DateUtils&";
interface BannerItem {
    id: string;
    src: Resource;
}
export class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__studentName = this.createStorageLink('studentName', '同学', "studentName");
        this.__todayCourses = new ObservedPropertyObjectPU([], this, "todayCourses");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__currentWeek = this.createStorageLink('currentWeek', 1, "currentWeek");
        this.__currentSemester = this.createStorageLink('currentSemester', '', "currentSemester");
        this.__carouselIndex = new ObservedPropertySimplePU(0, this, "carouselIndex");
        this.banners = [
            { id: 'selection', src: { "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" } },
            { id: 'calendar', src: { "id": 16777238, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" } },
            { id: 'exam', src: { "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" } },
            { id: 'internship', src: { "id": 16777239, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" } },
        ];
        this.setInitiallyProvidedValue(params);
        this.declareWatch("currentWeek", this.onWeekChanged);
        this.declareWatch("currentSemester", this.onSemesterChanged);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.todayCourses !== undefined) {
            this.todayCourses = params.todayCourses;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.carouselIndex !== undefined) {
            this.carouselIndex = params.carouselIndex;
        }
        if (params.banners !== undefined) {
            this.banners = params.banners;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__studentName.purgeDependencyOnElmtId(rmElmtId);
        this.__todayCourses.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWeek.purgeDependencyOnElmtId(rmElmtId);
        this.__currentSemester.purgeDependencyOnElmtId(rmElmtId);
        this.__carouselIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__studentName.aboutToBeDeleted();
        this.__todayCourses.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__currentWeek.aboutToBeDeleted();
        this.__currentSemester.aboutToBeDeleted();
        this.__carouselIndex.aboutToBeDeleted();
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
    private __todayCourses: ObservedPropertyObjectPU<TodayCourseItem[]>;
    get todayCourses() {
        return this.__todayCourses.get();
    }
    set todayCourses(newValue: TodayCourseItem[]) {
        this.__todayCourses.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __currentWeek: ObservedPropertyAbstractPU<number>;
    get currentWeek() {
        return this.__currentWeek.get();
    }
    set currentWeek(newValue: number) {
        this.__currentWeek.set(newValue);
    }
    private __currentSemester: ObservedPropertyAbstractPU<string>;
    get currentSemester() {
        return this.__currentSemester.get();
    }
    set currentSemester(newValue: string) {
        this.__currentSemester.set(newValue);
    }
    private __carouselIndex: ObservedPropertySimplePU<number>;
    get carouselIndex() {
        return this.__carouselIndex.get();
    }
    set carouselIndex(newValue: number) {
        this.__carouselIndex.set(newValue);
    }
    private readonly banners: BannerItem[];
    aboutToAppear(): void {
        this.loadData();
    }
    onSemesterChanged(): void {
        ScheduleStore.syncTodayCourses();
        this.todayCourses = ScheduleStore.getTodayCourses(false);
    }
    onWeekChanged(): void {
        this.todayCourses = ScheduleStore.getTodayCourses(false);
    }
    /** 跳转到底部课表 Tab 并定位到当前教学周 */
    private openCurrentWeekSchedule(): void {
        syncCurrentTeachingWeek();
        AppStorage.setOrCreate('mainTabIndex', 1);
        const token = AppStorage.get<number>('scheduleTabToken') ?? 0;
        AppStorage.setOrCreate('scheduleTabToken', token + 1);
    }
    private async loadData(): Promise<void> {
        this.isLoading = true;
        await new Promise<void>((r) => setTimeout(r, 300));
        syncCurrentTeachingWeek();
        ScheduleStore.syncTodayCourses();
        this.todayCourses = ScheduleStore.getTodayCourses(false);
        this.isLoading = false;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(64:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '教学管理系统', showBack: false }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 65, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '教学管理系统',
                            showBack: false
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '教学管理系统', showBack: false
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
                                let componentCall = new LoadingPlaceholder(this, { message: '加载中...' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 68, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        message: '加载中...'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    message: '加载中...'
                                });
                            }
                        }, { name: "LoadingPlaceholder" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/HomePage.ets(70:9)", "entry");
                        Scroll.width('100%');
                        Scroll.layoutWeight(1);
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/HomePage.ets(71:11)", "entry");
                        Column.width('100%');
                    }, Column);
                    this.buildBannerCarousel.bind(this)();
                    this.buildQuickGrid.bind(this)();
                    this.buildTodayCourse.bind(this)();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/HomePage.ets(75:13)", "entry");
                        Column.height(24);
                    }, Column);
                    Column.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    buildBannerCarousel(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(91:5)", "entry");
            Column.width('100%');
            Column.padding({ left: 14, right: 14, top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.debugLine("entry/src/main/ets/pages/HomePage.ets(92:7)", "entry");
            Swiper.width('100%');
            Swiper.height(168);
            Swiper.autoPlay(true);
            Swiper.interval(4000);
            Swiper.loop(true);
            Swiper.duration(500);
            Swiper.curve(Curve.Linear);
            Swiper.indicator(new DotIndicator()
                .itemWidth(6)
                .itemHeight(6)
                .selectedItemWidth(14)
                .selectedItemHeight(6)
                .color('rgba(255, 255, 255, 0.45)')
                .selectedColor('#FFFFFF'));
            Swiper.onChange((index: number) => {
                this.carouselIndex = index;
            });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.src);
                    Image.debugLine("entry/src/main/ets/pages/HomePage.ets(94:11)", "entry");
                    Image.width('100%');
                    Image.height(168);
                    Image.objectFit(ImageFit.Cover);
                    Image.borderRadius(12);
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, this.banners, forEachItemGenFunction, (item: BannerItem) => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
        Column.pop();
    }
    buildQuickGrid(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(127:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(128:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 14, top: 20, bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('快捷入口');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(129:9)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#0F172A');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(137:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 10, right: 10 });
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new QuickEntry(this, { label: '我的课表', icon: '📅', onTap: () => {
                            this.openCurrentWeekSchedule();
                        } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 138, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '我的课表',
                            icon: '📅',
                            onTap: () => {
                                this.openCurrentWeekSchedule();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '我的课表', icon: '📅'
                    });
                }
            }, { name: "QuickEntry" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new QuickEntry(this, { label: '我的成绩', icon: '📊', onTap: () => {
                            router.pushUrl({ url: 'pages/GradesPage' });
                        } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 142, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '我的成绩',
                            icon: '📊',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/GradesPage' });
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '我的成绩', icon: '📊'
                    });
                }
            }, { name: "QuickEntry" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new QuickEntry(this, { label: '选课', icon: '📋', onTap: () => {
                            router.pushUrl({ url: 'pages/SelectionPage' });
                        } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 146, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '选课',
                            icon: '📋',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/SelectionPage' });
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '选课', icon: '📋'
                    });
                }
            }, { name: "QuickEntry" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new QuickEntry(this, { label: '量化评教', icon: '📝', onTap: () => {
                            router.pushUrl({ url: 'pages/EvalPage' });
                        } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 150, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            label: '量化评教',
                            icon: '📝',
                            onTap: () => {
                                router.pushUrl({ url: 'pages/EvalPage' });
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        label: '量化评教', icon: '📝'
                    });
                }
            }, { name: "QuickEntry" });
        }
        Row.pop();
        Column.pop();
    }
    buildTodayCourse(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(162:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(163:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 14, right: 14, top: 16, bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日课程');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(164:9)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#0F172A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/HomePage.ets(169:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('查看全部 ›');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(171:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#2563EB');
            Text.onClick(() => {
                router.pushUrl({ url: 'pages/TodayCoursePage' });
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.todayCourses.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildTodayCourseEmpty.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/HomePage.ets(184:9)", "entry");
                        Column.width('100%');
                        Column.padding({ left: 14, right: 14 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, idx: number) => {
                            const course = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new TodayCourseItemCard(this, { course: course, isLast: idx === this.todayCourses.length - 1 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 186, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                course: course,
                                                isLast: idx === this.todayCourses.length - 1
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            course: course, isLast: idx === this.todayCourses.length - 1
                                        });
                                    }
                                }, { name: "TodayCourseItemCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.todayCourses, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    buildTodayCourseEmpty(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(197:5)", "entry");
            Column.width('100%');
            Column.padding({ top: 24, bottom: 24 });
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.backgroundColor('#F8FAFC');
            Column.borderRadius(12);
            Column.margin({ left: 14, right: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📭');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(198:7)", "entry");
            Text.fontSize(32);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今天没有课程安排');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(201:7)", "entry");
            Text.fontSize(13);
            Text.fontColor('#64748B');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class QuickEntry extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__label = new SynchedPropertySimpleOneWayPU(params.label, this, "label");
        this.__icon = new SynchedPropertySimpleOneWayPU(params.icon, this, "icon");
        this.onTap = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QuickEntry_Params) {
        if (params.label === undefined) {
            this.__label.set('入口');
        }
        if (params.icon === undefined) {
            this.__icon.set('📌');
        }
        if (params.onTap !== undefined) {
            this.onTap = params.onTap;
        }
    }
    updateStateVars(params: QuickEntry_Params) {
        this.__label.reset(params.label);
        this.__icon.reset(params.icon);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__label.purgeDependencyOnElmtId(rmElmtId);
        this.__icon.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__label.aboutToBeDeleted();
        this.__icon.aboutToBeDeleted();
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
    private __icon: SynchedPropertySimpleOneWayPU<string>;
    get icon() {
        return this.__icon.get();
    }
    set icon(newValue: string) {
        this.__icon.set(newValue);
    }
    private onTap?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(222:5)", "entry");
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                if (this.onTap) {
                    this.onTap();
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(223:7)", "entry");
            Column.width(56);
            Column.height(56);
            Column.borderRadius(14);
            Column.backgroundColor('#FFFFFF');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.margin({ bottom: 8 });
            Column.shadow({ radius: 6, color: 'rgba(15, 23, 42, 0.04)', offsetX: 0, offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.icon);
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(224:9)", "entry");
            Text.fontSize(28);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.label);
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(236:7)", "entry");
            Text.fontSize(12);
            Text.fontWeight(500);
            Text.fontColor('#0F172A');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class TodayCourseItemCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__course = new SynchedPropertyObjectOneWayPU(params.course, this, "course");
        this.__isLast = new SynchedPropertySimpleOneWayPU(params.isLast, this, "isLast");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TodayCourseItemCard_Params) {
        if (params.isLast === undefined) {
            this.__isLast.set(false);
        }
    }
    updateStateVars(params: TodayCourseItemCard_Params) {
        this.__course.reset(params.course);
        this.__isLast.reset(params.isLast);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__course.purgeDependencyOnElmtId(rmElmtId);
        this.__isLast.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__course.aboutToBeDeleted();
        this.__isLast.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __course: SynchedPropertySimpleOneWayPU<TodayCourseItem>;
    get course() {
        return this.__course.get();
    }
    set course(newValue: TodayCourseItem) {
        this.__course.set(newValue);
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
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(256:5)", "entry");
            Row.width('100%');
            Row.padding(14);
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
            Row.margin({ bottom: this.isLast ? 0 : 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(257:7)", "entry");
            Column.width(28);
            Column.height(48);
            Column.borderRadius(8);
            Column.backgroundColor(this.getPeriodColor(this.course.startPeriod));
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(String(this.course.startPeriod));
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(258:9)", "entry");
            Text.fontSize(11);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(270:7)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.course.courseName);
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(271:9)", "entry");
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.course.periodLabel} · ${this.course.classroom}`);
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(277:9)", "entry");
            Text.fontSize(12);
            Text.fontColor('#64748B');
            Text.maxLines(1);
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    private getPeriodColor(period: number): string {
        if (period <= 4) {
            return '#2563EB';
        }
        if (period <= 8) {
            return '#EA580C';
        }
        return '#6366F1';
    }
    rerender() {
        this.updateDirtyElements();
    }
}
