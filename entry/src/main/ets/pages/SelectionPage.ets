/**
 * 选课模块
 * 课程列表与课表联动：从课表读取课程，勾选控制课表显示
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { MOCK_SELECTION_ROUND, SEMESTER_MAX_CREDIT } from '../mock/MockData';
import { SelectableCourse, SelectionRound } from '../model/CourseModel';
import { ScheduleStore } from '../utils/ScheduleStore';

@Entry
@Component
struct SelectionPage {
  /** 选课轮次 */
  @State round: SelectionRound = MOCK_SELECTION_ROUND;
  /** 课表课程列表（初始全部勾选） */
  @State courses: SelectableCourse[] = [];
  /** 已选学分 */
  @State selectedCredit: number = 0;
  /** 加载状态 */
  @State isLoading: boolean = true;
  /** 搜索关键词 */
  @State searchKeyword: string = '';
  /** 课程类型筛选 */
  @State filterType: string = '全部';
  /** Toast */
  @State toastMsg: string = '';
  @State showToast: boolean = false;

  aboutToAppear(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    this.isLoading = true;
    await new Promise<void>((r) => setTimeout(r, 300));
    this.reloadCourses();
    this.isLoading = false;
  }

  private reloadCourses(): void {
    this.courses = ScheduleStore.getSelectableCourses();
    this.selectedCredit = this.courses
      .filter((c: SelectableCourse) => c.isSelected)
      .reduce((sum: number, c: SelectableCourse) => sum + c.credit, 0);
  }

  private handleToggle(course: SelectableCourse, checked: boolean): void {
    if (!this.round.isActive) {
      this.showToastOnce('当前不在选课轮次时间内');
      this.reloadCourses();
      return;
    }
    if (checked && this.selectedCredit + course.credit > SEMESTER_MAX_CREDIT) {
      this.showToastOnce(`学分超限，本学期上限 ${SEMESTER_MAX_CREDIT} 学分，当前已选 ${this.selectedCredit} 学分`);
      this.reloadCourses();
      return;
    }
    const success = ScheduleStore.setCourseSelected(course.courseCode, checked);
    if (!success) {
      this.showToastOnce(checked ? '恢复选课失败' : '退选失败');
      this.reloadCourses();
      return;
    }
    this.reloadCourses();
    if (!checked) {
      this.showToastOnce('已从课表移除');
    }
  }

  private getFilteredCourses(): SelectableCourse[] {
    let list = this.courses;
    if (this.filterType !== '全部') {
      list = list.filter((c: SelectableCourse) => c.courseType.indexOf(this.filterType) >= 0);
    }
    if (this.searchKeyword.trim()) {
      const kw = this.searchKeyword.trim().toLowerCase();
      list = list.filter((c: SelectableCourse) =>
        c.courseName.toLowerCase().includes(kw) ||
        c.courseCode.toLowerCase().includes(kw) ||
        c.teacher.toLowerCase().includes(kw)
      );
    }
    return list;
  }

  private getSelectedCount(): number {
    return this.courses.filter((c: SelectableCourse) => c.isSelected).length;
  }

  private showToastOnce(msg: string): void {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; this.toastMsg = ''; }, 2000);
  }

  build() {
    Stack() {
      Column() {
        TopBar({ title: '选课', showBack: true, onBack: () => router.back() })

        if (this.isLoading) {
          LoadingPlaceholder()
        } else {
          Column() {
            this.buildRoundInfo()

            Row() {
              Text(`课表课程 ${this.courses.length}`)
                .fontSize(13).fontWeight(700).fontColor('#2563EB')
                .padding({ left: 14, right: 14, top: 10, bottom: 10 })
                .borderRadius(8).backgroundColor('#E8EFFF')

              Text(`已选 ${this.getSelectedCount()}`)
                .fontSize(13).fontWeight(500).fontColor('#64748B')
                .padding({ left: 14, right: 14, top: 10, bottom: 10 })
                .margin({ left: 10 })
            }
            .width('100%')
            .padding({ left: 14, top: 8, bottom: 8 })

            this.buildCourseList()
          }
          .layoutWeight(1)
        }
      }
      .width('100%').height('100%').backgroundColor('#EEF2F8')

      if (this.showToast) {
        Text(this.toastMsg)
          .fontSize(13).fontWeight(500).fontColor('#FFFFFF')
          .padding({ left: 18, right: 18, top: 10, bottom: 10 })
          .borderRadius(999).backgroundColor('rgba(15, 23, 42, 0.88)')
          .position({ bottom: 100, left: '50%' }).translate({ x: '-50%' })
      }
    }
  }

  @Builder
  buildRoundInfo(): void {
    Column() {
      Row() {
        Column() {
          Text(`选课轮次：${this.round.roundName}`)
            .fontSize(14).fontWeight(FontWeight.Medium).fontColor('#0F172A')
          Text(`${this.round.startTime} ~ ${this.round.endTime}`)
            .fontSize(11).fontColor('#64748B').margin({ top: 2 })
        }
        .alignItems(HorizontalAlign.Start).layoutWeight(1)

        Text(`已选 ${this.selectedCredit}/${SEMESTER_MAX_CREDIT} 学分`)
          .fontSize(13).fontWeight(600).fontColor('#2563EB')
          .padding({ left: 10, right: 10, top: 6, bottom: 6 })
          .borderRadius(8).backgroundColor('#E8EFFF')
      }
      .width('100%')

      Row() {
        TextInput({ placeholder: '搜索课程名/课号/教师', text: this.searchKeyword })
          .fontSize(13).height(38).layoutWeight(1).backgroundColor('#F8FAFC')
          .borderRadius(8).padding({ left: 10 })
          .onChange((val: string) => { this.searchKeyword = val; })

        ForEach(['全部', '专业核心', '专业拓展', '通识教育'], (t: string) => {
          Text(t === '专业核心' ? '核心' : t === '专业拓展' ? '拓展' : t === '通识教育' ? '通识' : t)
            .fontSize(11).fontWeight(600)
            .fontColor(this.filterType === t ? '#FFFFFF' : '#64748B')
            .padding({ left: 8, right: 8, top: 4, bottom: 4 })
            .borderRadius(6)
            .backgroundColor(this.filterType === t ? '#2563EB' : '#F1F5F9')
            .margin({ left: 6 })
            .onClick(() => { this.filterType = t; })
        })
      }
      .width('100%').margin({ top: 10 })
    }
    .width('100%')
    .padding(14)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ left: 14, right: 14, top: 12 })
  }

  @Builder
  buildCourseList(): void {
    if (this.getFilteredCourses().length === 0) {
      EmptyPlaceholder({
        message: this.courses.length === 0 ? '课表暂无课程' : '暂无符合条件的课程',
        subMessage: this.courses.length === 0 ? '请先在课表页导入或查看课表' : '请调整筛选条件',
        iconText: '📋'
      })
    } else {
      Scroll() {
        Column() {
          ForEach(this.getFilteredCourses(), (course: SelectableCourse) => {
            SelectionCourseCard({
              course: course,
              onToggle: (checked: boolean) => this.handleToggle(course, checked)
            })
          })
          Column().height(16)
        }.width('100%').padding({ left: 14, right: 14 })
      }
      .scrollBar(BarState.Off).layoutWeight(1)
    }
  }
}

