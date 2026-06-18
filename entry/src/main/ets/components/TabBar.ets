/**
 * 底部 Tab 导航栏组件
 * 支持4个Tab：首页、课表、成绩、我的
 */
import { AppSymbolIcon, APP_ICON_MUTED, APP_ICON_PRIMARY, APP_ICON_SOFT, AppIconKey } from './AppSymbolIcon';

@Component
export struct TabBar {
  /** 当前激活的 Tab 索引 */
  @Link activeIndex: number;
  /** Tab 切换回调 */
  onTabChange?: (index: number) => void;

  /** Tab 配置数据 */
  private tabItems: TabItem[] = [
    { index: 0, label: '首页', iconKey: 'home' },
    { index: 1, label: '课表', iconKey: 'schedule' },
    { index: 2, label: '成绩', iconKey: 'grades' },
    { index: 3, label: '我的', iconKey: 'user' },
  ];

  build() {
    Row() {
      ForEach(this.tabItems, (item: TabItem, idx: number) => {
        Column() {
          Column() {
            AppSymbolIcon({
              iconKey: item.iconKey,
              iconSize: 22,
              color: this.activeIndex === item.index ? APP_ICON_PRIMARY : APP_ICON_MUTED,
              weight: this.activeIndex === item.index ? FontWeight.Medium : FontWeight.Regular,
            })
          }
          .width(24)
          .height(24)
          .justifyContent(FlexAlign.Center)
          .alignItems(HorizontalAlign.Center)
          .margin({ bottom: 2 })

          Text(item.label)
            .fontSize(11)
            .fontWeight(600)
            .fontColor(this.activeIndex === item.index ? APP_ICON_PRIMARY : APP_ICON_MUTED)
        }
        .layoutWeight(1)
        .padding({ top: 8, bottom: 4 })
        .borderRadius(10)
        .backgroundColor(this.activeIndex === item.index ? APP_ICON_SOFT : Color.Transparent)
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

}

/** Tab 配置项接口 */
interface TabItem {
  index: number;
  label: string;
  iconKey: AppIconKey;
}
