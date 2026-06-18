/**
 * 通用列表卡片组件
 * 用于展示带标题、副标题、右侧箭头的列表项
 * 对标 styles.css 中的 .menu-item 样式
 */
@Component
export struct ListCard {
  /** 左侧标题 */
  @Prop title: string = '';
  /** 左侧副标题 */
  @Prop subtitle: string = '';
  /** 右侧标签文字 */
  @Prop tagText: string = '';
  /** 右侧标签颜色 */
  @Prop tagColor: string = '#166534';
  /** 是否显示右侧箭头 */
  @Prop showArrow: boolean = true;
  /** 左侧图标文字 */
  @Prop iconText: string = '';
  /** 是否为组内最后一项 */
  @Prop isLast: boolean = false;

  /** 点击回调 */
  onTap?: () => void;

  build() {
    Row() {
      // 左侧图标
      if (this.iconText && this.iconText.length > 0) {
        Text(this.iconText)
          .fontSize(22)
          .margin({ right: 12 })
      }

      // 文字区域
      Column() {
        Text(this.title)
          .fontSize(15)
          .fontWeight(500)
          .fontColor('#0F172A')
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })

        if (this.subtitle && this.subtitle.length > 0) {
          Text(this.subtitle)
            .fontSize(12)
            .fontColor('#64748B')
            .maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
            .margin({ top: 2 })
        }
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      // 右侧标签
      if (this.tagText && this.tagText.length > 0) {
        Text(this.tagText)
          .fontSize(10)
          .fontWeight(700)
          .fontColor(this.tagColor)
          .padding({ left: 8, right: 8, top: 3, bottom: 3 })
          .borderRadius(6)
          .backgroundColor('#DCFCE7')
          .margin({ right: 8 })
      }

      // 右侧箭头
      if (this.showArrow) {
        Text('›')
          .fontSize(20)
          .fontColor('#64748B')
      }
    }
    .width('100%')
    .padding({ left: 18, right: 14, top: 16, bottom: 16 })
    .backgroundColor('#FFFFFF')
    .borderWidth({ bottom: this.isLast ? 0 : 0.5 })
    .borderColor('#E2E8F0')
    .onClick(() => {
      if (this.onTap) {
        this.onTap();
      }
    })
  }
}

/**
 * 信息卡片（带头部标签和学分等）
 */
@Component
export struct InfoCard {
  /** 标签类型 */
  @Prop tagText: string = '';
  /** 标签背景色 */
  @Prop tagBgColor: string = '#E0E7FF';
  /** 标签文字色 */
  @Prop tagTextColor: string = '#3730A3';
  /** 右侧学分信息 */
  @Prop creditText: string = '';
  /** 课程名称 */
  @Prop courseName: string = '';
  /** 描述信息 */
  @Prop description: string = '';
  /** 底部按钮文字 */
  @Prop actionText: string = '';
  /** 底部按钮样式 */
  @Prop actionVariant: string = 'primary';

  /** 按钮点击回调 */
  onAction?: () => void;
  /** 卡片点击回调 */
  onCardTap?: () => void;

  build() {
    Column() {
      // 头部：标签 + 学分
      Row() {
        if (this.tagText && this.tagText.length > 0) {
          Text(this.tagText)
            .fontSize(10)
            .fontWeight(700)
            .fontColor(this.tagTextColor)
            .padding({ left: 8, right: 8, top: 3, bottom: 3 })
            .borderRadius(6)
            .backgroundColor(this.tagBgColor)
        }

        Blank()

        if (this.creditText && this.creditText.length > 0) {
          Text(this.creditText)
            .fontSize(13)
            .fontColor('#64748B')
        }
      }
      .width('100%')
      .margin({ bottom: 8 })

      // 课程名称
      Text(this.courseName)
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor('#0F172A')
        .margin({ bottom: 6 })

      // 描述
      if (this.description && this.description.length > 0) {
        Text(this.description)
          .fontSize(13)
          .fontColor('#64748B')
          .margin({ bottom: 8 })
      }

      // 操作按钮
      if (this.actionText && this.actionText.length > 0) {
        Button(this.actionText)
          .type(ButtonType.Normal)
          .backgroundColor('#2563EB')
          .fontColor(Color.White)
          .fontSize(13)
          .fontWeight(600)
          .borderRadius(10)
          .padding({ left: 14, right: 14, top: 8, bottom: 8 })
          .margin({ top: 4 })
          .onClick(() => {
            if (this.onAction) {
              this.onAction();
            }
          })
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(10)
    .onClick(() => {
      if (this.onCardTap) {
        this.onCardTap();
      }
    })
  }
}
