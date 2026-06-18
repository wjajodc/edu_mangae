/**
 * 通用按钮组件
 * 支持多种样式变体：primary（主按钮）、ghost（描边按钮）、block（全宽按钮）、small（小尺寸）
 * 对标 styles.css 中的 .btn 系列样式
 */
@Component
export struct CommonButton {
  /** 按钮文字 */
  @Prop label: string = '按钮';
  /** 按钮样式变体 */
  @Prop variant: string = 'primary'; // primary | ghost | danger | block-primary | block-ghost
  /** 是否小尺寸 */
  @Prop small: boolean = false;
  /** 是否禁用 */
  @Prop disabled: boolean = false;
  /** 是否全宽 */
  @Prop block: boolean = true;
  /** 是否显示加载状态 */
  @Prop loading: boolean = false;
  /** 顶部外边距 */
  @Prop marginTop: number = 0;

  /** 点击回调 */
  onTap?: () => void;

  build() {
    Button() {
      if (this.loading) {
        Row() {
          LoadingProgress()
            .width(16)
            .height(16)
            .color(this.getTextColor())
          Text(' 处理中...')
            .fontSize(this.small ? 13 : 15)
            .fontWeight(600)
            .fontColor(this.getTextColor())
        }
        .justifyContent(FlexAlign.Center)
      } else {
        Text(this.label)
          .fontSize(this.small ? 13 : 15)
          .fontWeight(600)
          .fontColor(this.getTextColor())
      }
    }
    .type(ButtonType.Normal)
    .backgroundColor(this.getBgColor())
    .borderRadius(10)
    .borderWidth(this.variant === 'ghost' || this.variant === 'block-ghost' ? 1 : 0)
    .borderColor('#E2E8F0')
    .width(this.block ? '100%' : 'auto')
    .padding({
      left: this.small ? 14 : 18,
      right: this.small ? 14 : 18,
      top: this.small ? 8 : 12,
      bottom: this.small ? 8 : 12,
    })
    .margin({ top: this.marginTop > 0 ? this.marginTop : (this.block ? 8 : 0) })
    .enabled(!this.disabled && !this.loading)
    .opacity(this.disabled ? 0.5 : 1.0)
    .onClick(() => {
      if (!this.disabled && !this.loading && this.onTap) {
        this.onTap();
      }
    })
  }

  /** 获取背景色 */
  private getBgColor(): string | Color {
    switch (this.variant) {
      case 'ghost':
      case 'block-ghost':
        return '#FFFFFF';
      case 'danger':
        return '#DC2626';
      default:
        return '#2563EB'; // primary / block-primary
    }
  }

  /** 获取文字色 */
  private getTextColor(): string | Color {
    switch (this.variant) {
      case 'ghost':
      case 'block-ghost':
        return '#2563EB';
      case 'danger':
        return '#FFFFFF';
      default:
        return '#FFFFFF'; // primary / block-primary
    }
  }
}
