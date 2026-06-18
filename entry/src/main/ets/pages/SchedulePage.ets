/**
 * 我的课表页面
 * 周视图网格、教学周切换、多学年期导入
 */
import { router } from '@kit.ArkUI';
import { picker } from '@kit.CoreFileKit';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ScheduleCell, YearSemesterGroup } from '../model/CourseModel';
import { ScheduleStore } from '../utils/ScheduleStore';
import { ScheduleSemesterUtil } from '../utils/ScheduleSemesterUtil';
import { getCurrentDayOfWeek, getPeriodTimeSlot, getWeekDateLabels, syncCurrentTeachingWeek } from '../utils/DateUtils';

interface CourseColorStyle {
  bg: string;
  text: string;
}

const PERIOD_ROW_HEIGHT: number = 56;
const CELL_GAP: number = 2;
const TIME_COL_WIDTH: number = 46;
const COURSE_COLORS: CourseColorStyle[] = [
  { bg: '#E8F4FD', text: '#1976D2' },
  { bg: '#FFF3E0', text: '#F57C00' },
  { bg: '#E8F5E9', text: '#388E3C' },
  { bg: '#F3E5F5', text: '#7B1FA2' },
  { bg: '#FCE4EC', text: '#C2185B' },
  { bg: '#E0F7FA', text: '#00838F' },
  { bg: '#FFF8E1', text: '#F9A825' },
  { bg: '#EDE7F6', text: '#512DA8' },
];

@Entry
@Component
export struct SchedulePage {
  @Prop embedded: boolean = false;
  @StorageLink('scheduleTabToken') @Watch('onTabTokenChanged') tabToken: number = 0;
  @StorageLink('currentSemester') currentSemester: string = '';
  @StorageLink('currentScheduleKey') currentScheduleKey: string = '';
  @StorageLink('currentWeek') anchorWeek: number = 1;
  @State viewWeekNum: number = 1;
  @State weekDateLabels: string[] = [];
  @State maxWeek: number = 20;
  @State scheduleCells: ScheduleCell[] = [];
  @State isLoading: boolean = true;
  @State isImporting: boolean = false;
  @State showDetail: boolean = false;
  @State detailCourse: ScheduleCell | null = null;
  @State toastMsg: string = '';
  @State showToast: boolean = false;
  @State showSemesterPicker: boolean = false;
  @State showWeekPicker: boolean = false;
  @State showMenuPanel: boolean = false;
  @State showDeletePicker: boolean = false;
  @State showDeleteConfirm: boolean = false;
  @State deleteConfirmText: string = '';
  @State catalog: YearSemesterGroup[] = [];
  @State pickerYear: string = '';
  @State pickerTerm: number = 1;
  @State deleteYear: string = '';
  @State deleteTerm1Checked: boolean = false;
  @State deleteTerm2Checked: boolean = false;
  @State pendingDeleteKeys: string[] = [];

  private weekHeaders: string[] = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  private periodRange: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @State todayDayOfWeek: number = getCurrentDayOfWeek();

  aboutToAppear(): void {
    this.resetToCurrentDateView();
    this.refreshData();
  }

  onTabTokenChanged(): void {
    if (this.embedded && this.tabToken > 0) {
      this.resetToCurrentDateView();
      this.refreshData();
    }
  }

  /** 回到当前教学周并刷新今天星期几 */
  private resetToCurrentDateView(): void {
    this.todayDayOfWeek = getCurrentDayOfWeek();
    this.viewWeekNum = syncCurrentTeachingWeek(this.currentScheduleKey);
  }

  private refreshData(): void {
    this.isLoading = true;
    const schedule = ScheduleStore.getSchedule();
    if (schedule) {
      this.maxWeek = schedule.maxWeek;
      if (this.viewWeekNum > this.maxWeek) {
        this.viewWeekNum = this.anchorWeek > 0 ? this.anchorWeek : 1;
      }
      const anchorWeek = AppStorage.get<number>('currentWeek') ?? this.anchorWeek;
      this.weekDateLabels = getWeekDateLabels(this.viewWeekNum, anchorWeek);
      this.scheduleCells = ScheduleStore.getCellsForWeek(`第${this.viewWeekNum}周`);
    } else {
      this.maxWeek = 20;
      this.weekDateLabels = [];
      this.scheduleCells = [];
    }
    this.isLoading = false;
  }

