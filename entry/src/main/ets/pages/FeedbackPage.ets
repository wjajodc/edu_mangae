/**
 * 意见反馈页面
 * 反馈类型选择、标题输入、正文、提交
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { CommonButton } from '../components/CommonButton';

@Entry
@Component
struct FeedbackPage {
  @State feedbackType: string = '功能建议';
  @State title: string = '';
  @State content: string = '';
  @State titleError: string = '';
  @State contentError: string = '';
  @State isSubmitting: boolean = false;
  @State toastMsg: string = '';
  @State showToast: boolean = false;

  private types: string[] = ['功能建议', 'Bug反馈', '使用问题', '其他'];

  build() {
    Stack() {
      Column() {
        TopBar({ title: '意见反馈', showBack: true, onBack: () => router.back() })

        Scroll() {
          Column() {
            // 反馈类型
            Text('反馈类型').fontSize(13).fontWeight(600).fontColor('#0F172A')
              .width('100%').margin({ bottom: 8 })

            Row() {
              ForEach(this.types, (t: string) => {
                Text(t)
                  .fontSize(12).fontWeight(600)
                  .fontColor(this.feedbackType === t ? '#FFFFFF' : '#64748B')
                  .backgroundColor(this.feedbackType === t ? '#2563EB' : '#F1F5F9')
                  .borderRadius(8)
                  .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                  .margin({ right: 8 })
                  .onClick(() => { this.feedbackType = t; })
              })
            }
            .width('100%').margin({ bottom: 20 })

            // 标题
            Text('标题').fontSize(13).fontWeight(600).fontColor('#0F172A')
              .width('100%').margin({ bottom: 6 })
            TextInput({ text: this.title, placeholder: '请输入反馈标题（必填）' })
              .fontSize(14).height(46).width('100%')
              .backgroundColor('#F8FAFC').borderRadius(10)
              .borderWidth(1).borderColor(this.titleError ? '#DC2626' : '#E2E8F0')
              .padding({ left: 14 })
              .onChange((val: string) => { this.title = val; this.titleError = ''; })
            if (this.titleError) {
              Text(this.titleError).fontSize(11).fontColor('#DC2626').margin({ top: 4 })
            }

            // 正文
            Text('详细描述').fontSize(13).fontWeight(600).fontColor('#0F172A')
              .width('100%').margin({ top: 18, bottom: 6 })
            TextArea({ text: this.content, placeholder: '请详细描述您的问题或建议（必填）' })
              .fontSize(14).width('100%').height(140)
              .backgroundColor('#F8FAFC').borderRadius(10)
              .borderWidth(1).borderColor(this.contentError ? '#DC2626' : '#E2E8F0')
              .padding({ left: 14, top: 12 })
              .onChange((val: string) => { this.content = val; this.contentError = ''; })
            if (this.contentError) {
              Text(this.contentError).fontSize(11).fontColor('#DC2626').margin({ top: 4 })
            }

            // 提交
            CommonButton({
              label: this.isSubmitting ? '提交中...' : '提交反馈',
              block: true, disabled: this.isSubmitting, loading: this.isSubmitting,
              onTap: () => this.handleSubmit()
            })

            Column().height(24)
          }
          .width('100%').padding({ left: 14, right: 14, top: 18 })
        }
        .width('100%').layoutWeight(1).scrollBar(BarState.Off)
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

  private handleSubmit(): void {
    if (!this.title.trim()) { this.titleError = '请输入标题'; return; }
    if (!this.content.trim()) { this.contentError = '请输入详细描述'; return; }

    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.showToastOnce('反馈提交成功，感谢您的意见！');
      setTimeout(() => router.back(), 600);
    }, 800);
  }

  private showToastOnce(msg: string): void {
    this.toastMsg = msg; this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 2000);
  }
}
