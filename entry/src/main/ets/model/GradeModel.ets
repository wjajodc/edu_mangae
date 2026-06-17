/**
 * 成绩相关数据模型接口
 * 对应需求文档 4.11
 */

/** 成绩记录 */
export interface GradeRecord {
  /** 记录ID */
  id: string;
  /** 学年学期（如"2025-2026 第1学期"） */
  semester: string;
  /** 课程代码 */
  courseCode: string;
  /** 课程序号（教学班号） */
  courseSerial: string;
  /** 课程名称 */
  courseName: string;
  /** 课程类别 */
  courseType: string;
  /** 学分 */
  credit: number;
  /** 期末成绩 */
  finalScore: number;
  /** 总评成绩 */
  overallScore: number;
  /** 最终成绩 */
  endScore: number;
  /** 是否已发布 */
  isPublished: boolean;
  /** 分项成绩（可选） */
  subScores?: SubScores;
}

/** 分项成绩 */
export interface SubScores {
  /** 平时成绩 */
  regular: number;
  /** 期中成绩 */
  midterm: number;
  /** 期末成绩 */
  final: number;
  /** 实验成绩 */
  experiment?: number;
}

/** 学期汇总统计 */
export interface SemesterSummary {
  totalCredit: number;
}

/** 学期成绩汇总 */
export interface SemesterGradeSummary {
  /** 学年学期 */
  semester: string;
  /** 总学分 */
  totalCredit: number;
  /** 成绩记录列表 */
  records: GradeRecord[];
}

/** 考试安排 */
export interface ExamArrangement {
  /** 考试ID */
  id: string;
  /** 课程名称 */
  courseName: string;
  /** 考试类型（期末考试/期中考试/补考） */
  examType: string;
  /** 考试日期 */
  examDate: string;
  /** 考试时间 */
  examTime: string;
  /** 考场 */
  examRoom: string;
  /** 座位号 */
  seatNumber: string;
  /** 学年学期 */
  semester: string;
  /** 注意事项 */
  notes: string;
}
