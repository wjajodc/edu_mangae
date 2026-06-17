/**
 * 用户相关数据模型接口
 * 对应需求文档 4.1、4.3、4.4、4.23 等章节
 */

/** 学生用户基本信息 */
export interface StudentUser {
  /** 学号（唯一标识） */
  studentId: string;
  /** 姓名 */
  name: string;
  /** 密码（Mock 验证用） */
  password: string;
  /** 学院 */
  college: string;
  /** 专业 */
  major: string;
  /** 班级 */
  className: string;
  /** 年级 */
  grade: string;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 通讯地址 */
  address: string;
  /** 头像首字（模拟头像） */
  avatarInitial: string;
}

/** 登录请求参数 */
export interface LoginRequest {
  /** 学号 */
  studentId: string;
  /** 密码 */
  password: string;
}

/** 登录响应 */
export interface LoginResponse {
  /** 是否成功 */
  success: boolean;
  /** 错误消息 */
  message: string;
  /** 用户信息（成功时返回） */
  user?: StudentUser;
}

/** 修改密码请求 */
export interface ChangePasswordRequest {
  /** 原密码 */
  oldPassword: string;
  /** 新密码 */
  newPassword: string;
  /** 确认新密码 */
  confirmPassword: string;
}

/** 修改个人信息请求 */
export interface UpdateProfileRequest {
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 通讯地址 */
  address: string;
}

/** 意见反馈 */
export interface FeedbackItem {
  /** 反馈ID */
  id: string;
  /** 反馈类型：功能建议/问题反馈/其他 */
  type: string;
  /** 标题 */
  title: string;
  /** 正文内容 */
  content: string;
  /** 提交时间 */
  submitTime: string;
  /** 处理状态 */
  status: string;
}

/** 系统设置 */
export interface SystemSettings {
  /** 消息通知开关 */
  notificationEnabled: boolean;
  /** 深色模式 */
  darkMode: boolean;
  /** 缓存大小（MB） */
  cacheSize: number;
}

/** 账户信息（对标 Web「我的账户」） */
export interface AccountInfo {
  /** 学号 */
  studentId: string;
  /** 姓名 */
  name: string;
  /** 绑定邮箱 */
  boundEmail: string;
  /** 账号状态 */
  accountStatus: string;
  /** 账号有效期起算日 */
  validFrom: string;
  /** 创建日期 */
  createDate: string;
  /** 密码过期策略 */
  passwordPolicy: string;
}
