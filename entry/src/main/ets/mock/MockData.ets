/**
 * 全局 Mock 模拟数据
 * 覆盖全业务场景，字段严格匹配需求文档和 HTML 原型
 * 对应需求文档 4.1~4.25 各章节
 */

import { StudentUser } from '../model/UserModel';
import { Course, CourseDetail, ScheduleCell, SelectableCourse, SelectionRound, TodayCourseItem } from '../model/CourseModel';
import { GradeRecord, SemesterGradeSummary, ExamArrangement } from '../model/GradeModel';
import { EvaluationTask, EvaluationQuestion, EvaluationQuestionnaire } from '../model/EvalModel';
import { NoticeItem, StudentStatus, AssignmentItem } from '../model/CommonModel';

// ==================== 学生用户数据 ====================

/** 演示学生用户（对应 app.js 中的 DEMO_STUDENT） */
export const MOCK_STUDENT: StudentUser = {
  studentId: '2023307021058',
  name: '周赛',
  password: 'demo',
  college: '计算机学院',
  major: '计算机科学与技术',
  className: '23计科U10班',
  grade: '2023',
  phone: '138****0000',
  email: '2023307021058@school.edu.cn',
  address: '广东省深圳市南山区xx路xx号',
  avatarInitial: '周',
};

/** 额外学生用户（用于边界测试） */
export const MOCK_STUDENT_2: StudentUser = {
  studentId: '2023307021059',
  name: '李华',
  password: '123456',
  college: '计算机学院',
  major: '计算机科学与技术',
  className: '23计科U10班',
  grade: '2023',
  phone: '139****1111',
  email: '2023307021059@school.edu.cn',
  address: '广东省广州市天河区xx路xx号',
  avatarInitial: '李',
};

// ==================== 学籍数据 ====================

/** 学籍信息（对标 Web 学籍信息字段） */
export const MOCK_STUDENT_STATUS: StudentStatus = {
  studentId: '2023307021058',
  name: '周赛',
  englishName: 'Zhou Sai',
  gender: '男',
  grade: '2023',
  schoolSystem: '4年',
  program: '本科',
  educationLevel: '普通本科',
  studentCategory: '全日制',
  major: '计算机科学与技术',
  department: '计算机学院',
  adminDepartment: '计算机学院',
  direction: '—',
  className: '23计科U10班',
  enrollmentDate: '2023-09-01',
  expectedGraduation: '2027-07-01',
  studyMode: '全日制',
  isRegistered: '是',
  isOnCampus: '是',
  campus: '主校区',
  status: '在校',
  statusEffectiveDate: '2023-09-01',
  hasStudentStatus: '是',
  isEmployed: '否',
  remarks: '—',
  photoPath: '',
};

/** 学籍信息别名（页面引用） */
export const MOCK_STATUS: StudentStatus = MOCK_STUDENT_STATUS;

/** 学籍信息展示字段 */
export const STATUS_FIELDS: string[] = [
  '学号', '姓名', '性别', '院系', '专业', '班级',
  '学籍状态', '入校时间', '预计毕业时间', '培养层次', '学制'
];

// ==================== 课程数据 ====================

