/**
 * 考试安排页面
 * 对应需求 4.12，对标 HTML 原型
 * 按学期筛选、考试列表、加载/空/异常状态
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { MOCK_EXAMS, SEMESTER_OPTIONS } from '../mock/MockData';
import { ExamArrangement } from '../model/GradeModel';

@Entry
@Component
struct ExamsPage {
  @State currentSemester: string = '2025-2026 第2学期';
  @State exams: ExamArrangement[] = [];
  @State isLoading: boolean = true;

  aboutToAppear(): void {
    this.loadExams();
  }

  private async loadExams(): Promise<void> {
    this.isLoading = true;
    await new Promise<void>((r) => setTimeout(r, 400));
    this.exams = MOCK_EXAMS.filter(e => e.semester === this.currentSemester);
    this.isLoading = false;
  }

  build() {
    Column() {
      TopBar({ title: '考试安排', showBack: true, onBack: () => router.back() })

      if (this.isLoading) {
        LoadingPlaceholder()
      } else {
        Scroll() {
          Column() {
            // 学期选择
            Row() {
              Scroll() {
                Row() {
                  ForEach(SEMESTER_OPTIONS, (sem: string) => {
                    Text(sem)
                      .fontSize(12).fontWeight(600)
                      .fontColor(this.currentSemester === sem ? '#FFFFFF' : '#2563EB')
                      .backgroundColor(this.currentSemester === sem ? '#2563EB' : '#FFFFFF')
                      .borderRadius(8).borderWidth(1).borderColor('#2563EB')
                      .padding({ left: 10, right: 10, top: 6, bottom: 6 })
                      .margin({ right: 8 })
                      .onClick(() => {
                        this.currentSemester = sem;
                        this.loadExams();
                      })
                  })
                }
              }
              .scrollable(ScrollDirection.Horizontal).scrollBar(BarState.Off)
            }
            .width('100%').padding({ left: 14, top: 12, bottom: 10 })

            // 考试列表
            if (this.exams.length === 0) {
              EmptyPlaceholder({ message: '暂无考试安排', iconText: '📅' })
            } else {
              Column() {
                ForEach(this.exams, (exam: ExamArrangement) => {
                  ExamCard({ exam: exam })
                })
              }
              .width('100%').padding({ left: 14, right: 14 })
            }

            Column().height(24)
          }
          .width('100%')
        }
        .width('100%').layoutWeight(1).scrollBar(BarState.Off)
      }
    }
    .width('100%').height('100%').backgroundColor('#EEF2F8')
  }
}

/**
 * 考试卡片子组件
 */
@Component
struct ExamCard {
  @Prop exam: ExamArrangement;

  build() {
    Column() {
      Row() {
        // 日期色块
        Column() {
          Text(this.getDayNumber(this.exam.examDate))
            .fontSize(24).fontWeight(FontWeight.Bold).fontColor('#FFFFFF')
          Text(this.getMonthText(this.exam.examDate))
            .fontSize(10).fontColor('rgba(255,255,255,0.8)')
        }
        .width(60).height(64)
        .borderRadius(10)
        .backgroundColor('#6366F1')
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)

        // 考试信息
        Column() {
          Text(this.exam.courseName)
            .fontSize(15).fontWeight(FontWeight.Medium).fontColor('#0F172A')
          Text(`${this.exam.examType} · ${this.exam.examTime}`)
            .fontSize(12).fontColor('#64748B').margin({ top: 2 })
          Text(`${this.exam.examRoom} · 座位 ${this.exam.seatNumber}`)
            .fontSize(11).fontColor('#94A3B8').margin({ top: 1 })
        }
        .alignItems(HorizontalAlign.Start).layoutWeight(1).margin({ left: 14 })
      }
      .width('100%')

      if (this.exam.notes) {
        Text(this.exam.notes)
          .fontSize(11).fontColor('#EA580C')
          .margin({ top: 8 }).width('100%')
      }
    }
    .width('100%').padding(14)
    .backgroundColor('#FFFFFF').borderRadius(12)
    .margin({ bottom: 10 })
  }

  /** 从日期字符串提取日期数字 */
  private getDayNumber(dateStr: string): string {
    const parts = dateStr.split('-');
    return parts.length >= 3 ? parts[2] : dateStr;
  }

  /** 从日期字符串提取月份文本 */
  private getMonthText(dateStr: string): string {
    const parts = dateStr.split('-');
    return parts.length >= 2 ? `${parts[1]}月` : '';
  }
}
