/**
 * 作业/实验模块（扩展功能）
 * 对应需求 4.14
 * 课程作业列表、状态（未提交/已提交/已批改）、作业详情与提交
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { CommonButton } from '../components/CommonButton';
import { MOCK_ASSIGNMENTS } from '../mock/MockData';
import { AssignmentItem } from '../model/CommonModel';

@Entry
@Component
struct AssignmentsPage {
  @State assignments: AssignmentItem[] = [];
  @State isLoading: boolean = true;
  @State activeFilter: string = '全部';
  @State showDetail: boolean = false;
  @State detailItem: AssignmentItem | null = null;
  @State submitContent: string = '';
  @State fileList: string[] = [];
  @State isSubmitting: boolean = false;
  @State toastMsg: string = '';
  @State showToast: boolean = false;

  private filters: string[] = ['全部', '未提交', '已提交', '已批改'];

  aboutToAppear(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    this.isLoading = true;
    await new Promise<void>((r) => setTimeout(r, 400));
    this.assignments = MOCK_ASSIGNMENTS.slice();
    this.isLoading = false;
  }

  /** 过滤作业列表 */
  private getFilteredList(): AssignmentItem[] {
    if (this.activeFilter === '全部') return this.assignments;
    return this.assignments.filter(a => a.status === this.activeFilter);
  }

  build() {
    Stack() {
      Column() {
        TopBar({ title: '作业/实验', showBack: true, onBack: () => router.back() })

        if (this.isLoading) {
          LoadingPlaceholder()
        } else {
          Column() {
            // 状态筛选
            Scroll() {
              Row() {
                ForEach(this.filters, (f: string) => {
                  Text(f)
                    .fontSize(12)
                    .fontWeight(600)
                    .fontColor(this.activeFilter === f ? '#FFFFFF' : '#2563EB')
                    .backgroundColor(this.activeFilter === f ? '#2563EB' : '#FFFFFF')
                    .borderRadius(8)
                    .borderWidth(1)
                    .borderColor('#2563EB')
                    .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                    .margin({ right: 8 })
                    .onClick(() => { this.activeFilter = f; })
                })
              }
            }
            .scrollable(ScrollDirection.Horizontal)
            .scrollBar(BarState.Off)
            .width('100%')
            .padding({ left: 14, top: 12, bottom: 8 })

            // 作业列表
            if (this.getFilteredList().length === 0) {
              EmptyPlaceholder({ message: '暂无作业', iconText: '📝' })
            } else {
              Scroll() {
                Column() {
                  ForEach(this.getFilteredList(), (item: AssignmentItem) => {
                    AssignmentCard({
                      item: item,
                      onTap: () => {
                        this.detailItem = item;
                        this.showDetail = true;
                      }
                    })
                  })
                  Column().height(16)
                }
                .width('100%')
                .padding({ left: 14, right: 14 })
              }
              .width('100%')
              .layoutWeight(1)
              .scrollBar(BarState.Off)
            }
          }
          .layoutWeight(1)
        }
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#EEF2F8')

      // 作业详情 + 提交弹窗
      if (this.showDetail && this.detailItem) {
        this.buildDetailSheet()
      }

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
  buildDetailSheet(): void {
    Column() {
      Column()
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('rgba(15, 23, 42, 0.45)')
        .onClick(() => { this.showDetail = false; })

      Column() {
        Row() {
          Text('作业详情')
            .fontSize(17)
            .fontWeight(FontWeight.Bold)
          Blank()
          Text('✕')
            .fontSize(18)
            .fontColor('#64748B')
            .onClick(() => { this.showDetail = false; })
        }
        .width('100%')
        .margin({ bottom: 16 })

        if (this.detailItem) {
          Column() {
            DetailRow({ label: '作业标题', value: this.detailItem.title })
            DetailRow({ label: '课程', value: this.detailItem.courseName })
            DetailRow({ label: '截止时间', value: this.detailItem.deadline })
            DetailRow({ label: '状态', value: this.detailItem.status })
            if (this.detailItem.score !== undefined && this.detailItem.score !== null) {
              DetailRow({ label: '得分', value: String(this.detailItem.score) })
            }
          }
          .width('100%')
          .margin({ bottom: 16 })

          // 提交区域（未提交/已提交未批改可重新提交）
          if (this.detailItem.status === '未提交' || this.detailItem.status === '已提交') {
            Text('提交内容').fontSize(13).fontWeight(600).fontColor('#0F172A').width('100%').margin({ bottom: 6 })
            TextArea({ placeholder: '输入作业内容或说明...', text: this.submitContent })
              .width('100%').height(100).fontSize(13)
              .backgroundColor('#F8FAFC').borderRadius(8).padding(10)
              .onChange((val: string) => { this.submitContent = val; })

            CommonButton({
              label: this.isSubmitting ? '提交中...' : '提交作业',
              block: true, marginTop: 16,
              disabled: this.isSubmitting, loading: this.isSubmitting,
              onTap: () => this.handleSubmitAssignment()
            })
          }
        }
      }
      .width('100%')
      .padding(24)
      .backgroundColor('#FFFFFF')
      .borderRadius({ topLeft: 18, topRight: 18 })
    }
    .width('100%').height('100%').position({ x: 0, y: 0 }).zIndex(50)
  }

  private handleSubmitAssignment(): void {
    if (!this.submitContent.trim()) {
      this.showToastOnce('请输入提交内容');
      return;
    }
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      if (this.detailItem) {
        this.detailItem.status = '已提交';
      }
      this.showToastOnce('作业提交成功');
      this.showDetail = false;
    }, 800);
  }

  private showToastOnce(msg: string): void {
    this.toastMsg = msg; this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 2000);
  }
}

/**
 * 作业卡片子组件
 */
@Component
struct AssignmentCard {
  @Prop item: AssignmentItem;
  onTap?: () => void;

  build() {
    Column() {
      Row() {
        Column() {
          Text(this.item.title)
            .fontSize(15).fontWeight(FontWeight.Medium).fontColor('#0F172A').maxLines(1)
          Text(`${this.item.courseName} · 截止 ${this.item.deadline}`)
            .fontSize(11).fontColor('#64748B').margin({ top: 2 })
        }
        .alignItems(HorizontalAlign.Start).layoutWeight(1)

        // 状态标签
        Text(this.item.status)
          .fontSize(11).fontWeight(600)
          .fontColor(this.getStatusColor())
          .padding({ left: 8, right: 8, top: 4, bottom: 4 })
          .borderRadius(6)
          .backgroundColor(this.getStatusBg())
      }
      .width('100%')
    }
    .width('100%').padding(14)
    .backgroundColor('#FFFFFF').borderRadius(12).margin({ bottom: 10 })
    .onClick(() => { if (this.onTap) this.onTap(); })
  }

  private getStatusColor(): string {
    if (this.item.status === '未提交') return '#DC2626';
    if (this.item.status === '已提交') return '#2563EB';
    return '#166534';
  }

  private getStatusBg(): string {
    if (this.item.status === '未提交') return '#FEF2F2';
    if (this.item.status === '已提交') return '#EFF6FF';
    return '#DCFCE7';
  }
}

@Component
struct DetailRow {
  @Prop label: string = '';
  @Prop value: string = '';

  build() {
    Row() {
      Text(this.label).fontSize(13).fontColor('#64748B').width(80)
      Text(this.value).fontSize(13).fontWeight(500).fontColor('#0F172A').layoutWeight(1)
    }
    .width('100%').padding({ top: 10, bottom: 10 })
    .borderWidth({ bottom: 0.5 }).borderColor('#E2E8F0')
  }
}
