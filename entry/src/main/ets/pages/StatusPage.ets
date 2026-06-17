/**
 * 学籍信息页面
 * 对应需求 4.23，对标 HTML 学籍原型
 * 三个 Tab 切换：学籍信息、资料申请修改、联系信息
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { LoadingPlaceholder } from '../components/LoadingPlaceholder';
import { MOCK_STATUS, STATUS_FIELDS, MOCK_STUDENT } from '../mock/MockData';
import { StudentStatus } from '../model/CommonModel';

@Entry
@Component
struct StatusPage {
  @State activeTab: number = 0;
  @State statusData: StudentStatus = MOCK_STATUS;
  @State isLoading: boolean = true;

  private tabs: string[] = ['学籍信息', '资料修改', '联系信息'];

  aboutToAppear(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    this.isLoading = true;
    await new Promise<void>((r) => setTimeout(r, 300));
    this.statusData = MOCK_STATUS;
    this.isLoading = false;
  }

  build() {
    Column() {
      TopBar({ title: '学籍信息', showBack: true, onBack: () => router.back() })

      if (this.isLoading) {
        LoadingPlaceholder()
      } else {
        // Tab 切换
        Row() {
          ForEach(this.tabs, (tab: string, idx: number) => {
            Text(tab)
              .fontSize(14)
              .fontWeight(this.activeTab === idx ? 700 : 400)
              .fontColor(this.activeTab === idx ? '#2563EB' : '#64748B')
              .layoutWeight(1)
              .textAlign(TextAlign.Center)
              .padding({ top: 12, bottom: 12 })
              .borderWidth({ bottom: this.activeTab === idx ? 2 : 0 })
              .borderColor('#2563EB')
              .onClick(() => { this.activeTab = idx; })
          })
        }
        .width('100%')
        .backgroundColor('#FFFFFF')

        // 内容区域
        if (this.activeTab === 0) {
          this.buildStatusInfo()
        } else if (this.activeTab === 1) {
          this.buildDocumentChange()
        } else {
          this.buildContactInfo()
        }
      }
    }
    .width('100%').height('100%').backgroundColor('#EEF2F8')
  }

  /**
   * 学籍信息 Tab
   * 只读展示所有学籍字段，DL 网格布局
   */
  @Builder
  buildStatusInfo(): void {
    Scroll() {
      Column() {
        Column() {
          ForEach(STATUS_FIELDS, (field: string, idx: number) => {
            Row() {
              Text(field)
                .fontSize(13).fontColor('#64748B').width(80)
              Text(this.getFieldValue(field))
                .fontSize(13).fontWeight(FontWeight.Medium).fontColor('#0F172A')
                .layoutWeight(1)
            }
            .width('100%')
            .padding({ top: 12, bottom: 12 })
            .borderWidth({ bottom: idx < STATUS_FIELDS.length - 1 ? 0.5 : 0 })
            .borderColor('#E2E8F0')
          })
        }
        .width('100%')
        .padding({ left: 16, right: 16 })
        .backgroundColor('#FFFFFF')
        .borderRadius(12)
        .margin({ top: 14, left: 14, right: 14 })

        Column().height(24)
      }
      .width('100%')
    }
    .width('100%').layoutWeight(1).scrollBar(BarState.Off)
  }

  /**
   * 资料申请修改 Tab（占位）
   */
  @Builder
  buildDocumentChange(): void {
    Column() {
      Text('资料申请修改')
        .fontSize(16).fontWeight(FontWeight.Medium).margin({ bottom: 12 })
      Text('资料修改功能开发中，如需修改学籍资料，请联系教务处。')
        .fontSize(13).fontColor('#64748B').textAlign(TextAlign.Center)
        .padding({ left: 24, right: 24 })
    }
    .width('100%').layoutWeight(1)
    .justifyContent(FlexAlign.Center).alignItems(HorizontalAlign.Center)
  }

  /**
   * 联系信息 Tab（占位）
   */
  @Builder
  buildContactInfo(): void {
    Scroll() {
      Column() {
        Column() {
          Row() {
            Text('手机号').fontSize(13).fontColor('#64748B').width(80)
            Text(MOCK_STUDENT.phone).fontSize(13).fontWeight(500).fontColor('#0F172A').layoutWeight(1)
          }.width('100%').padding({ top: 14, bottom: 14 }).borderWidth({ bottom: 0.5 }).borderColor('#E2E8F0')

          Row() {
            Text('邮箱').fontSize(13).fontColor('#64748B').width(80)
            Text(MOCK_STUDENT.email).fontSize(13).fontWeight(500).fontColor('#0F172A').layoutWeight(1)
          }.width('100%').padding({ top: 14, bottom: 14 }).borderWidth({ bottom: 0.5 }).borderColor('#E2E8F0')

          Row() {
            Text('通讯地址').fontSize(13).fontColor('#64748B').width(80)
            Text(MOCK_STUDENT.address).fontSize(13).fontWeight(500).fontColor('#0F172A').layoutWeight(1)
          }.width('100%').padding({ top: 14, bottom: 14 })
        }
        .width('100%').padding({ left: 16, right: 16 })
        .backgroundColor('#FFFFFF').borderRadius(12)
        .margin({ top: 14, left: 14, right: 14 })

        Column().height(24)
      }
      .width('100%')
    }
    .width('100%').layoutWeight(1).scrollBar(BarState.Off)
  }

  /** 根据字段名获取对应的值 */
  private getFieldValue(field: string): string {
    if (field === '学号') {
      return this.statusData.studentId;
    }
    if (field === '姓名') {
      return this.statusData.name;
    }
    if (field === '性别') {
      return this.statusData.gender;
    }
    if (field === '院系') {
      return this.statusData.department;
    }
    if (field === '专业') {
      return this.statusData.major;
    }
    if (field === '班级') {
      return this.statusData.className;
    }
    if (field === '学籍状态') {
      return this.statusData.status;
    }
    if (field === '入校时间') {
      return this.statusData.enrollmentDate;
    }
    if (field === '预计毕业时间') {
      return this.statusData.expectedGraduation;
    }
    if (field === '培养层次') {
      return this.statusData.educationLevel;
    }
    if (field === '学制') {
      return this.statusData.schoolSystem;
    }
    return '—';
  }
}
