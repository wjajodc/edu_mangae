/**
 * 通知公告、学籍信息、作业及其他数据模型接口
 * 对应需求文档 4.13、4.14、4.23、4.24 等章节
 */

/** 通知公告 */
export interface NoticeItem {
  /** 通知ID */
  id: string;
  /** 标题 */
  title: string;
  /** 正文内容 */
  content: string;
  /** 发布单位 */
  publisher: string;
  /** 发布时间 */
  publishTime: string;
  /** 是否已读 */
  isRead: boolean;
  /** 通知类型 */
  type: string;
}

/** 学籍信息（对标 Web 学籍字段） */
export interface StudentStatus {
  /** 学号 */
  studentId: string;
  /** 姓名 */
  name: string;
  /** 英文名 */
  englishName: string;
  /** 性别 */
  gender: string;
  /** 年级 */
  grade: string;
  /** 学制 */
  schoolSystem: string;
  /** 项目（本专科） */
  program: string;
  /** 学历层次 */
  educationLevel: string;
  /** 学生类别 */
  studentCategory: string;
  /** 专业 */
  major: string;
  /** 院系 */
  department: string;
  /** 行政管理院系 */
  adminDepartment: string;
  /** 方向 */
  direction: string;
  /** 班级 */
  className: string;
  /** 入校时间 */
  enrollmentDate: string;
  /** 预计毕业时间 */
  expectedGraduation: string;
  /** 学习形式 */
  studyMode: string;
  /** 是否在籍 */
  isRegistered: string;
  /** 是否在校 */
  isOnCampus: string;
  /** 所属校区 */
  campus: string;
  /** 学籍状态 */
  status: string;
  /** 学籍生效日期 */
  statusEffectiveDate: string;
  /** 是否有学籍 */
  hasStudentStatus: string;
  /** 是否在职 */
  isEmployed: string;
  /** 备注 */
  remarks: string;
  /** 学籍照片路径 */
  photoPath: string;
}

/** 作业/实验 */
export interface AssignmentItem {
  /** 作业ID */
  id: string;
  /** 课程名称 */
  courseName: string;
  /** 课程序号 */
  courseCode: string;
  /** 作业标题 */
  title: string;
  /** 作业描述 */
  description: string;
  /** 截止时间 */
  deadline: string;
  /** 提交状态：not_submitted=未提交, submitted=已提交, graded=已批改 */
  status: string;
  /** 状态文案 */
  statusText: string;
  /** 分数（已批改时） */
  score?: number;
  /** 教师评语（已批改时） */
  comment?: string;
  /** 附件要求 */
  attachmentRequired: boolean;
}

/** 应用版本信息 */
export interface AppVersionInfo {
  /** 应用名称 */
  appName: string;
  /** 版本号 */
  version: string;
  /** 构建号 */
  buildNumber: string;
  /** 用户协议链接 */
  userAgreement: string;
  /** 隐私政策链接 */
  privacyPolicy: string;
}

/** 全局状态 Key 常量 */
export class GlobalStorageKeys {
  /** 登录状态 */
  static readonly IS_LOGGED_IN: string = 'isLoggedIn';
  /** 当前学生学号 */
  static readonly STUDENT_ID: string = 'studentId';
  /** 当前学生姓名 */
  static readonly STUDENT_NAME: string = 'studentName';
  /** 当前学年学期 */
  static readonly CURRENT_SEMESTER: string = 'currentSemester';
  /** 当前教学周 */
  static readonly CURRENT_WEEK: string = 'currentWeek';
  /** 头像首字 */
  static readonly AVATAR_INITIAL: string = 'avatarInitial';
  /** 当前 Tab 索引 */
  static readonly TAB_INDEX: string = 'tabIndex';
  /** 当前学生完整信息 JSON */
  static readonly STUDENT_INFO: string = 'studentInfo';
  /** 课表学期 */
  static readonly SCHEDULE_SEMESTER: string = 'scheduleSemester';
  /** 成绩学期 */
  static readonly GRADE_SEMESTER: string = 'gradeSemester';
}

/** 页面路由路径常量 */
export class RoutePaths {
  /** 登录页 */
  static readonly LOGIN: string = 'LoginPage';
  /** 主框架（含Tab） */
  static readonly MAIN: string = 'MainPage';
  /** 首页 */
  static readonly HOME: string = 'HomePage';
  /** 我的 */
  static readonly MINE: string = 'MinePage';
  /** 量化评教 */
  static readonly EVAL: string = 'EvalPage';
  /** 实践 */
  static readonly PRACTICE: string = 'PracticePage';
  /** 公共服务 */
  static readonly PUBLIC_SERVICE: string = 'PublicServicePage';
  /** 修改个人信息 */
  static readonly PROFILE_EDIT: string = 'ProfileEditPage';
  /** 修改密码 */
  static readonly PASSWORD_EDIT: string = 'PasswordEditPage';
  /** 系统设置 */
  static readonly SETTINGS: string = 'SettingsPage';
  /** 意见反馈 */
  static readonly FEEDBACK: string = 'FeedbackPage';
  /** 我的课表 */
  static readonly SCHEDULE: string = 'SchedulePage';
  /** 今日课程 */
  static readonly TODAY_COURSE: string = 'TodayCoursePage';
  /** 课程详情 */
  static readonly COURSE_DETAIL: string = 'CourseDetailPage';
  /** 选课首页 */
  static readonly SELECTION: string = 'SelectionPage';
  /** 选课列表 */
  static readonly SELECTION_LIST: string = 'SelectionListPage';
  /** 我的已选 */
  static readonly MY_SELECTIONS: string = 'MySelectionsPage';
  /** 成绩查询 */
  static readonly GRADES: string = 'GradesPage';
  /** 考试安排 */
  static readonly EXAMS: string = 'ExamsPage';
  /** 评教问卷 */
  static readonly EVAL_QUESTIONNAIRE: string = 'EvalQuestionnairePage';
  /** 学籍信息 */
  static readonly STATUS: string = 'StatusPage';
  /** 作业/实验 */
  static readonly ASSIGNMENTS: string = 'AssignmentsPage';
  /** 通知列表 */
  static readonly NOTICES: string = 'NoticesPage';
  /** 通知详情 */
  static readonly NOTICE_DETAIL: string = 'NoticeDetailPage';
  /** 关于 */
  static readonly ABOUT: string = 'AboutPage';
}
