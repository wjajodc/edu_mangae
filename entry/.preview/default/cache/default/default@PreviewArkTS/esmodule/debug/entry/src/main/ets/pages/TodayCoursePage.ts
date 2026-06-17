if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TodayCoursePage_Params {
    dayTabIndex?: number;
    courses?: TodayCourseItem[];
    isLoading?: boolean;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import { EmptyPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/EmptyPlaceholder&";
import type { TodayCourseItem } from '../model/CourseModel';
import { ScheduleStore } from "@normalized:N&&&entry/src/main/ets/utils/ScheduleStore&";
class TodayCoursePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__dayTabIndex = new ObservedPropertySimplePU(0, this, "dayTabIndex");
        this.__courses = new ObservedPropertyObjectPU([], this, "courses");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TodayCoursePage_Params) {
        if (params.dayTabIndex !== undefined) {
            this.dayTabIndex = params.dayTabIndex;
        }
        if (params.courses !== undefined) {
            this.courses = params.courses;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
    }
    updateStateVars(params: TodayCoursePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__dayTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__courses.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__dayTabIndex.aboutToBeDeleted();
        this.__courses.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __dayTabIndex: ObservedPropertySimplePU<number>; // 0=今天, 1=明天
    get dayTabIndex() {
        return this.__dayTabIndex.get();
    }
    set dayTabIndex(newValue: number) {
        this.__dayTabIndex.set(newValue);
    }
    private __courses: ObservedPropertyObjectPU<TodayCourseItem[]>;
    get courses() {
        return this.__courses.get();
    }
    set courses(newValue: TodayCourseItem[]) {
        this.__courses.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    aboutToAppear(): void {
        this.loadCourses();
    }
    private async loadCourses(): Promise<void> {
        this.isLoading = true;
        await new Promise<void>((r) => setTimeout(r, 400));
        this.courses = ScheduleStore.getTodayCourses(this.dayTabIndex === 1);
        this.isLoading = false;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(31:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '今日课程', showBack: true, onBack: () => router.back() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/TodayCoursePage.ets", line: 32, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '今日课程',
                            showBack: true,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '今日课程', showBack: true
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 今天/明天切换
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(35:7)", "entry");
            // 今天/明天切换
            Row.width('100%');
            // 今天/明天切换
            Row.padding({ left: 14, top: 12, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今天');
            Text.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(36:9)", "entry");
            Text.fontSize(14);
            Text.fontWeight(this.dayTabIndex === 0 ? 700 : 500);
            Text.fontColor(this.dayTabIndex === 0 ? '#FFFFFF' : '#64748B');
            Text.backgroundColor(this.dayTabIndex === 0 ? '#2563EB' : '#F1F5F9');
            Text.borderRadius(8);
            Text.padding({ left: 20, right: 20, top: 8, bottom: 8 });
            Text.margin({ right: 10 });
            Text.onClick(() => { this.dayTabIndex = 0; this.loadCourses(); });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('明天');
            Text.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(45:9)", "entry");
            Text.fontSize(14);
            Text.fontWeight(this.dayTabIndex === 1 ? 700 : 500);
            Text.fontColor(this.dayTabIndex === 1 ? '#FFFFFF' : '#64748B');
            Text.backgroundColor(this.dayTabIndex === 1 ? '#2563EB' : '#F1F5F9');
            Text.borderRadius(8);
            Text.padding({ left: 20, right: 20, top: 8, bottom: 8 });
            Text.onClick(() => { this.dayTabIndex = 1; this.loadCourses(); });
        }, Text);
        Text.pop();
        // 今天/明天切换
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LoadingPlaceholder(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/TodayCoursePage.ets", line: 56, col: 9 });
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
            else if (this.courses.length === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new EmptyPlaceholder(this, { message: '今天没有课程安排', subMessage: '好好休息一下吧~', iconText: '📭' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/TodayCoursePage.ets", line: 58, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        message: '今天没有课程安排',
                                        subMessage: '好好休息一下吧~',
                                        iconText: '📭'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    message: '今天没有课程安排', subMessage: '好好休息一下吧~', iconText: '📭'
                                });
                            }
                        }, { name: "EmptyPlaceholder" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(60:9)", "entry");
                        Scroll.width('100%');
                        Scroll.layoutWeight(1);
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(61:11)", "entry");
                        Column.width('100%');
                        Column.padding({ left: 14, right: 14 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const course = _item;
                            this.buildCourseCard.bind(this)(course);
                        };
                        this.forEachUpdateFunction(elmtId, this.courses, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(65:13)", "entry");
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
    }
    buildCourseCard(course: TodayCourseItem, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(75:5)", "entry");
            Column.width('100%');
            Column.padding(14);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(76:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 时间色块
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(78:9)", "entry");
            // 时间色块
            Column.width(56);
            // 时间色块
            Column.height(56);
            // 时间色块
            Column.borderRadius(10);
            // 时间色块
            Column.backgroundColor(this.getPeriodColor(course.startPeriod));
            // 时间色块
            Column.justifyContent(FlexAlign.Center);
            // 时间色块
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`第${course.startPeriod}节`);
            Text.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(79:11)", "entry");
            Text.fontSize(11);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        // 时间色块
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 课程信息
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(87:9)", "entry");
            // 课程信息
            Column.alignItems(HorizontalAlign.Start);
            // 课程信息
            Column.layoutWeight(1);
            // 课程信息
            Column.margin({ left: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(course.courseName);
            Text.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(88:11)", "entry");
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`教师：${course.teacher}`);
            Text.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(90:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#64748B');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${course.periodLabel} · ${course.classroom}`);
            Text.debugLine("entry/src/main/ets/pages/TodayCoursePage.ets(92:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#94A3B8');
            Text.margin({ top: 1 });
        }, Text);
        Text.pop();
        // 课程信息
        Column.pop();
        Row.pop();
        Column.pop();
    }
    private getPeriodColor(period: number): string {
        if (period <= 4)
            return '#2563EB';
        if (period <= 8)
            return '#EA580C';
        return '#6366F1';
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TodayCoursePage";
    }
}
registerNamedRoute(() => new TodayCoursePage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/TodayCoursePage", pageFullPath: "entry/src/main/ets/pages/TodayCoursePage", integratedHsp: "false", moduleType: "followWithHap" });