/** 课程基础数据 */
export const MOCK_COURSES: Course[] = [
  {
    courseCode: 'VDZ02119204.09',
    courseName: '鸿蒙应用开发初级认证',
    credit: 3,
    courseType: '专业拓展课程',
    college: '计算机学院',
    teacher: '曲昇港',
    classroom: '教7栋403',
    capacity: 60,
    enrolled: 48,
    weekRange: '2-12周',
    weeks: [2, 12],
    weekType: 0,
    description: '学习鸿蒙应用开发基础，包括ArkTS语言、ArkUI框架、应用生命周期等。',
    timeSlots: [
      { dayOfWeek: 1, startPeriod: 1, endPeriod: 2, timeLabel: '上午 1-2节', timeSegment: 'am' },
    ],
  },
  {
    courseCode: 'VDZ02112704.11',
    courseName: '计算机组成原理',
    credit: 4,
    courseType: '专业核心课程',
    college: '计算机学院',
    teacher: '袁小节',
    classroom: '教8栋814',
    capacity: 65,
    enrolled: 55,
    weekRange: '2-17周',
    weeks: [2, 17],
    weekType: 0,
    description: '学习计算机硬件系统组成，包括CPU、存储器、总线、I/O系统等。',
    timeSlots: [
      { dayOfWeek: 2, startPeriod: 1, endPeriod: 2, timeLabel: '上午 1-2节', timeSegment: 'am' },
      { dayOfWeek: 5, startPeriod: 1, endPeriod: 2, timeLabel: '上午 1-2节', timeSegment: 'am' },
    ],
  },
  {
    courseCode: 'VDZ02114904.10',
    courseName: '软件测试与管理',
    credit: 3,
    courseType: '专业拓展课程',
    college: '计算机学院',
    teacher: '卢超',
    classroom: '教8栋611',
    capacity: 55,
    enrolled: 50,
    weekRange: '2-16周',
    weeks: [2, 16],
    weekType: 0,
    description: '学习软件测试方法、测试管理流程、自动化测试工具等。',
    timeSlots: [
      { dayOfWeek: 3, startPeriod: 1, endPeriod: 2, timeLabel: '上午 1-2节', timeSegment: 'am' },
    ],
  },
  {
    courseCode: 'VDZ02103003.10',
    courseName: '编译原理',
    credit: 4,
    courseType: '专业核心课程',
    college: '计算机学院',
    teacher: '张毅恒',
    classroom: '教7栋802',
    capacity: 60,
    enrolled: 52,
    weekRange: '2-13周',
    weeks: [2, 13],
    weekType: 0,
    description: '学习编译器的设计与实现，包括词法分析、语法分析、语义分析、代码生成等。',
    timeSlots: [
      { dayOfWeek: 4, startPeriod: 1, endPeriod: 4, timeLabel: '上午 1-4节', timeSegment: 'am' },
    ],
  },
  {
    courseCode: 'VDZ02115104.10',
    courseName: '大型数据库管理与维护',
    credit: 3,
    courseType: '专业拓展课程',
    college: '计算机学院',
    teacher: '陈勇',
    classroom: '教7栋702',
    capacity: 55,
    enrolled: 48,
    weekRange: '2-15,17周',
    weeks: [2, 17],
    weekType: 0,
    description: '学习大型数据库系统的设计、管理与维护，包括性能优化、备份恢复等。',
    timeSlots: [
      { dayOfWeek: 5, startPeriod: 1, endPeriod: 2, timeLabel: '上午 1-2节', timeSegment: 'am' },
    ],
  },
  {
    courseCode: 'VDZ02102903.11',
    courseName: '软件工程',
    credit: 3,
    courseType: '专业核心课程',
    college: '计算机学院',
    teacher: '任永伟',
    classroom: '教8栋516',
    capacity: 60,
    enrolled: 55,
    weekRange: '3-14周',
    weeks: [3, 14],
    weekType: 0,
    description: '学习软件开发过程、需求分析、系统设计、项目管理等软件工程核心知识。',
    timeSlots: [
      { dayOfWeek: 1, startPeriod: 5, endPeriod: 6, timeLabel: '下午 5-6节', timeSegment: 'pm' },
    ],
  },
  {
    courseCode: 'VDZ02119303.09',
    courseName: '鸿蒙移动应用开发综合实践',
    credit: 4,
    courseType: '集中实践教学课程',
    college: '计算机学院',
    teacher: '王鑫',
    classroom: '教9栋401',
    capacity: 50,
    enrolled: 42,
    weekRange: '15-17周',
    weeks: [15, 17],
    weekType: 0,
    description: '完成一个完整的鸿蒙移动应用项目，涵盖需求分析、设计、编码、测试全流程。',
    timeSlots: [
      { dayOfWeek: 3, startPeriod: 5, endPeriod: 8, timeLabel: '下午 5-8节', timeSegment: 'pm' },
    ],
  },
  {
    courseCode: 'VMK01100203.43',
    courseName: '中国近现代史纲要',
    credit: 2,
    courseType: '通识教育课程',
    college: '马克思主义学院',
    teacher: '谢双明',
    classroom: '教13栋205',
    capacity: 80,
    enrolled: 72,
    weekRange: '2-9周',
    weeks: [2, 9],
    weekType: 0,
    description: '学习中国近现代历史发展脉络，理解中国社会变革的历程与经验。',
    timeSlots: [
      { dayOfWeek: 2, startPeriod: 5, endPeriod: 6, timeLabel: '下午 5-6节', timeSegment: 'pm' },
      { dayOfWeek: 4, startPeriod: 5, endPeriod: 6, timeLabel: '下午 5-6节', timeSegment: 'pm' },
    ],
  },
  {
    courseCode: 'VJW01102302.01',
    courseName: '博物馆展览鉴赏',
    credit: 2,
    courseType: '通识教育课程',
    college: '人文学院',
    teacher: '汪芷晔',
    classroom: '教10栋202',
    capacity: 50,
    enrolled: 35,
    weekRange: '3-18周',
    weeks: [3, 18],
    weekType: 0,
    description: '学习博物馆展览的基本知识和鉴赏方法，了解不同类型博物馆的展陈特色。',
    timeSlots: [
      { dayOfWeek: 4, startPeriod: 9, endPeriod: 10, timeLabel: '晚上 9-10节', timeSegment: 'eve' },
    ],
  },
];

