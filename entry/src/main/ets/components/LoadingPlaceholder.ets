/**
 * 加载占位组件
 * 用于页面/列表数据加载中的兜底状态
 */
@Component
export struct LoadingPlaceholder {
  /** 提示文字 */
  @Prop message: string = '加载中...';
  /** 是否全屏居中 */
  @Prop fullScreen: boolean = true;

  build() {
    Column() {
      // 旋转动画指示器
      LoadingProgress()
        .width(36)
        .height(36)
        .color('#2563EB')

      Text(this.message)
        .fontSize(14)
        .fontColor('#64748B')
        .margin({ top: 12 })
    }
    .width('100%')
    .height(this.fullScreen ? '60%' : 'auto')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .padding({ top: this.fullScreen ? 60 : 24, bottom: 24 })
  }
}

/**
 * 列表加载更多占位（底部加载指示器）
 */
@Component
export struct LoadMoreIndicator {
  @Prop hasMore: boolean = true;
  @Prop loadingText: string = '加载中...';
  @Prop noMoreText: string = '— 没有更多了 —';

  build() {
    Row() {
      if (this.hasMore) {
        LoadingProgress()
          .width(16)
          .height(16)
          .color('#2563EB')
        Text(this.loadingText)
          .fontSize(12)
          .fontColor('#64748B')
          .margin({ left: 8 })
      } else {
        Text(this.noMoreText)
          .fontSize(12)
          .fontColor('#94A3B8')
      }
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
    .padding({ top: 16, bottom: 16 })
  }
}
