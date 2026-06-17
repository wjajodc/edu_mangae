/**
 * 课程相关数据模型接口
 * 对应需求文档 4.7、4.8、4.9、4.10 等章节
 */

/** 课程基本信息 */
export interface Course {
  /** 课程序号（教学班号） */
  courseCode: string;
  /** 课程名称 */
  courseName: string;
  /** 学分 */
  credit: number;
  /** 课程性质：必修/选修/公选/专业拓展/集中实践等 */
  courseType: string;
  /** 开课学院 */
  college: string;
  /** 教师姓名 */
  teacher: string;
  /** 上课地点/教室 */
  classroom: string;
  /** 容量（最大选课人数） */
  capacity: number;
  /** 已选人数 */
  enrolled: number;
  /** 上课周次范围（如"2-9周"） */
  weekRange: string;
  /** 起止周数字 [起始周, 结束周] */
  weeks: [number, number];
  /** 单双周标记：0=每周, 1=单周, 2=双周 */
  weekType: number;
  /** 课程简介 */
  description: string;
  /** 上课时间安排 */
  timeSlots: CourseTimeSlot[];
}

/** 课程上课时间 */
export interface CourseTimeSlot {
  /** 星期（1-7，1=周一） */
  dayOfWeek: number;
  /** 起始节次 */
  startPeriod: number;
  /** 结束节次 */
  endPeriod: number;
  /** 上课时间描述（如"上午 1-2 节"） */
  timeLabel: string;
  /** 时间段（am/pm/eve） */
  timeSegment: string;
}

/** 课表单元格数据 */
export interface ScheduleCell {
  /** 所属课程序号 */
  courseCode: string;
  /** 课程名称 */
  courseName: string;
  /** 教师 */
  teacher: string;
  /** 教室 */
  classroom: string;
  /** 周次范围 */
  weekRange: string;
  /** 星期 */
  dayOfWeek: number;
  /** 起始节次 */
  startPeriod: number;
  /** 结束节次 */
  endPeriod: number;
  /** 跨越节次数 */
  span: number;
  /** 是否连续课程（前一格已展示同名课程） */
  isContinued: boolean;
  /** 课表类型：normal=普通课表, practice=实践课表 */
  scheduleType: string;
  /** 出现的教学周列表 */
  weeks?: number[];
}

/** 导入课表中的课程条目 */
export interface ScheduleEntry {
  courseCode: string;
  courseName: string;
  teacher: string;
  classroom: string;
  dayOfWeek: number;
  startPeriod: number;
  endPeriod: number;
  span: number;
  weeks: number[];
  weekRangeText: string;
}

/** 导入课表完整数据 */
export interface ImportedSchedule {
  semester: string;
  studentId: string;
  studentName: string;
  className: string;
  entries: ScheduleEntry[];
  maxWeek: number;
}

/** 学期元信息（学年 + 第几学期） */
export interface SemesterMeta {
  /** 唯一键，如 2025-2026-2 */
  key: string;
  /** 学年范围，如 2025-2026 */
  yearRange: string;
  /** 学期序号：1 或 2 */
  term: number;
  /** 展示标签，如 2025-2026学年2学期 */
  displayLabel: string;
  /** 原始解析文本 */
  rawLabel: string;
}

/** 已导入课表的学年学期目录（仅含已导入数据） */
export interface YearSemesterGroup {
  yearRange: string;
  terms: number[];
}

/** 今日课程条目 */
export interface TodayCourseItem {
  /** 课程序号 */
  courseCode: string;
  /** 课程名称 */
  courseName: string;
  /** 教师 */
  teacher: string;
  /** 教室 */
  classroom: string;
  /** 起始节次 */
  startPeriod: number;
  /** 结束节次 */
  endPeriod: number;
  /** 节次描述 */
  periodLabel: string;
  /** 上课时间 */
  timeLabel: string;
  /** 是否为明天课程 */
  isTomorrow: boolean;
}

/** 课程详情 */
export interface CourseDetail {
  /** 课程序号 */
  courseCode: string;
  /** 课程名称 */
  courseName: string;
  /** 学分 */
  credit: number;
  /** 课程性质 */
  courseType: string;
  /** 开课学院 */
  college: string;
  /** 教师 */
  teacher: string;
  /** 上课时间描述 */
  scheduleDesc: string;
  /** 周次 */
  weekRange: string;
  /** 教室 */
  classroom: string;
  /** 课程简介 */
  description: string;
  /** 先修课程 */
  prerequisites: string;
  /** 考核方式 */
  assessmentMethod: string;
}

/** 选课轮次信息 */
export interface SelectionRound {
  /** 轮次名称（如"2025-2026-1 正选"） */
  roundName: string;
  /** 开始时间 */
  startTime: string;
  /** 结束时间 */
  endTime: string;
  /** 是否在选课时间内 */
  isActive: boolean;
  /** 学分上限 */
  maxCredit: number;
}

/** 可选课程列表项 */
export interface SelectableCourse {
  /** 课程序号 */
  courseCode: string;
  /** 课程名称 */
  courseName: string;
  /** 教师 */
  teacher: string;
  /** 上课时间地点 */
  scheduleInfo: string;
  /** 容量 */
  capacity: number;
  /** 已选人数 */
  enrolled: number;
  /** 学分 */
  credit: number;
  /** 课程类型 */
  courseType: string;
  /** 是否已选 */
  isSelected: boolean;
}

/** 选课操作结果 */
export interface SelectionResult {
  /** 是否成功 */
  success: boolean;
  /** 结果消息 */
  message: string;
  /** 失败类型：time_conflict/capacity_full/not_in_round/credit_exceed/duplicate */
  failType: string;
}