  private isViewingCurrentWeek(): boolean {
    return this.viewWeekNum === this.anchorWeek;
  }

  private switchToWeek(weekNum: number): void {
    this.viewWeekNum = weekNum;
    this.weekDateLabels = getWeekDateLabels(weekNum, this.anchorWeek);
    this.scheduleCells = ScheduleStore.getCellsForWeek(`第${weekNum}周`);
    if (weekNum === this.anchorWeek) {
      AppStorage.setOrCreate('currentWeek', weekNum);
      ScheduleStore.syncTodayCourses();
    }
    this.showWeekPicker = false;
  }

  private returnToCurrentWeek(): void {
    const week = syncCurrentTeachingWeek(this.currentScheduleKey);
    this.switchToWeek(week);
  }

  private getWeekPickerOptions(): number[] {
    const options: number[] = [];
    for (let i = 1; i <= this.maxWeek; i++) {
      options.push(i);
    }
    return options;
  }

  private getCourseColor(code: string): CourseColorStyle {
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = (hash + code.charCodeAt(i)) % COURSE_COLORS.length;
    }
    return COURSE_COLORS[hash];
  }

  private openSemesterPicker(): void {
    this.showMenuPanel = false;
    this.catalog = ScheduleStore.getCatalog();
    if (this.catalog.length === 0) {
      return;
    }
    const current = ScheduleSemesterUtil.fromKey(this.currentScheduleKey);
    if (current) {
      this.pickerYear = current.yearRange;
      this.pickerTerm = current.term;
    } else {
      this.pickerYear = this.catalog[0].yearRange;
      this.pickerTerm = this.catalog[0].terms[0];
    }
    this.showSemesterPicker = true;
  }

  private getTermsForPickerYear(): number[] {
    for (let i = 0; i < this.catalog.length; i++) {
      if (this.catalog[i].yearRange === this.pickerYear) {
        return this.catalog[i].terms;
      }
    }
    return [];
  }

  private isTermAvailable(term: number): boolean {
    return this.getTermsForPickerYear().indexOf(term) >= 0;
  }

  private confirmSemesterSwitch(): void {
    if (!this.isTermAvailable(this.pickerTerm)) {
      return;
    }
    const key = ScheduleSemesterUtil.buildKey(this.pickerYear, this.pickerTerm);
    if (ScheduleStore.switchTo(key)) {
      this.viewWeekNum = this.anchorWeek > 0 ? this.anchorWeek : 1;
      this.refreshData();
      this.showSemesterPicker = false;
    }
  }

  private onPickerYearSelect(year: string): void {
    this.pickerYear = year;
    const terms = this.getTermsForPickerYear();
    if (terms.indexOf(this.pickerTerm) < 0 && terms.length > 0) {
      this.pickerTerm = terms[0];
    }
  }

  private openDeletePicker(): void {
    this.showMenuPanel = false;
    this.catalog = ScheduleStore.getCatalog();
    if (this.catalog.length === 0) {
      return;
    }
    const current = ScheduleSemesterUtil.fromKey(this.currentScheduleKey);
    if (current) {
      this.deleteYear = current.yearRange;
      this.deleteTerm1Checked = current.term === 1;
      this.deleteTerm2Checked = current.term === 2;
    } else {
      this.deleteYear = this.catalog[0].yearRange;
      this.deleteTerm1Checked = false;
      this.deleteTerm2Checked = false;
    }
    this.resetDeleteChecksForYear();
    this.showDeletePicker = true;
  }

  private getDeleteTermsForYear(): number[] {
    for (let i = 0; i < this.catalog.length; i++) {
      if (this.catalog[i].yearRange === this.deleteYear) {
        return this.catalog[i].terms;
      }
    }
    return [];
  }

  private isDeleteTermAvailable(term: number): boolean {
    return this.getDeleteTermsForYear().indexOf(term) >= 0;
  }

  private onDeleteYearSelect(year: string): void {
    this.deleteYear = year;
    this.resetDeleteChecksForYear();
  }

  private resetDeleteChecksForYear(): void {
    if (!this.isDeleteTermAvailable(1)) {
      this.deleteTerm1Checked = false;
    }
    if (!this.isDeleteTermAvailable(2)) {
      this.deleteTerm2Checked = false;
    }
  }

  private getSelectedDeleteKeys(): string[] {
    const keys: string[] = [];
    if (this.deleteTerm1Checked && this.isDeleteTermAvailable(1)) {
      keys.push(ScheduleSemesterUtil.buildKey(this.deleteYear, 1));
    }
    if (this.deleteTerm2Checked && this.isDeleteTermAvailable(2)) {
      keys.push(ScheduleSemesterUtil.buildKey(this.deleteYear, 2));
    }
    return keys;
  }

  private getSelectedDeleteLabels(): string[] {
    const labels: string[] = [];
    const keys = this.getSelectedDeleteKeys();
    for (let i = 0; i < keys.length; i++) {
      const meta = ScheduleSemesterUtil.fromKey(keys[i]);
      if (meta) {
        labels.push(meta.displayLabel);
      }
    }
    return labels;
  }

  private requestDelete(): void {
    const keys = this.getSelectedDeleteKeys();
    if (keys.length === 0) {
      this.showToastOnce('请勾选要删除的学期');
      return;
    }
    const labels = this.getSelectedDeleteLabels();
    this.pendingDeleteKeys = keys;
    this.deleteConfirmText = `确定删除以下课表吗？\n${labels.join('、')}`;
    this.showDeletePicker = false;
    this.showDeleteConfirm = true;
  }

  private confirmDelete(): void {
    const count = ScheduleStore.deleteSchedules(this.pendingDeleteKeys);
    this.showDeleteConfirm = false;
    this.pendingDeleteKeys = [];
    if (count > 0) {
      this.viewWeekNum = this.anchorWeek > 0 ? this.anchorWeek : 1;
      this.refreshData();
      this.showToastOnce(`已删除 ${count} 个学期课表`);
    } else {
      this.showToastOnce('删除失败，请重试');
    }
  }

  private async importSchedule(): Promise<void> {
    this.showMenuPanel = false;
    try {
      this.isImporting = true;
      const documentPicker = new picker.DocumentViewPicker();
      const uris = await documentPicker.select({
        maxSelectNumber: 1,
        fileSuffixFilters: ['.xls', '.XLS', '.xlsx', '.XLSX', '.html', '.HTML', '.htm', '.HTM'],
      });
      if (uris && uris.length > 0) {
        const schedule = await ScheduleStore.importFromUri(uris[0]);
        const meta = ScheduleSemesterUtil.parse(schedule.semester);
        this.viewWeekNum = this.anchorWeek > 0 ? this.anchorWeek : 1;
        this.refreshData();
        this.showToastOnce(meta ? `${meta.displayLabel} 课表导入成功` : '课表导入成功');
      }
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : '';
      this.showToastOnce(errMsg.length > 0 ? errMsg : '导入失败，请确认文件格式正确');
      console.error('importSchedule failed: ' + JSON.stringify(e));
    } finally {
      this.isImporting = false;
    }
  }

  private isCoveredBySpan(day: number, period: number): boolean {
    return this.scheduleCells.some((c: ScheduleCell) =>
      c.dayOfWeek === day && c.startPeriod < period && c.endPeriod >= period
    );
  }

  private getCellAt(day: number, period: number): ScheduleCell | null {
    const matched = this.scheduleCells.find((c: ScheduleCell) =>
      c.dayOfWeek === day && c.startPeriod === period
    );
    return matched !== undefined ? matched : null;
  }

  private showToastOnce(msg: string): void {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 2000);
  }

  build() {
    Stack({ alignContent: Alignment.BottomEnd }) {
      Column() {
        if (this.isLoading) {
          LoadingPlaceholder()
        } else if (ScheduleStore.getScheduleCount() === 0) {
          this.buildEmptyState()
        } else {
          this.buildScheduleHeader()
          this.buildDayHeaderRow()
          Scroll() {
            this.buildScheduleBody()
          }
          .width('100%')
          .layoutWeight(1)
          .scrollBar(BarState.Off)
          .edgeEffect(EdgeEffect.Spring)
        }
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#FAFBFC')

      if (!this.isLoading && ScheduleStore.getScheduleCount() > 0 && !this.isViewingCurrentWeek()) {
        this.buildReturnFab()
      }

      if (this.showWeekPicker) {
        this.buildWeekPicker()
      }
      if (this.showSemesterPicker) {
        this.buildSemesterPicker()
      }
      if (this.showMenuPanel) {
        this.buildMenuPanel()
      }
      if (this.showDeletePicker) {
        this.buildDeletePicker()
      }
      if (this.showDeleteConfirm) {
        ConfirmDialog({
          title: '删除课表',
          content: this.deleteConfirmText,
          visible: $showDeleteConfirm,
          confirmText: '删除',
          cancelText: '取消',
          onConfirm: () => this.confirmDelete(),
        })
      }
      if (this.showDetail && this.detailCourse) {
        this.buildCourseDetailSheet()
      }
      if (this.showToast) {
        Text(this.toastMsg)
          .fontSize(13)
          .fontWeight(500)
          .fontColor('#FFFFFF')
          .padding({ left: 18, right: 18, top: 10, bottom: 10 })
          .borderRadius(999)
          .backgroundColor('rgba(15, 23, 42, 0.88)')
          .margin({ bottom: 90 })
      }
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  buildEmptyState(): void {
    Column() {
      EmptyPlaceholder({
        message: '暂无课表数据',
        subMessage: '请导入教务系统导出的 xls 课表文件',
        iconText: '📅'
      })
      Button(this.isImporting ? '导入中...' : '导入课表')
        .type(ButtonType.Normal)
        .fontSize(14)
        .fontWeight(600)
        .fontColor('#FFFFFF')
        .backgroundColor('#4A90E2')
        .borderRadius(22)
        .padding({ left: 28, right: 28, top: 10, bottom: 10 })
        .margin({ top: 20 })
        .enabled(!this.isImporting)
        .onClick(() => this.importSchedule())
    }
    .width('100%')
    .layoutWeight(1)
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  buildScheduleHeader(): void {
    Row() {
      if (!this.embedded) {
        Text('‹')
          .fontSize(28)
          .fontColor('#333333')
          .width(44)
          .height(44)
          .textAlign(TextAlign.Center)
          .onClick(() => router.back())
      } else {
        Row().width(44).height(44)
      }

      Column() {
        Row() {
          Text(`第${this.viewWeekNum}周`)
            .fontSize(17)
            .fontWeight(FontWeight.Bold)
            .fontColor('#1A1A1A')
          Text('▾')
            .fontSize(12)
            .fontColor('#999999')
            .margin({ left: 4, top: 2 })
        }
        .justifyContent(FlexAlign.Center)

        Text(this.isViewingCurrentWeek() ? '本周' : '非本周')
          .fontSize(11)
          .fontColor('#AAAAAA')
          .margin({ top: 2 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Center)
      .onClick(() => { this.showWeekPicker = true; })

      Text('☰')
        .fontSize(20)
        .fontColor('#333333')
        .width(44)
        .height(44)
        .textAlign(TextAlign.Center)
        .onClick(() => { this.showMenuPanel = true; })
    }
    .width('100%')
    .height(52)
    .padding({ left: 4, right: 4 })
    .backgroundColor('#FFFFFF')
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  buildDayHeaderRow(): void {
    Row() {
      Column().width(TIME_COL_WIDTH)

      ForEach(this.weekHeaders, (header: string, index: number) => {
        Column() {
          Text(header)
            .fontSize(12)
            .fontColor(index + 1 === this.todayDayOfWeek && this.isViewingCurrentWeek() ? '#4A90E2' : '#666666')
            .fontWeight(index + 1 === this.todayDayOfWeek && this.isViewingCurrentWeek() ? FontWeight.Bold : FontWeight.Normal)
          Text(this.weekDateLabels[index] || '')
            .fontSize(10)
            .fontColor(index + 1 === this.todayDayOfWeek && this.isViewingCurrentWeek() ? '#4A90E2' : '#AAAAAA')
            .margin({ top: 2 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Center)
        .padding({ top: 8, bottom: 8 })
      })
    }
    .width('100%')
    .backgroundColor('#FFFFFF')
    .borderWidth({ bottom: 0.5 })
    .borderColor('#EEEEEE')
  }

  @Builder
  buildScheduleBody(): void {
    Column() {
      ForEach(this.periodRange, (period: number) => {
        Row() {
          Column() {
            Text(String(period))
              .fontSize(11)
              .fontWeight(FontWeight.Medium)
              .fontColor('#888888')
            Text(getPeriodTimeSlot(period))
              .fontSize(8)
              .fontColor('#BBBBBB')
              .margin({ top: 2 })
              .maxLines(2)
              .textAlign(TextAlign.Center)
          }
          .width(TIME_COL_WIDTH)
          .height(PERIOD_ROW_HEIGHT)
          .justifyContent(FlexAlign.Center)
          .padding({ left: 2, right: 2 })

          ForEach([1, 2, 3, 4, 5, 6, 7], (day: number) => {
            ScheduleGridCell({
              cell: this.getCellAt(day, period),
              isCovered: this.isCoveredBySpan(day, period),
              rowHeight: PERIOD_ROW_HEIGHT,
              cellGap: CELL_GAP,
              colorStyle: this.getCellColorStyle(day, period),
              onCellTap: (cell: ScheduleCell) => {
                this.detailCourse = cell;
                this.showDetail = true;
              }
            })
          })
        }
        .width('100%')
        .height(PERIOD_ROW_HEIGHT)
        .clip(false)
      })
      Column().height(80)
    }
    .width('100%')
    .backgroundColor('#FAFBFC')
    .clip(false)
  }

  private getCellColorStyle(day: number, period: number): CourseColorStyle {
    const cell = this.getCellAt(day, period);
    if (cell) {
      return this.getCourseColor(cell.courseCode);
    }
    return COURSE_COLORS[0];
  }

  @Builder
  buildReturnFab(): void {
    Row() {
      Text('↩')
        .fontSize(14)
        .fontColor('#FFFFFF')
        .margin({ right: 4 })
      Text('返回本周')
        .fontSize(13)
        .fontColor('#FFFFFF')
        .fontWeight(FontWeight.Medium)
    }
    .padding({ left: 16, right: 16, top: 10, bottom: 10 })
    .backgroundColor('#4A90E2')
    .borderRadius(22)
    .shadow({ radius: 8, color: 'rgba(74, 144, 226, 0.35)', offsetY: 4 })
    .margin({ right: 16, bottom: this.embedded ? 16 : 24 })
    .onClick(() => this.returnToCurrentWeek())
  }

  @Builder
  buildWeekPicker(): void {
    Column() {
      Column()
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('rgba(0, 0, 0, 0.35)')
        .onClick(() => { this.showWeekPicker = false; })

      Column() {
        Row() {
          Text('选择教学周')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#1A1A1A')
          Blank()
          Text('✕')
            .fontSize(18)
            .fontColor('#999999')
            .onClick(() => { this.showWeekPicker = false; })
        }
        .width('100%')
        .margin({ bottom: 16 })

        Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start }) {
          ForEach(this.getWeekPickerOptions(), (week: number) => {
            Text(`第${week}周`)
              .fontSize(13)
              .fontColor(this.viewWeekNum === week ? '#FFFFFF' : '#333333')
              .backgroundColor(this.viewWeekNum === week ? '#4A90E2' : '#F5F5F5')
              .borderRadius(8)
              .padding({ left: 14, right: 14, top: 10, bottom: 10 })
              .margin({ right: 8, bottom: 8 })
              .onClick(() => this.switchToWeek(week))
          })
        }
        .width('100%')
      }
      .width('100%')
      .padding(20)
      .backgroundColor('#FFFFFF')
      .borderRadius({ topLeft: 16, topRight: 16 })
    }
    .width('100%')
    .height('100%')
    .position({ x: 0, y: 0 })
    .zIndex(55)
  }

  @Builder
  buildMenuPanel(): void {
    Column() {
      Column()
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('rgba(0, 0, 0, 0.35)')
        .onClick(() => { this.showMenuPanel = false; })

      Column() {
        Text(this.currentSemester || '未选择学期')
          .fontSize(13)
          .fontColor('#888888')
          .width('100%')
          .margin({ bottom: 12 })

        Row() {
          Text('切换学期')
            .fontSize(15)
            .fontColor('#1A1A1A')
            .layoutWeight(1)
          Text('›')
            .fontSize(18)
            .fontColor('#CCCCCC')
        }
        .width('100%')
        .padding({ top: 14, bottom: 14 })
        .borderWidth({ bottom: 0.5 })
        .borderColor('#F0F0F0')
        .onClick(() => this.openSemesterPicker())

        Row() {
          Text(this.isImporting ? '导入中...' : '导入课表')
            .fontSize(15)
            .fontColor('#1A1A1A')
            .layoutWeight(1)
          Text('›')
            .fontSize(18)
            .fontColor('#CCCCCC')
        }
        .width('100%')
        .padding({ top: 14, bottom: 14 })
        .borderWidth({ bottom: 0.5 })
        .borderColor('#F0F0F0')
        .enabled(!this.isImporting)
        .onClick(() => this.importSchedule())

        Row() {
          Text('删除课表')
            .fontSize(15)
            .fontColor('#E53935')
            .layoutWeight(1)
          Text('›')
            .fontSize(18)
            .fontColor('#CCCCCC')
        }
        .width('100%')
        .padding({ top: 14, bottom: 14 })
        .enabled(ScheduleStore.getCatalog().length > 0)
        .onClick(() => this.openDeletePicker())
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 16, bottom: 24 })
      .backgroundColor('#FFFFFF')
      .borderRadius({ topLeft: 16, topRight: 16 })
    }
    .width('100%')
    .height('100%')
    .position({ x: 0, y: 0 })
    .zIndex(58)
  }

  @Builder
  buildSemesterPicker(): void {
    Column() {
      Column()
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('rgba(0, 0, 0, 0.35)')
        .onClick(() => { this.showSemesterPicker = false; })

      Column() {
        Row() {
          Text('选择学年学期')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#1A1A1A')
          Blank()
          Text('✕')
            .fontSize(18)
            .fontColor('#999999')
            .onClick(() => { this.showSemesterPicker = false; })
        }
        .width('100%')
        .margin({ bottom: 16 })

        Row() {
          Column() {
            Text('学年')
              .fontSize(12)
              .fontColor('#888888')
              .margin({ bottom: 10 })
              .width('100%')

            Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start }) {
              ForEach(this.catalog, (group: YearSemesterGroup) => {
                Text(group.yearRange)
                  .fontSize(13)
                  .fontWeight(this.pickerYear === group.yearRange ? FontWeight.Bold : FontWeight.Normal)
                  .fontColor(this.pickerYear === group.yearRange ? '#E53935' : '#333333')
                  .backgroundColor(this.pickerYear === group.yearRange ? '#F5F5F5' : '#FFFFFF')
                  .borderRadius(6)
                  .borderWidth(1)
                  .borderColor(this.pickerYear === group.yearRange ? '#DDDDDD' : '#EEEEEE')
                  .padding({ left: 14, right: 14, top: 10, bottom: 10 })
                  .margin({ right: 8, bottom: 8 })
                  .onClick(() => this.onPickerYearSelect(group.yearRange))
              })
            }
            .width('100%')
          }
          .layoutWeight(1)
          .alignItems(HorizontalAlign.Start)
          .padding({ right: 12 })

          Column()
            .width(1)
            .height(120)
            .backgroundColor('#EEEEEE')

          Column() {
            Text('学期')
              .fontSize(12)
              .fontColor('#888888')
              .margin({ bottom: 10 })
              .width('100%')

            Column() {
              this.buildTermOption(1)
              this.buildTermOption(2)
            }
            .width('100%')
          }
          .width(100)
          .alignItems(HorizontalAlign.Start)
          .padding({ left: 16 })
        }
        .width('100%')
        .alignItems(VerticalAlign.Top)

        Button('确定')
          .type(ButtonType.Normal)
          .width('100%')
          .height(44)
          .fontSize(15)
          .fontWeight(600)
          .fontColor('#FFFFFF')
          .backgroundColor('#4A90E2')
          .borderRadius(10)
          .margin({ top: 20 })
          .enabled(this.isTermAvailable(this.pickerTerm))
          .onClick(() => this.confirmSemesterSwitch())
      }
      .width('100%')
      .padding(20)
      .backgroundColor('#FFFFFF')
      .borderRadius({ topLeft: 16, topRight: 16 })
    }
    .width('100%')
    .height('100%')
    .position({ x: 0, y: 0 })
    .zIndex(60)
  }

  @Builder
  buildTermOption(term: number): void {
    if (this.isTermAvailable(term)) {
      Text(`学期${term}`)
        .fontSize(14)
        .fontWeight(this.pickerTerm === term ? FontWeight.Bold : FontWeight.Normal)
        .fontColor(this.pickerTerm === term ? '#E53935' : '#333333')
        .backgroundColor(this.pickerTerm === term ? '#F5F5F5' : '#FFFFFF')
        .borderRadius(6)
        .borderWidth(1)
        .borderColor(this.pickerTerm === term ? '#DDDDDD' : '#EEEEEE')
        .padding({ left: 16, right: 16, top: 12, bottom: 12 })
        .margin({ bottom: 10 })
        .width('100%')
        .textAlign(TextAlign.Center)
        .onClick(() => { this.pickerTerm = term; })
    }
  }

  @Builder
  buildDeletePicker(): void {
    Column() {
      Column()
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('rgba(0, 0, 0, 0.35)')
        .onClick(() => { this.showDeletePicker = false; })

      Column() {
        Row() {
          Text('删除课表')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#1A1A1A')
          Blank()
          Text('✕')
            .fontSize(18)
            .fontColor('#999999')
            .onClick(() => { this.showDeletePicker = false; })
        }
        .width('100%')
        .margin({ bottom: 8 })

        Text('勾选要删除的学年学期，仅显示已导入的课表')
          .fontSize(12)
          .fontColor('#888888')
          .width('100%')
          .margin({ bottom: 16 })

        Row() {
          Column() {
            Text('学年')
              .fontSize(12)
              .fontColor('#888888')
              .margin({ bottom: 10 })
              .width('100%')

            Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start }) {
              ForEach(this.catalog, (group: YearSemesterGroup) => {
                Text(group.yearRange)
                  .fontSize(13)
                  .fontWeight(this.deleteYear === group.yearRange ? FontWeight.Bold : FontWeight.Normal)
                  .fontColor(this.deleteYear === group.yearRange ? '#E53935' : '#333333')
                  .backgroundColor(this.deleteYear === group.yearRange ? '#F5F5F5' : '#FFFFFF')
                  .borderRadius(6)
                  .borderWidth(1)
                  .borderColor(this.deleteYear === group.yearRange ? '#DDDDDD' : '#EEEEEE')
                  .padding({ left: 14, right: 14, top: 10, bottom: 10 })
                  .margin({ right: 8, bottom: 8 })
                  .onClick(() => this.onDeleteYearSelect(group.yearRange))
              })
            }
            .width('100%')
          }
          .layoutWeight(1)
          .alignItems(HorizontalAlign.Start)
          .padding({ right: 12 })

          Column()
            .width(1)
            .height(120)
            .backgroundColor('#EEEEEE')

          Column() {
            Text('学期')
              .fontSize(12)
              .fontColor('#888888')
              .margin({ bottom: 10 })
              .width('100%')

            Column() {
              this.buildDeleteTermCheckbox(1)
              this.buildDeleteTermCheckbox(2)
            }
            .width('100%')
          }
          .width(120)
          .alignItems(HorizontalAlign.Start)
          .padding({ left: 16 })
        }
        .width('100%')
        .alignItems(VerticalAlign.Top)

        Button('删除所选')
          .type(ButtonType.Normal)
          .width('100%')
          .height(44)
          .fontSize(15)
          .fontWeight(600)
          .fontColor('#FFFFFF')
          .backgroundColor('#E53935')
          .borderRadius(10)
          .margin({ top: 20 })
          .enabled(this.getSelectedDeleteKeys().length > 0)
          .onClick(() => this.requestDelete())
      }
      .width('100%')
      .padding(20)
      .backgroundColor('#FFFFFF')
      .borderRadius({ topLeft: 16, topRight: 16 })
    }
    .width('100%')
    .height('100%')
    .position({ x: 0, y: 0 })
    .zIndex(62)
  }

  @Builder
  buildDeleteTermCheckbox(term: number): void {
    if (this.isDeleteTermAvailable(term)) {
      Row() {
        Checkbox()
          .select(term === 1 ? this.deleteTerm1Checked : this.deleteTerm2Checked)
          .selectedColor('#E53935')
          .onChange((checked: boolean) => {
            if (term === 1) {
              this.deleteTerm1Checked = checked;
            } else {
              this.deleteTerm2Checked = checked;
            }
          })
        Text(`学期${term}`)
          .fontSize(14)
          .fontColor('#333333')
          .margin({ left: 8 })
      }
      .width('100%')
      .padding({ top: 10, bottom: 10 })
    }
  }

  @Builder
  buildCourseDetailSheet(): void {
    Column() {
      Column()
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('rgba(0, 0, 0, 0.4)')
        .onClick(() => { this.showDetail = false; })

      Column() {
        Row() {
          Text('课程详情').fontSize(17).fontWeight(FontWeight.Bold)
          Blank()
          Text('✕').fontSize(18).fontColor('#999999')
            .onClick(() => { this.showDetail = false; })
        }
        .width('100%')
        .margin({ bottom: 16 })

        if (this.detailCourse) {
          Column() {
            DetailRow({ label: '课程名称', value: this.detailCourse.courseName || '—' })
            DetailRow({ label: '课程序号', value: this.detailCourse.courseCode || '—' })
            DetailRow({ label: '授课教师', value: this.detailCourse.teacher || '—' })
            DetailRow({ label: '上课教室', value: this.detailCourse.classroom || '—' })
            DetailRow({ label: '上课周次', value: this.detailCourse.weekRange || '—' })
            DetailRow({ label: '节次', value: `${this.detailCourse.startPeriod}-${this.detailCourse.endPeriod}节` })
          }
          .width('100%')
        }
      }
      .width('100%')
      .padding(24)
      .backgroundColor('#FFFFFF')
      .borderRadius({ topLeft: 18, topRight: 18 })
    }
    .width('100%')
    .height('100%')
    .position({ x: 0, y: 0 })
    .zIndex(50)
  }
}

@Component
struct ScheduleGridCell {
  @Prop cell: ScheduleCell | null = null;
  @Prop isCovered: boolean = false;
  @Prop rowHeight: number = 56;
  @Prop cellGap: number = 2;
  @Prop colorStyle: CourseColorStyle = { bg: '#E8F4FD', text: '#1976D2' };
  onCellTap?: (cell: ScheduleCell) => void;

  private getCardHeight(): number {
    if (!this.cell) {
      return 0;
    }
    return this.rowHeight * this.cell.span - this.cellGap * 2;
  }

  build() {
    Stack({ alignContent: Alignment.TopStart }) {
      if (this.cell) {
        Column() {
          Text(this.cell.courseName)
            .fontSize(10)
            .fontWeight(FontWeight.Bold)
            .fontColor(this.colorStyle.text)
            .maxLines(this.cell.span >= 2 ? 5 : 2)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
            .textAlign(TextAlign.Center)
            .width('100%')
          if (this.cell.classroom && this.cell.classroom.length > 0) {
            Text(`@${this.cell.classroom}`)
              .fontSize(8)
              .fontColor(this.colorStyle.text)
              .opacity(0.75)
              .maxLines(this.cell.span >= 2 ? 2 : 1)
              .textOverflow({ overflow: TextOverflow.Ellipsis })
              .textAlign(TextAlign.Center)
              .width('100%')
              .margin({ top: 2 })
          }
        }
        .width('100%')
        .height(this.getCardHeight())
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
        .padding({ left: 4, right: 4, top: 4, bottom: 4 })
        .backgroundColor(this.colorStyle.bg)
        .borderRadius(8)
        .margin(this.cellGap)
        .zIndex(10)
        .onClick(() => {
          if (this.onCellTap) {
            this.onCellTap(this.cell!);
          }
        })
      }
    }
    .layoutWeight(1)
    .height(this.rowHeight)
    .backgroundColor(this.isCovered ? 'transparent' : '#FAFBFC')
    .borderWidth({ right: 0.5, bottom: this.isCovered ? 0 : 0.5 })
    .borderColor('#EEEEEE')
    .clip(false)
  }
}

@Component
struct DetailRow {
  @Prop label: string = '';
  @Prop value: string = '';

  build() {
    Row() {
      Text(this.label).fontSize(13).fontColor('#888888').width(80)
      Text(this.value).fontSize(13).fontColor('#1A1A1A').layoutWeight(1)
    }
    .width('100%')
    .padding({ top: 10, bottom: 10 })
    .borderWidth({ bottom: 0.5 })
    .borderColor('#F0F0F0')
  }
}