// ==================== 课表数据 ====================
// 课表数据已通过 ScheduleStore 从 rawfile/default_schedule.xls 导入
// 如需离线兜底，ScheduleStore.initDefaultSchedule() 会从 MOCK_COURSES 生成课表

/** 今日课程数据 */
export const MOCK_TODAY_COURSES: TodayCourseItem[] = [
  {
    courseCode: 'VDZ02119204.09',
    courseName: '鸿蒙应用开发初级认证',
    teacher: '曲昇港',
    classroom: '教7栋403',
    startPeriod: 1,
    endPeriod: 2,
    periodLabel: '上午 1-2节',
    timeLabel: '08:00-09:35',
    isTomorrow: false,
  },
  {
    courseCode: 'VDZ02112704.11',
    courseName: '计算机组成原理',
    teacher: '袁小节',
    classroom: '教8栋814',
    startPeriod: 1,
    endPeriod: 2,
    periodLabel: '上午 1-2节',
    timeLabel: '08:00-09:35',
    isTomorrow: false,
  },
];

/** 空今日课程（边界数据） */
export const MOCK_TODAY_COURSES_EMPTY: TodayCourseItem[] = [];

/** 明日课程数据 */
export const MOCK_TOMORROW_COURSES: TodayCourseItem[] = [
  {
    courseCode: 'VDZ02112704.11',
    courseName: '计算机组成原理',
    teacher: '袁小节',
    classroom: '教8栋814',
    startPeriod: 1,
    endPeriod: 2,
    periodLabel: '上午 1-2节',
    timeLabel: '08:00-09:35',
    isTomorrow: true,
  },
];

/** 课程详情数据 */
const HARMONY_DEV_DETAIL: CourseDetail = {
  courseCode: 'VDZ02119204.09',
  courseName: '鸿蒙应用开发初级认证',
  credit: 3,
  courseType: '专业拓展课程',
  college: '计算机学院',
  teacher: '曲昇港',
  scheduleDesc: '周一 上午 1-2节',
  weekRange: '第2-12周',
  classroom: '教7栋403',
  description: '学习鸿蒙应用开发基础，包括ArkTS语言、ArkUI框架、应用生命周期等。',
  prerequisites: '无',
  assessmentMethod: '考试+实验',
};

