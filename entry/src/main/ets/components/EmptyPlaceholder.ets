/**
 * 空数据组件
 * 用于列表/页面无数据时的兜底状态展示
 */
@Component
export struct EmptyPlaceholder {
  /** 提示文字 */
  @Prop message: string = '暂无数据';
  /** 副提示文字 */
  @Prop subMessage: string = '';
  /** 是否显示操作按钮 */
  @Prop showAction: boolean = false;
  /** 操作按钮文字 */
  @Prop actionText: string = '刷新';
  /** 图标文字 */
  @Prop iconText: string = '📭';

  /** 操作按钮点击回调 */
  onAction?: () => void;

  build() {
    Column() {
      // 图标
      Text(this.iconText)
        .fontSize(48)
        .margin({ bottom: 16 })

      // 主提示
      Text(this.message)
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor('#0F172A')
        .margin({ bottom: 6 })

      // 副提示
      if (this.subMessage && this.subMessage.length > 0) {
        Text(this.subMessage)
          .fontSize(13)
          .fontColor('#64748B')
          .textAlign(TextAlign.Center)
          .maxLines(2)
      }

      // 操作按钮
      if (this.showAction) {
        Button(this.actionText)
          .type(ButtonType.Normal)
          .backgroundColor('#2563EB')
          .fontColor(Color.White)
          .fontSize(14)
          .fontWeight(600)
          .borderRadius(10)
          .padding({ left: 24, right: 24, top: 10, bottom: 10 })
          .margin({ top: 20 })
          .onClick(() => {
            if (this.onAction) {
              this.onAction();
            }
          })
      }
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .padding({ top: 80, bottom: 40, left: 24, right: 24 })
  }
}

/**
 * 异常错误组件
 * 用于网络错误/数据加载失败时的兜底状态
 */
@Component
export struct ErrorPlaceholder {
  /** 错误消息 */
  @Prop message: string = '加载失败，请检查网络后重试';
  /** 是否显示重试按钮 */
  @Prop showRetry: boolean = true;

  /** 重试回调 */
  onRetry?: () => void;

  build() {
    Column() {
      Text('⚠️')
        .fontSize(48)
        .margin({ bottom: 16 })

      Text('出错了')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor('#0F172A')
        .margin({ bottom: 6 })

      Text(this.message)
        .fontSize(13)
        .fontColor('#64748B')
        .textAlign(TextAlign.Center)
        .maxLines(3)
        .padding({ left: 24, right: 24 })

      if (this.showRetry) {
        Button('重试')
          .type(ButtonType.Normal)
          .backgroundColor('#FFFFFF')
          .fontColor('#2563EB')
          .fontSize(14)
          .fontWeight(600)
          .borderWidth(1)
          .borderColor('#E2E8F0')
          .borderRadius(10)
          .padding({ left: 28, right: 28, top: 10, bottom: 10 })
          .margin({ top: 20 })
          .onClick(() => {
            if (this.onRetry) {
              this.onRetry();
            }
          })
      }
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .padding({ top: 80, bottom: 40 })
  }
}
