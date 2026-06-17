/**
 * 确认弹窗组件
 * 支持标题、内容、确认/取消按钮，通过 visible 控制显示
 * 替代 AlertDialog，样式对标 HTML 原型
 */
@Component
export struct ConfirmDialog {
  /** 弹窗标题 */
  @Prop title: string = '提示';
  /** 弹窗内容 */
  @Prop content: string = '';
  /** 是否显示 */
  @Link visible: boolean;
  /** 确认按钮文案 */
  @Prop confirmText: string = '确定';
  /** 取消按钮文案 */
  @Prop cancelText: string = '取消';
  /** 确认回调 */
  onConfirm?: () => void;
  /** 取消回调 */
  onCancel?: () => void;

  build() {
    if (this.visible) {
      Column() {
        // 遮罩层
        Column()
          .width('100%')
          .height('100%')
          .backgroundColor('rgba(15, 23, 42, 0.45)')
          .onClick(() => {
            this.visible = false;
            if (this.onCancel) {
              this.onCancel();
            }
          })

        // 弹窗卡片
        Column() {
          // 标题
          Text(this.title)
            .fontSize(17)
            .fontWeight(FontWeight.Bold)
            .fontColor('#0F172A')
            .textAlign(TextAlign.Center)
            .width('100%')
            .margin({ bottom: 12 })

          // 内容
          Text(this.content)
            .fontSize(14)
            .fontColor('#475569')
            .textAlign(TextAlign.Center)
            .width('100%')
            .margin({ bottom: 20 })

          // 操作按钮
          Row() {
            Button(this.cancelText)
              .type(ButtonType.Normal)
              .layoutWeight(1)
              .height(44)
              .fontSize(14)
              .fontWeight(FontWeight.Medium)
              .fontColor('#0F172A')
              .backgroundColor('#F1F5F9')
              .borderRadius(10)
              .onClick(() => {
                this.visible = false;
                if (this.onCancel) {
                  this.onCancel();
                }
              })

            Button(this.confirmText)
              .type(ButtonType.Normal)
              .layoutWeight(1)
              .height(44)
              .fontSize(14)
              .fontWeight(FontWeight.Medium)
              .fontColor('#FFFFFF')
              .backgroundColor('#2563EB')
              .borderRadius(10)
              .margin({ left: 12 })
              .onClick(() => {
                this.visible = false;
                if (this.onConfirm) {
                  this.onConfirm();
                }
              })
          }
          .width('100%')
        }
        .width('80%')
        .padding(24)
        .backgroundColor('#FFFFFF')
        .borderRadius(16)
        .position({ left: '10%', bottom: 180 })
      }
      .width('100%')
      .height('100%')
      .position({ x: 0, y: 0 })
      .zIndex(100)
    }
  }
}