const SOFTWARE_ENG_DETAIL: CourseDetail = {
  courseCode: 'VDZ02102903.11',
  courseName: '软件工程',
  credit: 3,
  courseType: '专业核心课程',
  college: '计算机学院',
  teacher: '任永伟',
  scheduleDesc: '周一 下午 5-6节',
  weekRange: '第3-14周',
  classroom: '教8栋516',
  description: '学习软件开发过程、需求分析、系统设计、项目管理等软件工程核心知识。',
  prerequisites: '无',
  assessmentMethod: '考试+项目答辩',
};

export const MOCK_COURSE_DETAILS: Map<string, CourseDetail> = new Map([
  ['VDZ02119204.09', HARMONY_DEV_DETAIL],
  ['VDZ02102903.11', SOFTWARE_ENG_DETAIL],
]);

// ==================== 成绩数据 ====================

/** 当前学期成绩数据 */
export const MOCK_GRADES_CURRENT: GradeRecord[] = [
  {
    id: 'g001',
    semester: '2025-2026 第2学期',
    courseCode: 'VDZ02119204.09',
    courseSerial: 'VDZ02119204.09',
    courseName: '鸿蒙应用开发初级认证',
    courseType: '专业拓展课程',
    credit: 3,
    finalScore: 88,
    overallScore: 90,
    endScore: 90,
    isPublished: true,
    subScores: { regular: 92, midterm: 88, final: 88, experiment: 95 },
  },
  {
    id: 'g002',
    semester: '2025-2026 第2学期',
    courseCode: 'VDZ02112704.11',
    courseSerial: 'VDZ02112704.11',
    courseName: '计算机组成原理',
    courseType: '专业核心课程',
    credit: 4,
    finalScore: 85,
    overallScore: 87,
    endScore: 87,
    isPublished: true,
    subScores: { regular: 90, midterm: 0, final: 85, experiment: 88 },
  },
  {
    id: 'g003',
    semester: '2025-2026 第2学期',
    courseCode: 'VDZ02115104.10',
    courseSerial: 'VDZ02115104.10',
    courseName: '大型数据库管理与维护',
    courseType: '专业拓展课程',
    credit: 3,
    finalScore: 82,
    overallScore: 84,
    endScore: 84,
    isPublished: true,
    subScores: { regular: 85, midterm: 80, final: 82 },
  },
];

/** 历史学期成绩数据 */
export const MOCK_GRADES_HISTORY: GradeRecord[] = [
  {
    id: 'g004',
    semester: '2024-2025 第2学期',
    courseCode: 'VDZ02102903.11',
    courseSerial: 'VDZ02102903.11',
    courseName: '软件工程',
    courseType: '专业核心课程',
    credit: 3,
    finalScore: 90,
    overallScore: 91,
    endScore: 91,
    isPublished: true,
  },
  {
    id: 'g005',
    semester: '2024-2025 第2学期',
    courseCode: 'VDZ02103003.10',
    courseSerial: 'VDZ02103003.10',
    courseName: '编译原理',
    courseType: '专业核心课程',
    credit: 4,
    finalScore: 86,
    overallScore: 87,
    endScore: 87,
    isPublished: true,
  },
];

/** 成绩未发布（边界数据） */
export const MOCK_GRADES_UNPUBLISHED: GradeRecord[] = [
  {
    id: 'g006',
    semester: '2025-2026 第2学期',
    courseCode: 'VDZ02114904.10',
    courseSerial: 'VDZ02114904.10',
    courseName: '软件测试与管理',
    courseType: '专业拓展课程',
    credit: 3,
    finalScore: 0,
    overallScore: 0,
    endScore: 0,
    isPublished: false,
  },
];

/** 学期成绩汇总 */
export const MOCK_SEMESTER_SUMMARY: SemesterGradeSummary = {
  semester: '2025-2026 第2学期',
  totalCredit: 10,
  records: MOCK_GRADES_CURRENT,
};

