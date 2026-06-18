/**
 * 首页/工作台页面
 * 功能：顶部轮播图、快捷入口宫格、今日课程模块
 */
import { router } from '@kit.ArkUI';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { AppSymbolIcon, APP_ICON_PRIMARY, APP_ICON_SOFT, AppIconKey } from '../components/AppSymbolIcon';
import { TodayCourseItem } from '../model/CourseModel';
import { ScheduleStore } from '../utils/ScheduleStore';
import { syncCurrentTeachingWeek } from '../utils/DateUtils';

/** 与登录页协调的色值 */
const HOME_TITLE: string = '#333654';
const HOME_SUBTITLE: string = '#A0AEC0';
const HOME_PRIMARY: string = '#5E61E6';
const HOME_SOFT: string = '#F0F4FF';

interface BannerItem {
  id: string;
  src: Resource;
}

@Component
export struct HomePage {
  @StorageLink('studentName') studentName: string = '同学';
  @StorageLink('avatarInitial') avatarInitial: string = '';
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
      this.buildHomeHeader()

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

  private getAvatarInitial(): string {
    if (this.avatarInitial && this.avatarInitial.length > 0) {
      return this.avatarInitial;
    }
    if (this.studentName && this.studentName.length > 0) {
      return this.studentName.substring(0, 1);
    }
    return '学';
  }

  @Builder
  buildHomeHeader(): void {
    Row() {
      Column() {
        Text(this.getAvatarInitial())
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
      }
      .width(44)
      .height(44)
      .borderRadius(22)
      .backgroundColor(HOME_PRIMARY)
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)

      Column() {
        Text(`你好，${this.studentName}`)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor(HOME_TITLE)
          .maxLines(1)

        Text(this.currentSemester || '2025-2026 第2学期')
          .fontSize(12)
          .fontColor(HOME_SUBTITLE)
          .margin({ top: 3 })
          .maxLines(1)
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      .margin({ left: 12 })

      Column() {
        Text(`第 ${this.currentWeek} 周`)
          .fontSize(12)
          .fontWeight(FontWeight.Medium)
          .fontColor(HOME_PRIMARY)
      }
      .padding({ left: 10, right: 10, top: 6, bottom: 6 })
      .borderRadius(14)
      .backgroundColor(HOME_SOFT)
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
    .backgroundColor('#FFFFFF')
    .alignItems(VerticalAlign.Center)
    .shadow({ radius: 8, color: 'rgba(15, 23, 42, 0.04)', offsetX: 0, offsetY: 2 })
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
    .padding({ left: 14, right: 14, top: 12 })
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
        QuickEntry({ label: '我的课表', iconKey: 'schedule', onTap: () => {
          this.openCurrentWeekSchedule();
        } })

        QuickEntry({ label: '我的成绩', iconKey: 'grades', onTap: () => {
          router.pushUrl({ url: 'pages/GradesPage' });
        } })

        QuickEntry({ label: '选课', iconKey: 'selection', onTap: () => {
          router.pushUrl({ url: 'pages/SelectionPage' });
        } })

        QuickEntry({ label: '量化评教', iconKey: 'eval', onTap: () => {
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
  @Prop iconKey: AppIconKey = 'home';
  onTap?: () => void;

  build() {
    Column() {
      Column() {
        AppSymbolIcon({
          iconKey: this.iconKey,
          iconSize: 26,
          color: APP_ICON_PRIMARY,
          weight: FontWeight.Medium,
        })
      }
      .width(56)
      .height(56)
      .borderRadius(14)
      .backgroundColor(APP_ICON_SOFT)
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
      .margin({ bottom: 8 })

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
