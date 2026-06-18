/**
 * 全局顶部导航栏组件
 * 支持标题、返回按钮、右侧操作按钮、透明毛玻璃效果
 */
@Component
export struct TopBar {
  /** 标题文字 */
  @Prop title: string = '教学管理系统';
  /** 是否显示返回按钮 */
  @Prop showBack: boolean = false;
  /** 右侧文字按钮（如"退出"） */
  @Prop rightText: string = '';
  /** 返回点击回调 */
  onBack?: () => void;
  /** 右侧按钮点击回调 */
  onRightClick?: () => void;

  build() {
    Row() {
      // 返回按钮区域
      if (this.showBack) {
        Button() {
          Text('←').fontSize(22).fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Normal)
        .backgroundColor(Color.Transparent)
        .width(40)
        .height(40)
        .borderRadius(10)
        .fontColor('#2563EB')
        .onClick(() => {
          if (this.onBack) {
            this.onBack();
          }
        })
      } else {
        // 占位保持标题居中
        Row().width(40).height(40)
      }

      // 标题
      Text(this.title)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#0F172A')
        .textAlign(TextAlign.Center)
        .layoutWeight(1)

      // 右侧按钮
      if (this.rightText && this.rightText.length > 0) {
        Button(this.rightText)
          .type(ButtonType.Normal)
          .backgroundColor(Color.Transparent)
          .fontSize(13)
          .fontWeight(600)
          .fontColor('#64748B')
          .padding({ left: 10, right: 10 })
          .width(56)
          .height(40)
          .borderRadius(10)
          .onClick(() => {
            if (this.onRightClick) {
              this.onRightClick();
            }
          })
      } else {
        Row().width(40).height(40)
      }
    }
    .width('100%')
    .height(56)
    .padding({ left: 14, right: 14 })
    .backgroundColor('rgba(255, 255, 255, 0.92)')
    .backdropBlur(10)
    .borderWidth({ bottom: 1 })
    .borderColor('#E2E8F0')
    .alignItems(VerticalAlign.Center)
  }
}
