/**
 * 首页/工作台页面
 * 功能：顶部轮播图、快捷入口宫格、今日课程模块
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { TodayCourseItem } from '../model/CourseModel';
import { ScheduleStore } from '../utils/ScheduleStore';
import { syncCurrentTeachingWeek } from '../utils/DateUtils';

interface BannerItem {
  id: string;
  src: Resource;
}

@Component
export struct HomePage {
  @StorageLink('studentName') studentName: string = '同学';
  @State todayCourses: TodayCourseItem[] = [];
  @State isLoading: boolean = true;
  @StorageLink('currentWeek') @Watch('onWeekChanged') currentWeek: number = 1;
  @StorageLink('currentSemester') @Watch('onSemesterChanged') currentSemester: string = '';
  @State carouselIndex: number = 0;

  private readonly banners: BannerItem[] = [
    { id: 'selection', src: $r('app.media.banner_selection') },
    { id: 'calendar', src: $r('app.media.banner_calendar') },
    { id: 'exam', src: $r('app.media.banner_exam') },
    { id: 'internship', src: $r('app.media.banner_internship') },
  ];

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

  build() {
    Column() {
      TopBar({ title: '教学管理系统', showBack: false })

      if (this.isLoading) {
        LoadingPlaceholder({ message: '加载中...' })
      } else {
        Scroll() {
          Column() {
            this.buildBannerCarousel()
            this.buildQuickGrid()
            this.buildTodayCourse()
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
  }

  @Builder
  buildBannerCarousel(): void {
    Column() {
      Swiper() {
        ForEach(this.banners, (item: BannerItem) => {
          Image(item.src)
            .width('100%')
            .height(168)
            .objectFit(ImageFit.Cover)
            .borderRadius(12)
        }, (item: BannerItem) => item.id)
      }
      .width('100%')
      .height(168)
      .autoPlay(true)
      .interval(4000)
      .loop(true)
      .duration(500)
      .curve(Curve.Linear)
      .indicator(
        new DotIndicator()
          .itemWidth(6)
          .itemHeight(6)
          .selectedItemWidth(14)
          .selectedItemHeight(6)
          .color('rgba(255, 255, 255, 0.45)')
          .selectedColor('#FFFFFF')
      )
      .onChange((index: number) => {
        this.carouselIndex = index;
      })
    }
    .width('100%')
    .padding({ left: 14, right: 14, top: 16 })
  }

  @Builder
  buildQuickGrid(): void {
    Column() {
      Row() {
        Text('快捷入口')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#0F172A')
      }
      .width('100%')
      .padding({ left: 14, top: 20, bottom: 10 })

      Row() {
        QuickEntry({ label: '我的课表', icon: '📅', onTap: () => {
          this.openCurrentWeekSchedule();
        } })

        QuickEntry({ label: '我的成绩', icon: '📊', onTap: () => {
          router.pushUrl({ url: 'pages/GradesPage' });
        } })

        QuickEntry({ label: '选课', icon: '📋', onTap: () => {
          router.pushUrl({ url: 'pages/SelectionPage' });
        } })

        QuickEntry({ label: '量化评教', icon: '📝', onTap: () => {
          router.pushUrl({ url: 'pages/EvalPage' });
        } })
      }
      .width('100%')
      .padding({ left: 10, right: 10 })
      .justifyContent(FlexAlign.SpaceEvenly)
    }
  }

  @Builder
  buildTodayCourse(): void {
    Column() {
      Row() {
        Text('今日课程')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#0F172A')

        Blank()

        Text('查看全部 ›')
          .fontSize(13)
          .fontColor('#2563EB')
          .onClick(() => {
            router.pushUrl({ url: 'pages/TodayCoursePage' });
          })
      }
      .width('100%')
      .padding({ left: 14, right: 14, top: 16, bottom: 10 })

      if (this.todayCourses.length === 0) {
        this.buildTodayCourseEmpty()
      } else {
        Column() {
          ForEach(this.todayCourses, (course: TodayCourseItem, idx: number) => {
            TodayCourseItemCard({ course: course, isLast: idx === this.todayCourses.length - 1 })
          })
        }
        .width('100%')
        .padding({ left: 14, right: 14 })
      }
    }
  }

  @Builder
  buildTodayCourseEmpty(): void {
    Column() {
      Text('📭')
        .fontSize(32)
        .margin({ bottom: 8 })
      Text('今天没有课程安排')
        .fontSize(13)
        .fontColor('#64748B')
    }
    .width('100%')
    .padding({ top: 24, bottom: 24 })
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .backgroundColor('#F8FAFC')
    .borderRadius(12)
    .margin({ left: 14, right: 14 })
  }
}

@Component
struct QuickEntry {
  @Prop label: string = '入口';
  @Prop icon: string = '📌';
  onTap?: () => void;

  build() {
    Column() {
      Column() {
        Text(this.icon)
          .fontSize(28)
      }
      .width(56)
      .height(56)
      .borderRadius(14)
      .backgroundColor('#FFFFFF')
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
      .margin({ bottom: 8 })
      .shadow({ radius: 6, color: 'rgba(15, 23, 42, 0.04)', offsetX: 0, offsetY: 2 })

      Text(this.label)
        .fontSize(12)
        .fontWeight(500)
        .fontColor('#0F172A')
    }
    .alignItems(HorizontalAlign.Center)
    .onClick(() => {
      if (this.onTap) {
        this.onTap();
      }
    })
  }
}

@Component
struct TodayCourseItemCard {
  @Prop course: TodayCourseItem;
  @Prop isLast: boolean = false;

  build() {
    Row() {
      Column() {
        Text(String(this.course.startPeriod))
          .fontSize(11)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
      }
      .width(28)
      .height(48)
      .borderRadius(8)
      .backgroundColor(this.getPeriodColor(this.course.startPeriod))
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)

      Column() {
        Text(this.course.courseName)
          .fontSize(15)
          .fontWeight(FontWeight.Medium)
          .fontColor('#0F172A')
          .maxLines(1)

        Text(`${this.course.periodLabel} · ${this.course.classroom}`)
          .fontSize(12)
          .fontColor('#64748B')
          .maxLines(1)
          .margin({ top: 2 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      .margin({ left: 12 })
    }
    .width('100%')
    .padding(14)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: this.isLast ? 0 : 10 })
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
}
