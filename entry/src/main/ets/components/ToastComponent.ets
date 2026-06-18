/**
 * Toast 弹窗组件
 * 对标 styles.css 中的 .toast 样式
 * 底部居中、圆角胶囊、2.2秒自动消失
 */
@Component
export struct ToastComponent {
  /** Toast 消息文字 */
  @Prop message: string = '';
  /** 是否显示 */
  @Link show: boolean;

  build() {
    if (this.show) {
      Text(this.message)
        .fontSize(13)
        .fontWeight(500)
        .fontColor('#FFFFFF')
        .padding({ left: 18, right: 18, top: 10, bottom: 10 })
        .borderRadius(999)
        .backgroundColor('rgba(15, 23, 42, 0.88)')
        .maxLines(2)
        .textAlign(TextAlign.Center)
        .position({ bottom: 100, left: '50%' })
        .translate({ x: '-50%' })
        .zIndex(60)
        .transition({
          type: TransitionType.All,
          opacity: 1,
          translate: { y: 0 }
        })
    }
  }
}

/**
 * 确认弹窗组件
 * 对标原型二次确认弹窗样式
 */
@Component
export struct ConfirmDialog {
  /** 弹窗标题 */
  @Prop title: string = '提示';
  /** 弹窗内容 */
  @Prop content: string = '确定要执行此操作吗？';
  /** 确认按钮文字 */
  @Prop confirmText: string = '确定';
  /** 取消按钮文字 */
  @Prop cancelText: string = '取消';
  /** 是否显示 */
  @Link visible: boolean;

  /** 确认回调 */
  onConfirm?: () => void;
  /** 取消回调 */
  onCancel?: () => void;

  build() {
    if (this.visible) {
      Stack() {
        // 背景遮罩
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

        // 弹窗面板
        Column() {
          // 标题
          Text(this.title)
            .fontSize(17)
            .fontWeight(FontWeight.Bold)
            .fontColor('#0F172A')
            .margin({ bottom: 12 })

          // 内容
          Text(this.content)
            .fontSize(14)
            .fontColor('#64748B')
            .lineHeight(22)
            .textAlign(TextAlign.Center)
            .margin({ bottom: 20 })
            .maxLines(5)

          // 按钮行
          Row() {
            Button(this.cancelText)
              .type(ButtonType.Normal)
              .backgroundColor('#FFFFFF')
              .fontColor('#2563EB')
              .fontSize(14)
              .fontWeight(600)
              .borderRadius(10)
              .borderWidth(1)
              .borderColor('#E2E8F0')
              .layoutWeight(1)
              .height(44)
              .margin({ right: 8 })
              .onClick(() => {
                this.visible = false;
                if (this.onCancel) {
                  this.onCancel();
                }
              })

            Button(this.confirmText)
              .type(ButtonType.Normal)
              .backgroundColor('#2563EB')
              .fontColor(Color.White)
              .fontSize(14)
              .fontWeight(600)
              .borderRadius(10)
              .layoutWeight(1)
              .height(44)
              .onClick(() => {
                this.visible = false;
                if (this.onConfirm) {
                  this.onConfirm();
                }
              })
          }
          .width('100%')
        }
        .width('84%')
        .padding(24)
        .backgroundColor('#FFFFFF')
        .borderRadius(16)
      }
      .width('100%')
      .height('100%')
      .position({ x: 0, y: 0 })
      .zIndex(50)
    }
  }
}