// ==================== 选课数据 ====================

/** 本学期选课学分上限（课表全部课程学分合计） */
export const SEMESTER_MAX_CREDIT: number = 28;

/** 选课轮次信息 */
export const MOCK_SELECTION_ROUND: SelectionRound = {
  roundName: '2025-2026-2 学期正选',
  startTime: '2026-02-15 09:00',
  endTime: '2026-03-01 23:59',
  isActive: true,
  maxCredit: SEMESTER_MAX_CREDIT,
};

/** 可选课程列表 */
export const MOCK_SELECTABLE_COURSES: SelectableCourse[] = [
  {
    courseCode: 'VDZ02103003.10',
    courseName: '编译原理',
    teacher: '张毅恒',
    scheduleInfo: '周四 上午 1-4节 · 教7栋802',
    capacity: 60,
    enrolled: 52,
    credit: 4,
    courseType: '专业核心课程',
    isSelected: false,
  },
  {
    courseCode: 'VJW01102302.01',
    courseName: '博物馆展览鉴赏',
    teacher: '汪芷晔',
    scheduleInfo: '周四 晚上 9-10节 · 教10栋202',
    capacity: 50,
    enrolled: 35,
    credit: 2,
    courseType: '通识教育课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02119303.09',
    courseName: '鸿蒙移动应用开发综合实践',
    teacher: '王鑫',
    scheduleInfo: '周三 下午 5-8节 · 教9栋401',
    capacity: 50,
    enrolled: 42,
    credit: 4,
    courseType: '集中实践教学课程',
    isSelected: false,
  },
  {
    courseCode: 'VMK01100203.43',
    courseName: '中国近现代史纲要',
    teacher: '谢双明',
    scheduleInfo: '周二 下午 5-6节 · 教13栋205',
    capacity: 80,
    enrolled: 72,
    credit: 2,
    courseType: '通识教育课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02114904.10',
    courseName: '软件测试与管理',
    teacher: '卢超',
    scheduleInfo: '周三 上午 1-2节 · 教8栋611',
    capacity: 55,
    enrolled: 50,
    credit: 3,
    courseType: '专业拓展课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116fff',
    courseName: '数据结构与算法',
    teacher: '黄教授',
    scheduleInfo: '周二 上午 1-2节 · 教9栋203',
    capacity: 70,
    enrolled: 52,
    credit: 4,
    courseType: '专业核心课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116hhh',
    courseName: '计算机图形学',
    teacher: '吴老师',
    scheduleInfo: '周四 上午 1-2节 · 教6栋101',
    capacity: 50,
    enrolled: 28,
    credit: 3,
    courseType: '专业选修课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116iii',
    courseName: '数据库系统原理',
    teacher: '李教授',
    scheduleInfo: '周一 上午 3-4节 · 教9栋708',
    capacity: 60,
    enrolled: 48,
    credit: 3,
    courseType: '专业核心课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116jjj',
    courseName: '软件工程',
    teacher: '杨老师',
    scheduleInfo: '周五 上午 1-2节 · 教7栋201',
    capacity: 55,
    enrolled: 38,
    credit: 3,
    courseType: '专业核心课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116kkk',
    courseName: '数字图像处理',
    teacher: '孙老师',
    scheduleInfo: '周三 下午 7-8节 · 教10栋402',
    capacity: 45,
    enrolled: 22,
    credit: 2,
    courseType: '专业选修课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116lll',
    courseName: '云计算与大数据',
    teacher: '马教授',
    scheduleInfo: '周四 下午 5-6节 · 教10栋305',
    capacity: 60,
    enrolled: 33,
    credit: 3,
    courseType: '专业拓展课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116mmm',
    courseName: 'Linux系统管理',
    teacher: '赵老师',
    scheduleInfo: '周二 下午 7-8节 · 教8栋510',
    capacity: 50,
    enrolled: 42,
    credit: 2,
    courseType: '专业选修课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116nnn',
    courseName: '信息安全概论',
    teacher: '郑老师',
    scheduleInfo: '周五 上午 3-4节 · 教9栋201',
    capacity: 55,
    enrolled: 36,
    credit: 2,
    courseType: '专业拓展课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116ooo',
    courseName: '嵌入式系统设计',
    teacher: '冯老师',
    scheduleInfo: '周一 下午 7-8节 · 教6栋308',
    capacity: 45,
    enrolled: 25,
    credit: 3,
    courseType: '专业选修课程',
    isSelected: false,
  },
  {
    courseCode: 'VDZ02116ppp',
    courseName: '人工智能导论',
    teacher: '陈教授',
    scheduleInfo: '周三 上午 1-2节 · 教10栋405',
    capacity: 60,
    enrolled: 45,
    credit: 3,
    courseType: '专业拓展课程',
    isSelected: false,
  },
];

