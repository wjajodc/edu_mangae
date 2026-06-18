/**
 * 应用内统一矢量图标 — 基于 HarmonyOS SymbolGlyph，与登录/首页紫色 UI 协调
 */
export const APP_ICON_PRIMARY: string = '#5E61E6';
export const APP_ICON_MUTED: string = '#A0AEC0';
export const APP_ICON_SOFT: string = '#F0F4FF';

/** 业务图标标识 */
export type AppIconKey =
  | 'home'
  | 'schedule'
  | 'grades'
  | 'user'
  | 'selection'
  | 'eval';

function resolveSymbolResource(key: AppIconKey): Resource {
  switch (key) {
    case 'home':
      return $r('sys.symbol.house_fill');
    case 'schedule':
      return $r('sys.symbol.calendar');
    case 'user':
      return $r('sys.symbol.person_crop_circle_fill');
    case 'selection':
      return $r('sys.symbol.doc_text_fill');
    case 'eval':
      return $r('sys.symbol.square_and_pencil');
    default:
      return $r('sys.symbol.circle_fill');
  }
}

@Component
export struct AppSymbolIcon {
  @Prop iconKey: AppIconKey = 'home';
  @Prop iconSize: number = 22;
  @Prop color: string = APP_ICON_PRIMARY;
  @Prop weight: FontWeight = FontWeight.Medium;

  build() {
    if (this.iconKey === 'grades') {
      this.buildGradesIcon()
    } else {
      SymbolGlyph(resolveSymbolResource(this.iconKey))
        .fontSize(this.iconSize)
        .fontWeight(this.weight)
        .fontColor([this.color])
        .renderingStrategy(SymbolRenderingStrategy.SINGLE)
    }
  }

  /** SDK 无 chart 类 symbol，用几何柱形表示成绩 */
  @Builder
  buildGradesIcon(): void {
    Row() {
      Column()
        .width(this.iconSize * 0.22)
        .height(this.iconSize * 0.42)
        .borderRadius(2)
        .backgroundColor(this.color)

      Column()
        .width(this.iconSize * 0.22)
        .height(this.iconSize * 0.72)
        .borderRadius(2)
        .backgroundColor(this.color)
        .margin({ left: 3 })

      Column()
        .width(this.iconSize * 0.22)
        .height(this.iconSize * 0.55)
        .borderRadius(2)
        .backgroundColor(this.color)
        .margin({ left: 3 })
    }
    .height(this.iconSize)
    .alignItems(VerticalAlign.Bottom)
    .justifyContent(FlexAlign.Center)
  }
}
