/**
 * 底部 Tab 导航栏组件
 * 支持4个Tab：首页、课表、成绩、我的
 * 对标 HTML 原型中 tab-bar 样式
 */
@Component
export struct TabBar {
  /** 当前激活的 Tab 索引 */
  @Link activeIndex: number;
  /** Tab 切换回调 */
  onTabChange?: (index: number) => void;

  /** Tab 配置数据 */
  private tabItems: TabItem[] = [
    { index: 0, label: '首页', icon: 'home' },
    { index: 1, label: '课表', icon: 'schedule' },
    { index: 2, label: '成绩', icon: 'grades' },
    { index: 3, label: '我的', icon: 'user' },
  ];

  build() {
    Row() {
      ForEach(this.tabItems, (item: TabItem, idx: number) => {
        Column() {
          // 图标区域
          Column() {
            // 用文字模拟图标（鸿蒙端无SVG sprite，用Unicode/文字代替）
            Text(this.getTabIcon(item.icon))
              .fontSize(20)
              .fontWeight(FontWeight.Medium)
              .fontColor(this.activeIndex === item.index ? '#2563EB' : '#64748B')
          }
          .width(22)
          .height(22)
          .justifyContent(FlexAlign.Center)
          .alignItems(HorizontalAlign.Center)
          .margin({ bottom: 2 })

          // 标签文字
          Text(item.label)
            .fontSize(11)
            .fontWeight(600)
            .fontColor(this.activeIndex === item.index ? '#2563EB' : '#64748B')
        }
        .layoutWeight(1)
        .padding({ top: 8, bottom: 4 })
        .borderRadius(10)
        .backgroundColor(this.activeIndex === item.index ? '#E8EFFF' : Color.Transparent)
        .onClick(() => {
          this.activeIndex = item.index;
          if (this.onTabChange) {
            this.onTabChange(item.index);
          }
        })
      })
    }
    .width('100%')
    .padding({ left: 6, right: 6, bottom: 12 })
    .backgroundColor('rgba(255, 255, 255, 0.96)')
    .backdropBlur(12)
    .borderWidth({ top: 1 })
    .borderColor('#E2E8F0')
    .justifyContent(FlexAlign.SpaceEvenly)
  }

  /** 获取 Tab 图标文字 */
  private getTabIcon(icon: string): string {
    const icons: Record<string, string> = {
      'home': '🏠',
      'schedule': '📅',
      'grades': '📊',
      'user': '👤',
    };
    return icons[icon] || '●';
  }
}

/** Tab 配置项接口 */
interface TabItem {
  index: number;
  label: string;
  icon: string;
}