/** 已选课程列表 */
export const MOCK_MY_SELECTIONS: SelectableCourse[] = [
  {
    courseCode: 'VDZ02119204.09',
    courseName: '鸿蒙应用开发初级认证',
    teacher: '曲昇港',
    scheduleInfo: '周一 上午 1-2节 · 教7栋403',
    capacity: 60,
    enrolled: 48,
    credit: 3,
    courseType: '专业拓展课程',
    isSelected: true,
  },
  {
    courseCode: 'VDZ02102903.11',
    courseName: '软件工程',
    teacher: '任永伟',
    scheduleInfo: '周一 下午 5-6节 · 教8栋516',
    capacity: 60,
    enrolled: 55,
    credit: 3,
    courseType: '专业核心课程',
    isSelected: true,
  },
  {
    courseCode: 'VMK01100203.43',
    courseName: '中国近现代史纲要',
    teacher: '谢双明',
    scheduleInfo: '周二 下午 5-6节 · 教13栋205',
    capacity: 80,
    enrolled: 72,
    credit: 2,
    courseType: '通识教育课程',
    isSelected: true,
  },
];

// ==================== 评教数据 ====================

/** 评教任务列表（包含「开放评教/不在开放时间范围内」两种状态） */
export const MOCK_EVAL_TASKS: EvaluationTask[] = [
  {
    id: 'eval001',
    courseCode: 'VDZ02119204.09',
    courseName: '鸿蒙应用开发初级认证',
    courseType: '专业拓展课程',
    teacher: '曲昇港',
    semester: '2025-2026 第2学期',
    questionnaireName: '教师课堂教学情况学生问卷调查',
    status: 'closed', // 不在开放时间范围内
    openTime: '2026-06-01 00:00',
    closeTime: '2026-06-15 23:59',
    statusText: '不在开放时间范围内',
  },
  {
    id: 'eval002',
    courseCode: 'VDZ02102903.11',
    courseName: '软件工程',
    courseType: '专业核心课程',
    teacher: '任永伟',
    semester: '2025-2026 第2学期',
    questionnaireName: '教师课堂教学情况学生问卷调查',
    status: 'open', // 开放评教
    openTime: '2026-05-01 00:00',
    closeTime: '2026-06-30 23:59',
    statusText: '开放评教',
  },
  {
    id: 'eval003',
    courseCode: 'VDZ02114904.10',
    courseName: '软件测试与管理',
    courseType: '专业拓展课程',
    teacher: '卢超',
    semester: '2025-2026 第2学期',
    questionnaireName: '教师课堂教学情况学生问卷调查',
    status: 'submitted', // 已提交
    openTime: '2026-05-01 00:00',
    closeTime: '2026-06-30 23:59',
    statusText: '已提交',
  },
];

