/**
 * 全局样式常量
 * 从 styles.css 提取配色、圆角、阴影、间距等，转化为 ArkUI 链式样式常量
 */

/** 全局色值常量 */
export class Colors {
  /** 页面背景色 */
  static readonly BG: string = '#EEF2F8';
  /** 卡片/表面背景色 */
  static readonly SURFACE: string = '#FFFFFF';
  /** 主色调 */
  static readonly PRIMARY: string = '#2563EB';
  /** 主色调深色 */
  static readonly PRIMARY_DARK: string = '#1D4ED8';
  /** 主色调浅色背景 */
  static readonly PRIMARY_SOFT: string = '#E8EFFF';
  /** 主色调渐变起始 */
  static readonly PRIMARY_GRADIENT_START: string = '#2563EB';
  /** 主色调渐变结束 */
  static readonly PRIMARY_GRADIENT_END: string = '#4F46E5';
  /** 主文字色 */
  static readonly TEXT: string = '#0F172A';
  /** 次要文字色 */
  static readonly MUTED: string = '#64748B';
  /** 边框色 */
  static readonly BORDER: string = '#E2E8F0';
  /** 课表课程背景色 */
  static readonly COURSE_BG: string = '#EEF4FF';
  /** 课表课程文字色 */
  static readonly COURSE_TEXT: string = '#1E3A8A';
  /** 课表课程边框色 */
  static readonly COURSE_BORDER: string = '#BFDBFE';
  /** Hero 卡片渐变起始 */
  static readonly HERO_START: string = '#1E40AF';
  /** Hero 卡片渐变结束 */
  static readonly HERO_END: string = '#6366F1';
  /** 成功/已完成色 */
  static readonly SUCCESS: string = '#166534';
  /** 成功背景色 */
  static readonly SUCCESS_BG: string = '#DCFCE7';
  /** 警告色 */
  static readonly WARNING: string = '#92400E';
  /** 警告背景色 */
  static readonly WARNING_BG: string = '#FEF3C7';
  /** 错误色 */
  static readonly ERROR: string = '#DC2626';
  /** Tag 背景色 */
  static readonly TAG_BG: string = '#E0E7FF';
  /** Tag 文字色 */
  static readonly TAG_TEXT: string = '#3730A3';
  /** 占位格背景 */
  static readonly CELL_EMPTY_BG: string = '#F8FAFC';
  /** 占位格边框 */
  static readonly CELL_EMPTY_BORDER: string = '#CBD5E1';
  /** 节次标签背景 */
  static readonly PERIOD_BG: string = '#F1F5F9';
  /** Toast 背景 */
  static readonly TOAST_BG: string = 'rgba(15, 23, 42, 0.88)';
  /** Toast 文字 */
  static readonly TOAST_TEXT: string = '#FFFFFF';
  /** 底栏背景 */
  static readonly TAB_BAR_BG: string = 'rgba(255, 255, 255, 0.96)';
  /** 输入框背景 */
  static readonly INPUT_BG: string = '#F8FAFC';
  /** 渐变背景起始 */
  static readonly BG_GRADIENT_START: string = '#DBEAFE';
  /** 渐变背景结束 */
  static readonly BG_GRADIENT_END: string = '#F1F5F9';
}

/** 圆角常量 */
export class Radius {
  /** 大圆角（卡片） */
  static readonly LG: number = 14;
  /** 小圆角（按钮、输入框） */
  static readonly SM: number = 10;
  /** 胶囊圆角（Tag、Badge、Toast） */
  static readonly FULL: number = 999;
  /** 格子圆角 */
  static readonly CELL: number = 8;
  /** 头像圆角 */
  static readonly AVATAR: number = 16;
  /** 图标按钮圆角 */
  static readonly ICON_BTN: number = 10;
}

/** 阴影常量 */
export class Shadows {
  /** 大阴影 */
  static readonly LG: string = '0 8px 24px rgba(15, 23, 42, 0.08)';
  /** 小阴影 */
  static readonly SM: string = '0 2px 10px rgba(15, 23, 42, 0.06)';
  /** 按钮阴影 */
  static readonly BTN: string = '0 4px 14px rgba(37, 99, 235, 0.35)';
  /** 底栏阴影 */
  static readonly TAB_BAR: string = '0 -4px 20px rgba(15, 23, 42, 0.06)';
}

/** 间距常量 */
export class Spacing {
  /** XS间距 */
  static readonly XS: number = 4;
  /** 小间距 */
  static readonly SM: number = 8;
  /** 中等间距 */
  static readonly MD: number = 12;
  /** 标准间距 */
  static readonly BASE: number = 14;
  /** 大间距 */
  static readonly LG: number = 16;
  /** XL间距 */
  static readonly XL: number = 20;
  /** 2XL间距 */
  static readonly XXL: number = 24;
}

/** 字体大小常量 */
export class FontSize {
  /** 超小 */
  static readonly XS: number = 10;
  /** 小号 */
  static readonly SM: number = 12;
  /** 辅助文字 */
  static readonly AUX: number = 13;
  /** 正文 */
  static readonly BASE: number = 14;
  /** 标准 */
  static readonly MD: number = 15;
  /** 副标题 */
  static readonly LG: number = 16;
  /** 标题 */
  static readonly XL: number = 18;
  /** 大标题 */
  static readonly XXL: number = 20;
}

/** 常用尺寸常量 */
export class Sizes {
  /** 头像尺寸 */
  static readonly AVATAR: number = 56;
  /** 图标按钮尺寸 */
  static readonly ICON_BTN: number = 40;
  /** Tab 图标高度 */
  static readonly TAB_ICON: number = 22;
  /** 快捷入口图标 */
  static readonly QUICK_ICON: number = 28;
  /** 登录Logo尺寸 */
  static readonly LOGIN_LOGO: number = 64;
  /** 课表单元格最小高度 */
  static readonly CELL_MIN_HEIGHT: number = 56;
  /** 顶部导航栏高度 */
  static readonly TOP_BAR_HEIGHT: number = 56;
  /** 底部Tab栏高度 */
  static readonly TAB_BAR_HEIGHT: number = 56;
}

/** 功能入口名称常量 */
export class QuickEntries {
  static readonly LIST: QuickEntryItem[] = [
    { label: '我的课表', icon: 'calendar', target: 'schedule' },
    { label: '我的成绩', icon: 'chart', target: 'grades' },
    { label: '选课', icon: 'pick', target: 'selection' },
    { label: '量化评教', icon: 'eval', target: 'eval' },
  ];
}

/** 快捷入口项 */
export interface QuickEntryItem {
  label: string;
  icon: string;
  target: string;
}

/** 节次时间映射 */
export const PERIOD_TIME_MAP: Map<number, string> = new Map([
  [1, '08:00-08:45'],
  [2, '08:50-09:35'],
  [3, '09:50-10:35'],
  [4, '10:40-11:25'],
  [5, '14:00-14:45'],
  [6, '14:50-15:35'],
  [7, '15:50-16:35'],
  [8, '16:40-17:25'],
  [9, '19:00-19:45'],
  [10, '19:50-20:35'],
]);
