/**
 * 主框架页面
 * 底部 Tab 切换：首页、课表、成绩、我的
 */
import { TabBar } from '../components/TabBar';
import { HomePage } from './HomePage';
import { SchedulePage } from './SchedulePage';
import { GradesPage } from './GradesPage';
import { MinePage } from './MinePage';
import { Colors } from '../utils/StyleConstants';

@Entry
@Component
struct MainPage {
  @StorageLink('mainTabIndex') activeIndex: number = 0;

  build() {
    Column() {
      Stack() {
        HomePage()
          .width('100%')
          .height('100%')
          .visibility(this.activeIndex === 0 ? Visibility.Visible : Visibility.Hidden)

        SchedulePage({ embedded: true })
          .width('100%')
          .height('100%')
          .visibility(this.activeIndex === 1 ? Visibility.Visible : Visibility.Hidden)

        GradesPage({ embedded: true })
          .width('100%')
          .height('100%')
          .visibility(this.activeIndex === 2 ? Visibility.Visible : Visibility.Hidden)

        MinePage()
          .width('100%')
          .height('100%')
          .visibility(this.activeIndex === 3 ? Visibility.Visible : Visibility.Hidden)
      }
      .layoutWeight(1)
      .width('100%')

      TabBar({ activeIndex: $activeIndex })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Colors.BG)
  }
}