/** 评教问卷（开放评教时展示） */
export const MOCK_EVAL_QUESTIONNAIRE: EvaluationQuestionnaire = {
  taskId: 'eval002',
  questions: [
    {
      id: 'q1',
      index: 1,
      type: 'single',
      title: '教师的教学态度是否认真负责？',
      options: [
        { id: 'q1_o1', label: '非常认真', score: 5 },
        { id: 'q1_o2', label: '比较认真', score: 4 },
        { id: 'q1_o3', label: '一般', score: 3 },
        { id: 'q1_o4', label: '不太认真', score: 2 },
        { id: 'q1_o5', label: '很不认真', score: 1 },
      ],
      required: true,
    },
    {
      id: 'q2',
      index: 2,
      type: 'single',
      title: '教师的教学内容是否充实、有条理？',
      options: [
        { id: 'q2_o1', label: '非常充实', score: 5 },
        { id: 'q2_o2', label: '比较充实', score: 4 },
        { id: 'q2_o3', label: '一般', score: 3 },
        { id: 'q2_o4', label: '不太充实', score: 2 },
        { id: 'q2_o5', label: '很不充实', score: 1 },
      ],
      required: true,
    },
    {
      id: 'q3',
      index: 3,
      type: 'multi',
      title: '教师采用了哪些教学方法？（多选）',
      options: [
        { id: 'q3_o1', label: '课堂讲授', score: 1 },
        { id: 'q3_o2', label: '案例分析', score: 1 },
        { id: 'q3_o3', label: '小组讨论', score: 1 },
        { id: 'q3_o4', label: '实验实践', score: 1 },
        { id: 'q3_o5', label: '在线学习', score: 1 },
      ],
      required: false,
    },
    {
      id: 'q4',
      index: 4,
      type: 'star',
      title: '您对这门课程的总体满意度？',
      options: [],
      required: true,
    },
    {
      id: 'q5',
      index: 5,
      type: 'text',
      title: '您对这门课程或教师有什么建议？（选填）',
      options: [],
      required: false,
    },
  ],
};

/** 评教问卷题目（页面引用） */
export const MOCK_EVAL_QUESTIONS: EvaluationQuestion[] = MOCK_EVAL_QUESTIONNAIRE.questions;

// ==================== 通知公告数据 ====================

export const MOCK_NOTICES: NoticeItem[] = [
  {
    id: 'n001',
    title: '关于 2025-2026-1 学期选课安排的通知',
    content: '各学院、各位同学：\n\n2025-2026学年第一学期选课工作即将开始，现将有关事项通知如下：\n一、选课时间\n正选阶段：2025年8月20日9:00至9月5日23:59\n补选阶段：2025年9月10日9:00至9月15日23:59\n\n二、选课要求\n1. 请同学们在规定时间内完成选课，逾期不予补选。\n2. 选课结果以最终确认为准，请关注选课结果公示。\n\n教务处\n2025年8月10日',
    publisher: '教务处',
    publishTime: '2025-08-10 09:00',
    isRead: false,
    type: '通知',
  },
  {
    id: 'n002',
    title: '关于2025-2026学年校历安排的通知',
    content: '2025-2026学年校历已发布，请各位同学查看。\n第一学期：2025年9月1日至2026年1月18日\n第二学期：2026年2月24日至2026年7月5日',
    publisher: '教务处',
    publishTime: '2025-07-20 10:00',
    isRead: true,
    type: '通知',
  },
  {
    id: 'n003',
    title: '关于期末考试安排的通知',
    content: '2025-2026-1学期期末考试安排已发布，请同学们及时查看考试安排，做好复习准备。',
    publisher: '教务处',
    publishTime: '2025-12-20 14:00',
    isRead: false,
    type: '考试通知',
  },
];

// ==================== 考试安排数据 ====================

