/**
 * 今日课程页面
 * 对应需求 4.9，按节次展示今日/明日课程
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { TodayCourseItem } from '../model/CourseModel';
import { ScheduleStore } from '../utils/ScheduleStore';

@Entry
@Component
struct TodayCoursePage {
  @State dayTabIndex: number = 0; // 0=今天, 1=明天
  @State courses: TodayCourseItem[] = [];
  @State isLoading: boolean = true;

  aboutToAppear(): void {
    this.loadCourses();
  }

  private async loadCourses(): Promise<void> {
    this.isLoading = true;
    await new Promise<void>((r) => setTimeout(r, 400));
    this.courses = ScheduleStore.getTodayCourses(this.dayTabIndex === 1);
    this.isLoading = false;
  }

  build() {
    Column() {
      TopBar({ title: '今日课程', showBack: true, onBack: () => router.back() })

      // 今天/明天切换
      Row() {
        Text('今天')
          .fontSize(14).fontWeight(this.dayTabIndex === 0 ? 700 : 500)
          .fontColor(this.dayTabIndex === 0 ? '#FFFFFF' : '#64748B')
          .backgroundColor(this.dayTabIndex === 0 ? '#2563EB' : '#F1F5F9')
          .borderRadius(8)
          .padding({ left: 20, right: 20, top: 8, bottom: 8 })
          .margin({ right: 10 })
          .onClick(() => { this.dayTabIndex = 0; this.loadCourses(); })

        Text('明天')
          .fontSize(14).fontWeight(this.dayTabIndex === 1 ? 700 : 500)
          .fontColor(this.dayTabIndex === 1 ? '#FFFFFF' : '#64748B')
          .backgroundColor(this.dayTabIndex === 1 ? '#2563EB' : '#F1F5F9')
          .borderRadius(8)
          .padding({ left: 20, right: 20, top: 8, bottom: 8 })
          .onClick(() => { this.dayTabIndex = 1; this.loadCourses(); })
      }
      .width('100%').padding({ left: 14, top: 12, bottom: 8 })

      if (this.isLoading) {
        LoadingPlaceholder()
      } else if (this.courses.length === 0) {
        EmptyPlaceholder({ message: '今天没有课程安排', subMessage: '好好休息一下吧~', iconText: '📭' })
      } else {
        Scroll() {
          Column() {
            ForEach(this.courses, (course: TodayCourseItem) => {
              this.buildCourseCard(course)
            })
            Column().height(16)
          }.width('100%').padding({ left: 14, right: 14 })
        }
        .width('100%').layoutWeight(1).scrollBar(BarState.Off)
      }
    }
    .width('100%').height('100%').backgroundColor('#EEF2F8')
  }

  @Builder buildCourseCard(course: TodayCourseItem): void {
    Column() {
      Row() {
        // 时间色块
        Column() {
          Text(`第${course.startPeriod}节`)
            .fontSize(11).fontWeight(FontWeight.Bold).fontColor('#FFFFFF')
        }
        .width(56).height(56).borderRadius(10)
        .backgroundColor(this.getPeriodColor(course.startPeriod))
        .justifyContent(FlexAlign.Center).alignItems(HorizontalAlign.Center)

        // 课程信息
        Column() {
          Text(course.courseName)
            .fontSize(15).fontWeight(FontWeight.Medium).fontColor('#0F172A')
          Text(`教师：${course.teacher}`)
            .fontSize(12).fontColor('#64748B').margin({ top: 2 })
          Text(`${course.periodLabel} · ${course.classroom}`)
            .fontSize(11).fontColor('#94A3B8').margin({ top: 1 })
        }
        .alignItems(HorizontalAlign.Start).layoutWeight(1).margin({ left: 14 })
      }
      .width('100%')
    }
    .width('100%').padding(14).backgroundColor('#FFFFFF')
    .borderRadius(12).margin({ bottom: 10 })
  }

  private getPeriodColor(period: number): string {
    if (period <= 4) return '#2563EB';
    if (period <= 8) return '#EA580C';
    return '#6366F1';
  }
}
