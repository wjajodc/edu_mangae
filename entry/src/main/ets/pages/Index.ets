import { NoteList } from '../view/NoteList';
import { TodoList } from '../view/TodoList';
import { DataManager } from '../model/DataManager';

/**
 * 应用主页
 * 包含底部导航栏，用于在笔记列表和待办事项列表之间切换
 */
@Entry
@Component
struct Index {
  /** 当前选中的 Tab 索引 */
  @State currentIndex: number = 0;
  /** Tab 控制器 */
  private controller: TabsController = new TabsController();

  /**
   * 页面即将显示时调用
   * 初始化 DataManager 单例
   */
  aboutToAppear() {
    DataManager.getInstance();
  }

  /**
   * 自定义 TabBar 构建器
   * @param title Tab 标题
   * @param targetIndex 目标索引
   * @param selectedImg 选中状态图标
   * @param normalImg 未选中状态图标
   */
  @Builder TabBuilder(title: string, targetIndex: number, selectedImg: Resource, normalImg: Resource) {
    Column() {
      Image(this.currentIndex === targetIndex ? selectedImg : normalImg)
        .size({ width: 24, height: 24 })
      Text(title)
        .fontColor(this.currentIndex === targetIndex ? '#000000' : '#999999')
        .fontSize(10)
        .margin({ top: 4 })
    }
    .width('100%')
    .height(50)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.currentIndex = targetIndex;
      this.controller.changeIndex(this.currentIndex);
    })
  }

  build() {
    Tabs({ barPosition: BarPosition.End, controller: this.controller }) {
      TabContent() {
        NoteList()
      }
      .tabBar(this.TabBuilder('笔记', 0, $r('app.media.biji'), $r('app.media.biji1')))

      TabContent() {
        TodoList()
      }
      .tabBar(this.TabBuilder('待办', 1, $r('app.media.daiban'), $r('app.media.daiban')))
    }
    .onChange((index: number) => {
      this.currentIndex = index;
    })
    .barWidth('100%')
    .barHeight(60)
    .backgroundColor(Color.White)
  }
}