/**
 * 成绩查询页面
 * 对应需求 4.11 章节，对标 HTML 成绩原型
 * 学期切换、成绩卡片列表、分项成绩弹窗、未发布状态
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { MOCK_GRADES_HISTORY, MOCK_GRADES_UNPUBLISHED, SEMESTER_OPTIONS } from '../mock/MockData';
import { GradeRecord, SemesterSummary } from '../model/GradeModel';
import { GradeStore } from '../utils/GradeStore';

@Entry
@Component
export struct GradesPage {
  /** 是否作为 Tab 嵌入主框架（嵌入时隐藏返回按钮） */
  @Prop embedded: boolean = false;
  @StorageLink('currentSemester') currentSemester: string = '2025-2026 第2学期';
  @StorageLink('scheduleTabToken') @Watch('onScheduleChanged') scheduleTabToken: number = 0;
  @State grades: GradeRecord[] = [];
  @State isLoading: boolean = true;
  @State showSubScore: boolean = false;
  @State selectedGrade: GradeRecord | null = null;

  aboutToAppear(): void {
    this.loadGrades();
  }

  onScheduleChanged(): void {
    this.loadGrades();
  }

  private async loadGrades(): Promise<void> {
    this.isLoading = true;
    await new Promise<void>((r) => setTimeout(r, 300));
    this.grades = GradeStore.getGradesForSemester(this.currentSemester);
    this.isLoading = false;
  }

  /** 计算学期汇总 */
  private getSummary(): SemesterSummary {
    const emptySummary: SemesterSummary = { totalCredit: 0 };
    if (!this.grades || this.grades.length === 0) {
      return emptySummary;
    }
    const published = this.grades.filter((g: GradeRecord) => g.isPublished);
    if (published.length === 0) {
      return emptySummary;
    }
    const totalCredit = published.reduce((sum: number, g: GradeRecord) => sum + (g.credit || 0), 0);
    const summary: SemesterSummary = {
      totalCredit: totalCredit
    };
    return summary;
  }

  build() {
    Stack() {
      Column() {
        TopBar({
          title: '成绩查询',
          showBack: !this.embedded,
          onBack: () => router.back()
        })

        if (this.isLoading) {
          LoadingPlaceholder()
        } else {
          Scroll() {
            Column() {
              // 学期选择器
              this.buildSemesterSelector()

              // 汇总统计
              this.buildSummary()

              // 成绩列表
              Column() {
                if (this.grades.length === 0) {
                  EmptyPlaceholder({
                    message: '暂未发布',
                    subMessage: '当前学期暂无已发布的成绩',
                    iconText: '📊'
                  })
                } else {
                  ForEach(this.grades, (grade: GradeRecord) => {
                    GradeCard({
                      grade: grade,
                      onTap: () => {
                        if (grade.isPublished && grade.subScores) {
                          this.selectedGrade = grade;
                          this.showSubScore = true;
                        }
                      }
                    })
                  }, (grade: GradeRecord) => grade.id)
                }
              }
              .width('100%')
              .padding({ left: 14, right: 14 })

              Column().height(24)
            }
            .width('100%')
          }
          .width('100%')
          .layoutWeight(1)
          .scrollBar(BarState.Off)
        }
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#EEF2F8')

      // 分项成绩弹窗
      if (this.showSubScore && this.selectedGrade) {
        this.buildSubScoreSheet()
      }
    }
  }

  @Builder
  buildSemesterSelector(): void {
    Row() {
      Scroll() {
        Row() {
          ForEach(SEMESTER_OPTIONS, (sem: string) => {
            Text(sem)
              .fontSize(12)
              .fontWeight(600)
              .fontColor(this.currentSemester === sem ? '#FFFFFF' : '#2563EB')
              .backgroundColor(this.currentSemester === sem ? '#2563EB' : '#FFFFFF')
              .borderRadius(8)
              .borderWidth(1)
              .borderColor('#2563EB')
              .padding({ left: 12, right: 12, top: 6, bottom: 6 })
              .margin({ right: 8 })
              .onClick(() => {
                this.currentSemester = sem;
                this.loadGrades();
              })
          })
        }
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
    }
    .width('100%')
    .padding({ left: 14, top: 12, bottom: 6 })
  }

  @Builder
  buildSummary(): void {
    Row() {
      Column() {
        Text('总学分')
          .fontSize(11)
          .fontColor('#64748B')
        Text(String(this.getSummary().totalCredit))
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2563EB')
          .margin({ top: 2 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Center)
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ left: 14, right: 14, top: 8, bottom: 12 })
  }

  @Builder
  buildSubScoreSheet(): void {
    Column() {
      Column()
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('rgba(15, 23, 42, 0.45)')
        .onClick(() => { this.showSubScore = false; })

      Column() {
        Row() {
          Text('分项成绩')
            .fontSize(17)
            .fontWeight(FontWeight.Bold)
          Blank()
          Text('✕').fontSize(18).fontColor('#64748B')
            .onClick(() => { this.showSubScore = false; })
        }
        .width('100%')
        .margin({ bottom: 16 })

        if (this.selectedGrade) {
          Text(this.selectedGrade.courseName)
            .fontSize(16).fontWeight(FontWeight.Medium).margin({ bottom: 16 })

          Row() {
            SubScoreItem({ label: '平时成绩', score: this.selectedGrade.subScores?.regular ?? null })
            SubScoreItem({ label: '期中考试', score: this.selectedGrade.subScores?.midterm ?? null })
          }.width('100%').justifyContent(FlexAlign.SpaceAround).margin({ bottom: 12 })

          Row() {
            SubScoreItem({ label: '期末考试', score: this.selectedGrade.subScores?.final ?? null })
            SubScoreItem({ label: '实验', score: this.selectedGrade.subScores?.experiment ?? null })
          }.width('100%').justifyContent(FlexAlign.SpaceAround)
        }
      }
      .width('100%')
      .padding(24)
      .backgroundColor('#FFFFFF')
      .borderRadius({ topLeft: 18, topRight: 18 })
    }
    .width('100%').height('100%').position({ x: 0, y: 0 }).zIndex(50)
  }
}

/**
 * 成绩卡片子组件
 */
@Component
struct GradeCard {
  @Prop grade: GradeRecord;
  onTap?: () => void;

  build() {
    Column() {
      Row() {
        Column() {
          Text(this.grade.courseName)
            .fontSize(15).fontWeight(FontWeight.Medium).fontColor('#0F172A').maxLines(1)
          Text(`${this.grade.courseCode} · ${this.grade.courseType}`)
            .fontSize(11).fontColor('#64748B').margin({ top: 2 })
          Text(`${this.grade.credit} 学分`)
            .fontSize(11).fontColor('#94A3B8').margin({ top: 1 })
        }
        .alignItems(HorizontalAlign.Start).layoutWeight(1)

        Column() {
          if (this.grade.isPublished) {
            Text(String(this.grade.overallScore))
              .fontSize(28).fontWeight(FontWeight.Bold).fontColor('#2563EB')
          } else {
            Text('—')
              .fontSize(28).fontWeight(FontWeight.Bold).fontColor('#94A3B8')
            Text('暂未发布')
              .fontSize(11).fontColor('#94A3B8').margin({ top: 2 })
          }
        }
        .alignItems(HorizontalAlign.End)
      }
      .width('100%')
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 10 })
    .onClick(() => { if (this.onTap) this.onTap(); })
  }
}

/**
 * 分项成绩子组件
 */
@Component
struct SubScoreItem {
  @Prop label: string = '';
  @Prop score: number | null = null;

  build() {
    Column() {
      Text(this.label)
        .fontSize(12).fontColor('#64748B').margin({ bottom: 6 })
      Text(this.score !== null && this.score !== undefined && this.score > 0 ? String(this.score) : '—')
        .fontSize(22).fontWeight(FontWeight.Bold)
        .fontColor(this.score !== null && this.score !== undefined && this.score > 0 ? '#0F172A' : '#94A3B8')
    }
    .alignItems(HorizontalAlign.Center)
    .padding(12)
    .backgroundColor('#F8FAFC')
    .borderRadius(10)
    .width('42%')
  }
}