/**
 * 选课课程卡片（勾选联动课表）
 */
@Component
struct SelectionCourseCard {
  @Prop course: SelectableCourse;
  onToggle?: (checked: boolean) => void;

  build() {
    Column() {
      Row() {
        Checkbox()
          .select(this.course.isSelected)
          .selectedColor('#2563EB')
          .onChange((checked: boolean) => {
            if (this.onToggle) {
              this.onToggle(checked);
            }
          })

        Column() {
          Text(this.course.courseName)
            .fontSize(15).fontWeight(FontWeight.Medium).fontColor('#0F172A').maxLines(1)
          Text(this.course.courseCode)
            .fontSize(12).fontColor('#64748B').margin({ top: 2 })
          Text(`教师：${this.course.teacher} · ${this.course.scheduleInfo}`)
            .fontSize(11).fontColor('#94A3B8').margin({ top: 2 }).maxLines(2)
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        .margin({ left: 10 })

        Column() {
          Text(`${this.course.credit} 学分`)
            .fontSize(13).fontWeight(600).fontColor('#2563EB')
          Text(this.course.isSelected ? '已选' : '未选')
            .fontSize(11)
            .fontColor(this.course.isSelected ? '#16A34A' : '#94A3B8')
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.End)
      }
      .width('100%')
      .alignItems(VerticalAlign.Top)

      Row() {
        Text(this.course.courseType)
          .fontSize(10).fontWeight(600).fontColor('#3730A3')
          .padding({ left: 8, right: 8, top: 2, bottom: 2 })
          .borderRadius(4).backgroundColor('#E0E7FF')
      }
      .width('100%')
      .margin({ top: 10, left: 32 })
    }
    .width('100%')
    .padding(14)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 10 })
  }
}