export const MOCK_EXAMS: ExamArrangement[] = [
  {
    id: 'e001',
    courseName: '鸿蒙应用开发初级认证',
    examType: '期末考试',
    examDate: '2026-06-20',
    examTime: '09:00-11:00',
    examRoom: '教7栋201',
    seatNumber: 'A15',
    semester: '2025-2026 第2学期',
    notes: '请携带学生证和身份证，提前15分钟入场。',
  },
  {
    id: 'e002',
    courseName: '计算机组成原理',
    examType: '期末考试',
    examDate: '2026-06-22',
    examTime: '14:00-16:00',
    examRoom: '教8栋501',
    seatNumber: 'B08',
    semester: '2025-2026 第2学期',
    notes: '闭卷考试，请携带2B铅笔和黑色签字笔。',
  },
  {
    id: 'e003',
    courseName: '软件工程',
    examType: '项目答辩',
    examDate: '2026-06-25',
    examTime: '14:00-17:00',
    examRoom: '教8栋516',
    seatNumber: '—',
    semester: '2025-2026 第2学期',
    notes: '请准备好项目演示PPT，每组答辩时间15分钟。',
  },
];

// ==================== 作业/实验数据（扩展功能）====================

export const MOCK_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: 'a001',
    courseName: '鸿蒙应用开发初级认证',
    courseCode: 'VDZ02119204.09',
    title: '实验一：ArkUI基础组件练习',
    description: '使用ArkUI框架实现常见UI组件（Text、Button、List等）的页面布局。',
    deadline: '2026-04-15 23:59',
    status: 'submitted',
    statusText: '已提交',
    score: 92,
    comment: '布局合理，组件使用恰当，UI效果良好。',
    attachmentRequired: true,
  },
  {
    id: 'a002',
    courseName: '软件工程',
    courseCode: 'VDZ02102903.11',
    title: '实验一：软件需求规格说明书',
    description: '自选项目，编写完整的软件需求规格说明书。',
    deadline: '2026-04-20 23:59',
    status: 'not_submitted',
    statusText: '未提交',
    attachmentRequired: true,
  },
  {
    id: 'a003',
    courseName: '鸿蒙移动应用开发综合实践',
    courseCode: 'VDZ02119303.09',
    title: '项目中期报告',
    description: '提交鸿蒙应用开发项目中期报告，包括需求分析、系统设计、进度安排。',
    deadline: '2026-05-15 23:59',
    status: 'graded',
    statusText: '已批改',
    score: 88,
    comment: '需求分析较完整，系统设计合理，进度安排可行。',
    attachmentRequired: true,
  },
];

// ==================== 全局配置数据 ====================

/** 当前学年学期 */
export const CURRENT_SEMESTER: string = '2025-2026 第2学期';

/** 当前教学周 */
export const CURRENT_WEEK: number = 11;

/** 学年学期选项 */
export const SEMESTER_OPTIONS: string[] = [
  '2025-2026 第2学期',
  '2025-2026 第1学期',
  '2024-2025 第2学期',
  '2024-2025 第1学期',
];

/** 教学周选项（1-20周） */
export function getWeekOptions(): string[] {
  const options: string[] = ['全部'];
  for (let i = 1; i <= 20; i++) {
    options.push(`第${i}周`);
  }
  return options;
}

/** 所有可登录的学生账号列表 */
const VALID_STUDENTS: StudentUser[] = [MOCK_STUDENT, MOCK_STUDENT_2];

/** 登录学号验证：学号需匹配已注册学生 */
export function isValidStudentId(studentId: string): boolean {
  if (!studentId || studentId.trim().length === 0) {
    return false;
  }
  return VALID_STUDENTS.some((s: StudentUser) => s.studentId === studentId.trim());
}

/** 登录密码验证：校验学号与密码是否匹配已注册学生 */
export function validatePassword(studentId: string, password: string): boolean {
  if (!password || password.length === 0) {
    return false;
  }
  const student = VALID_STUDENTS.find((s: StudentUser) => s.studentId === studentId.trim());
  if (!student) {
    return false;
  }
  return student.password === password;
}

/** 根据学号获取学生信息 */
export function getStudentById(studentId: string): StudentUser | undefined {
  return VALID_STUDENTS.find((s: StudentUser) => s.studentId === studentId.trim());
}
