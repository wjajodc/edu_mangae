if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SubScoreItem_Params {
    label?: string;
    score?: number | null;
}
interface GradeCard_Params {
    grade?: GradeRecord;
    onTap?: () => void;
}
interface GradesPage_Params {
    embedded?: boolean;
    currentSemester?: string;
    grades?: GradeRecord[];
    isLoading?: boolean;
    showSubScore?: boolean;
    selectedGrade?: GradeRecord | null;
}
import router from "@ohos:router";
import { TopBar } from "@normalized:N&&&entry/src/main/ets/components/TopBar&";
import { LoadingPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/LoadingPlaceholder&";
import { EmptyPlaceholder } from "@normalized:N&&&entry/src/main/ets/components/EmptyPlaceholder&";
import { MOCK_GRADES_CURRENT, MOCK_GRADES_HISTORY, MOCK_GRADES_UNPUBLISHED, SEMESTER_OPTIONS } from "@normalized:N&&&entry/src/main/ets/mock/MockData&";
import type { GradeRecord, SemesterSummary } from '../model/GradeModel';
export class GradesPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__embedded = new SynchedPropertySimpleOneWayPU(params.embedded, this, "embedded");
        this.__currentSemester = new ObservedPropertySimplePU('2025-2026 第1学期', this, "currentSemester");
        this.__grades = new ObservedPropertyObjectPU([], this, "grades");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__showSubScore = new ObservedPropertySimplePU(false, this, "showSubScore");
        this.__selectedGrade = new ObservedPropertyObjectPU(null, this, "selectedGrade");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GradesPage_Params) {
        if (params.embedded === undefined) {
            this.__embedded.set(false);
        }
        if (params.currentSemester !== undefined) {
            this.currentSemester = params.currentSemester;
        }
        if (params.grades !== undefined) {
            this.grades = params.grades;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.showSubScore !== undefined) {
            this.showSubScore = params.showSubScore;
        }
        if (params.selectedGrade !== undefined) {
            this.selectedGrade = params.selectedGrade;
        }
    }
    updateStateVars(params: GradesPage_Params) {
        this.__embedded.reset(params.embedded);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__embedded.purgeDependencyOnElmtId(rmElmtId);
        this.__currentSemester.purgeDependencyOnElmtId(rmElmtId);
        this.__grades.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__showSubScore.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedGrade.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__embedded.aboutToBeDeleted();
        this.__currentSemester.aboutToBeDeleted();
        this.__grades.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__showSubScore.aboutToBeDeleted();
        this.__selectedGrade.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 是否作为 Tab 嵌入主框架（嵌入时隐藏返回按钮） */
    private __embedded: SynchedPropertySimpleOneWayPU<boolean>;
    get embedded() {
        return this.__embedded.get();
    }
    set embedded(newValue: boolean) {
        this.__embedded.set(newValue);
    }
    private __currentSemester: ObservedPropertySimplePU<string>;
    get currentSemester() {
        return this.__currentSemester.get();
    }
    set currentSemester(newValue: string) {
        this.__currentSemester.set(newValue);
    }
    private __grades: ObservedPropertyObjectPU<GradeRecord[]>;
    get grades() {
        return this.__grades.get();
    }
    set grades(newValue: GradeRecord[]) {
        this.__grades.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __showSubScore: ObservedPropertySimplePU<boolean>;
    get showSubScore() {
        return this.__showSubScore.get();
    }
    set showSubScore(newValue: boolean) {
        this.__showSubScore.set(newValue);
    }
    private __selectedGrade: ObservedPropertyObjectPU<GradeRecord | null>;
    get selectedGrade() {
        return this.__selectedGrade.get();
    }
    set selectedGrade(newValue: GradeRecord | null) {
        this.__selectedGrade.set(newValue);
    }
    aboutToAppear(): void {
        this.loadGrades();
    }
    private async loadGrades(): Promise<void> {
        this.isLoading = true;
        await new Promise<void>((r) => setTimeout(r, 500));
        // 根据学期加载数据
        if (this.currentSemester === '2025-2026 第1学期') {
            this.grades = MOCK_GRADES_CURRENT;
        }
        else if (this.currentSemester === '2024-2025 第2学期') {
            this.grades = MOCK_GRADES_HISTORY;
        }
        else if (this.currentSemester === '2025-2026 第2学期') {
            this.grades = MOCK_GRADES_UNPUBLISHED;
        }
        else {
            this.grades = [];
        }
        this.isLoading = false;
    }
    /** 计算学期汇总 */
    private getSummary(): SemesterSummary {
        const emptySummary: SemesterSummary = { totalCredit: 0, avgGpa: 0 };
        if (!this.grades || this.grades.length === 0) {
            return emptySummary;
        }
        const published = this.grades.filter((g: GradeRecord) => g.isPublished);
        if (published.length === 0) {
            return emptySummary;
        }
        const totalCredit = published.reduce((sum: number, g: GradeRecord) => sum + (g.credit || 0), 0);
        const totalGpa = published.reduce((sum: number, g: GradeRecord) => sum + (g.gpa || 0) * (g.credit || 0), 0);
        const avgGpa = totalCredit > 0 ? parseFloat((totalGpa / totalCredit).toFixed(2)) : 0;
        const summary: SemesterSummary = { totalCredit: totalCredit, avgGpa: avgGpa };
        return summary;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/GradesPage.ets(62:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(63:7)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#EEF2F8');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, {
                        title: '成绩查询',
                        showBack: !this.embedded,
                        onBack: () => router.back()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GradesPage.ets", line: 64, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '成绩查询',
                            showBack: !this.embedded,
                            onBack: () => router.back()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '成绩查询',
                        showBack: !this.embedded
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
                                let componentCall = new LoadingPlaceholder(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GradesPage.ets", line: 71, col: 11 });
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
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/GradesPage.ets(73:11)", "entry");
                        Scroll.width('100%');
                        Scroll.layoutWeight(1);
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(74:13)", "entry");
                        Column.width('100%');
                    }, Column);
                    // 学期选择器
                    this.buildSemesterSelector.bind(this)();
                    // 汇总统计
                    this.buildSummary.bind(this)();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 成绩列表
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(82:15)", "entry");
                        // 成绩列表
                        Column.width('100%');
                        // 成绩列表
                        Column.padding({ left: 14, right: 14 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.grades.length === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new EmptyPlaceholder(this, {
                                                message: '暂未发布',
                                                subMessage: '当前学期暂无已发布的成绩',
                                                iconText: '📊'
                                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GradesPage.ets", line: 84, col: 19 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    message: '暂未发布',
                                                    subMessage: '当前学期暂无已发布的成绩',
                                                    iconText: '📊'
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                message: '暂未发布',
                                                subMessage: '当前学期暂无已发布的成绩',
                                                iconText: '📊'
                                            });
                                        }
                                    }, { name: "EmptyPlaceholder" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const grade = _item;
                                        {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                if (isInitialRender) {
                                                    let componentCall = new GradeCard(this, {
                                                        grade: grade,
                                                        onTap: () => {
                                                            if (grade.isPublished && grade.subScores) {
                                                                this.selectedGrade = grade;
                                                                this.showSubScore = true;
                                                            }
                                                        }
                                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GradesPage.ets", line: 91, col: 21 });
                                                    ViewPU.create(componentCall);
                                                    let paramsLambda = () => {
                                                        return {
                                                            grade: grade,
                                                            onTap: () => {
                                                                if (grade.isPublished && grade.subScores) {
                                                                    this.selectedGrade = grade;
                                                                    this.showSubScore = true;
                                                                }
                                                            }
                                                        };
                                                    };
                                                    componentCall.paramsGenerator_ = paramsLambda;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                                        grade: grade
                                                    });
                                                }
                                            }, { name: "GradeCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(elmtId, this.grades, forEachItemGenFunction);
                                }, ForEach);
                                ForEach.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    // 成绩列表
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(106:15)", "entry");
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 分项成绩弹窗
            if (this.showSubScore && this.selectedGrade) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildSubScoreSheet.bind(this)();
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
    buildSemesterSelector(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GradesPage.ets(128:5)", "entry");
            Row.width('100%');
            Row.padding({ left: 14, top: 12, bottom: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/GradesPage.ets(129:7)", "entry");
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GradesPage.ets(130:9)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const sem = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(sem);
                    Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(132:13)", "entry");
                    Text.fontSize(12);
                    Text.fontWeight(600);
                    Text.fontColor(this.currentSemester === sem ? '#FFFFFF' : '#2563EB');
                    Text.backgroundColor(this.currentSemester === sem ? '#2563EB' : '#FFFFFF');
                    Text.borderRadius(8);
                    Text.borderWidth(1);
                    Text.borderColor('#2563EB');
                    Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                    Text.margin({ right: 8 });
                    Text.onClick(() => {
                        this.currentSemester = sem;
                        this.loadGrades();
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, SEMESTER_OPTIONS, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        Row.pop();
    }
    buildSummary(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GradesPage.ets(158:5)", "entry");
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
            Row.margin({ left: 14, right: 14, top: 8, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(159:7)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总学分');
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(160:9)", "entry");
            Text.fontSize(11);
            Text.fontColor('#64748B');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(String(this.getSummary().totalCredit));
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(163:9)", "entry");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2563EB');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(172:7)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('平均绩点');
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(173:9)", "entry");
            Text.fontSize(11);
            Text.fontColor('#64748B');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(String(this.getSummary().avgGpa));
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(176:9)", "entry");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#EA580C');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    buildSubScoreSheet(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(194:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.position({ x: 0, y: 0 });
            Column.zIndex(50);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(195:7)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.backgroundColor('rgba(15, 23, 42, 0.45)');
            Column.onClick(() => { this.showSubScore = false; });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(201:7)", "entry");
            Column.width('100%');
            Column.padding(24);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius({ topLeft: 18, topRight: 18 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GradesPage.ets(202:9)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('分项成绩');
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(203:11)", "entry");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GradesPage.ets(206:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✕');
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(207:11)", "entry");
            Text.fontSize(18);
            Text.fontColor('#64748B');
            Text.onClick(() => { this.showSubScore = false; });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedGrade) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectedGrade.courseName);
                        Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(214:11)", "entry");
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Medium);
                        Text.margin({ bottom: 16 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/GradesPage.ets(217:11)", "entry");
                        Row.width('100%');
                        Row.justifyContent(FlexAlign.SpaceAround);
                        Row.margin({ bottom: 12 });
                    }, Row);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SubScoreItem(this, { label: '平时成绩', score: this.selectedGrade.subScores?.regular ?? null }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GradesPage.ets", line: 218, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '平时成绩',
                                        score: this.selectedGrade.subScores?.regular ?? null
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '平时成绩', score: this.selectedGrade.subScores?.regular ?? null
                                });
                            }
                        }, { name: "SubScoreItem" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SubScoreItem(this, { label: '期中考试', score: this.selectedGrade.subScores?.midterm ?? null }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GradesPage.ets", line: 219, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '期中考试',
                                        score: this.selectedGrade.subScores?.midterm ?? null
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '期中考试', score: this.selectedGrade.subScores?.midterm ?? null
                                });
                            }
                        }, { name: "SubScoreItem" });
                    }
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/GradesPage.ets(222:11)", "entry");
                        Row.width('100%');
                        Row.justifyContent(FlexAlign.SpaceAround);
                    }, Row);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SubScoreItem(this, { label: '期末考试', score: this.selectedGrade.subScores?.final ?? null }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GradesPage.ets", line: 223, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '期末考试',
                                        score: this.selectedGrade.subScores?.final ?? null
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '期末考试', score: this.selectedGrade.subScores?.final ?? null
                                });
                            }
                        }, { name: "SubScoreItem" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SubScoreItem(this, { label: '实验', score: this.selectedGrade.subScores?.experiment ?? null }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GradesPage.ets", line: 224, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        label: '实验',
                                        score: this.selectedGrade.subScores?.experiment ?? null
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    label: '实验', score: this.selectedGrade.subScores?.experiment ?? null
                                });
                            }
                        }, { name: "SubScoreItem" });
                    }
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
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GradesPage";
    }
}
class GradeCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__grade = new SynchedPropertyObjectOneWayPU(params.grade, this, "grade");
        this.onTap = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GradeCard_Params) {
        if (params.onTap !== undefined) {
            this.onTap = params.onTap;
        }
    }
    updateStateVars(params: GradeCard_Params) {
        this.__grade.reset(params.grade);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__grade.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__grade.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __grade: SynchedPropertySimpleOneWayPU<GradeRecord>;
    get grade() {
        return this.__grade.get();
    }
    set grade(newValue: GradeRecord) {
        this.__grade.set(newValue);
    }
    private onTap?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(246:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 10 });
            Column.onClick(() => { if (this.onTap)
                this.onTap(); });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GradesPage.ets(247:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(248:9)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.grade.courseName);
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(249:11)", "entry");
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#0F172A');
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.grade.courseCode} · ${this.grade.courseType}`);
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(251:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#64748B');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.grade.credit} 学分`);
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(253:11)", "entry");
            Text.fontSize(11);
            Text.fontColor('#94A3B8');
            Text.margin({ top: 1 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(258:9)", "entry");
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.grade.isPublished) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(String(this.grade.overallScore));
                        Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(260:13)", "entry");
                        Text.fontSize(28);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#2563EB');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`绩点 ${this.grade.gpa.toFixed(1)}`);
                        Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(262:13)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#64748B');
                        Text.margin({ top: 2 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('—');
                        Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(265:13)", "entry");
                        Text.fontSize(28);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#94A3B8');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂未发布');
                        Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(267:13)", "entry");
                        Text.fontSize(11);
                        Text.fontColor('#94A3B8');
                        Text.margin({ top: 2 });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class SubScoreItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__label = new SynchedPropertySimpleOneWayPU(params.label, this, "label");
        this.__score = new SynchedPropertyObjectOneWayPU(params.score, this, "score");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SubScoreItem_Params) {
        if (params.label === undefined) {
            this.__label.set('');
        }
        if (params.score === undefined) {
            this.__score.set(null);
        }
    }
    updateStateVars(params: SubScoreItem_Params) {
        this.__label.reset(params.label);
        this.__score.reset(params.score);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__label.purgeDependencyOnElmtId(rmElmtId);
        this.__score.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__label.aboutToBeDeleted();
        this.__score.aboutToBeDeleted();
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
    private __score: SynchedPropertySimpleOneWayPU<number | null>;
    get score() {
        return this.__score.get();
    }
    set score(newValue: number | null) {
        this.__score.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GradesPage.ets(293:5)", "entry");
            Column.alignItems(HorizontalAlign.Center);
            Column.padding(12);
            Column.backgroundColor('#F8FAFC');
            Column.borderRadius(10);
            Column.width('42%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.label);
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(294:7)", "entry");
            Text.fontSize(12);
            Text.fontColor('#64748B');
            Text.margin({ bottom: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.score !== null && this.score !== undefined && this.score > 0 ? String(this.score) : '—');
            Text.debugLine("entry/src/main/ets/pages/GradesPage.ets(296:7)", "entry");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.score !== null && this.score !== undefined && this.score > 0 ? '#0F172A' : '#94A3B8');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new GradesPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/GradesPage", pageFullPath: "entry/src/main/ets/pages/GradesPage", integratedHsp: "false", moduleType: "followWithHap" });
