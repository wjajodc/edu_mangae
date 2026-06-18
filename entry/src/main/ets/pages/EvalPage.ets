/**
 * 量化评教页面
 * 对应需求 4.15 章节，对标 HTML 评教原型
 * 三种状态：不在开放时间范围内、开放评教（待提交）、已提交
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { MOCK_EVAL_TASKS, SEMESTER_OPTIONS } from '../mock/MockData';
import { EvaluationTask } from '../model/EvalModel';

@Entry
@Component
export struct EvalPage {
  /** 当前学期 */
  @State currentSemester: string = '2025-2026 第2学期';
  /** 评教任务列表 */
  @State evalTasks: EvaluationTask[] = [];
  /** 加载状态 */
  @State isLoading: boolean = true;
  /** 学期选择弹窗 */
  @State showSemesterPicker: boolean = false;

  aboutToAppear(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    this.isLoading = true;
    await new Promise<void>((r) => setTimeout(r, 500));
    this.evalTasks = MOCK_EVAL_TASKS;
    this.isLoading = false;
  }

  build() {
    Stack() {
      Column() {
        TopBar({ title: '量化评教', showBack: true, onBack: () => router.back() })

        if (this.isLoading) {
          LoadingPlaceholder()
        } else {
          Scroll() {
            Column() {
              // 学期选择器
              this.buildSemesterSelector()

              // 评教任务列表
              Column() {
                ForEach(this.evalTasks, (task: EvaluationTask) => {
                  EvalTaskCard({ task: task })
                })
              }
              .width('100%')
              .padding({ left: 14, right: 14 })

              // 底部间距
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

      // 学期选择弹窗（简化版，使用确认选择）
      if (this.showSemesterPicker) {
        Column() {
          Column()
            .width('100%')
            .height('100%')
            .backgroundColor('rgba(15, 23, 42, 0.45)')
            .onClick(() => { this.showSemesterPicker = false; })

          Column() {
            Text('选择学期')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .margin({ bottom: 12 })

            ForEach(SEMESTER_OPTIONS, (sem: string) => {
              Text(sem)
                .fontSize(15)
                .padding({ top: 12, bottom: 12 })
                .fontColor(this.currentSemester === sem ? '#2563EB' : '#0F172A')
                .fontWeight(this.currentSemester === sem ? 600 : 400)
                .width('100%')
                .textAlign(TextAlign.Center)
                .onClick(() => {
                  this.currentSemester = sem;
                  this.showSemesterPicker = false;
                })
            })
          }
          .width('86%')
          .padding(20)
          .backgroundColor('#FFFFFF')
          .borderRadius(16)
          .position({ bottom: 30 })
        }
        .width('100%')
        .height('100%')
        .position({ x: 0, y: 0 })
        .zIndex(50)
      }
    }
  }

  @Builder
  buildSemesterSelector(): void {
    Row() {
      Text(this.currentSemester)
        .fontSize(14)
        .fontWeight(600)
        .fontColor('#2563EB')

      Text(' ▾')
        .fontSize(12)
        .fontColor('#2563EB')
    }
    .padding({ left: 14, right: 14, top: 12, bottom: 6 })
    .margin({ bottom: 6 })
    .onClick(() => { this.showSemesterPicker = true; })
  }
}

/**
 * 评教任务卡片子组件
 */
@Component
struct EvalTaskCard {
  @Prop task: EvaluationTask;

  build() {
    Column() {
      Row() {
        Column() {
          Text(this.task.courseName)
            .fontSize(15)
            .fontWeight(FontWeight.Medium)
            .fontColor('#0F172A')
            .margin({ bottom: 4 })

          Text(`${this.task.courseCode} · ${this.task.teacher}`)
            .fontSize(12)
            .fontColor('#64748B')
            .margin({ bottom: 2 })

          Text(`${this.task.courseType}`)
            .fontSize(11)
            .fontColor('#94A3B8')
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)

        // 状态标签
        if (this.task.status === 'closed') {
          Text(this.task.statusText)
            .fontSize(11)
            .fontWeight(600)
            .fontColor('#64748B')
            .padding({ left: 10, right: 10, top: 4, bottom: 4 })
            .borderRadius(8)
            .backgroundColor('#F1F5F9')
        } else if (this.task.status === 'submitted') {
          Text(this.task.statusText)
            .fontSize(11)
            .fontWeight(600)
            .fontColor('#166534')
            .padding({ left: 10, right: 10, top: 4, bottom: 4 })
            .borderRadius(8)
            .backgroundColor('#DCFCE7')
        } else if (this.task.status === 'open') {
          Button('去评教')
            .type(ButtonType.Normal)
            .backgroundColor('#2563EB')
            .fontColor(Color.White)
            .fontSize(12)
            .fontWeight(600)
            .borderRadius(8)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .onClick(() => {
              router.pushUrl({
                url: 'pages/EvalQuestionnairePage',
                params: { taskId: this.task.id }
              });
            })
        }
      }
      .width('100%')

      // 开放时间
      if (this.task.status !== 'submitted') {
        Text(`开放时间：${this.task.openTime} ~ ${this.task.closeTime}`)
          .fontSize(11)
          .fontColor('#94A3B8')
          .margin({ top: 6 })
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 10 })
  }
}
