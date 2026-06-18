/**
 * 量化评教相关数据模型接口
 * 对应需求文档 4.15
 */

/** 评教任务 */
export interface EvaluationTask {
  /** 任务ID */
  id: string;
  /** 课程序号 */
  courseCode: string;
  /** 课程名称 */
  courseName: string;
  /** 课程类别 */
  courseType: string;
  /** 授课教师 */
  teacher: string;
  /** 学年学期 */
  semester: string;
  /** 问卷名称 */
  questionnaireName: string;
  /** 评教状态：open=开放评教, closed=不在开放时间范围内, submitted=已提交 */
  status: string;
  /** 开放开始时间 */
  openTime: string;
  /** 开放结束时间 */
  closeTime: string;
  /** 状态文案 */
  statusText: string;
}

/** 评教问卷题目 */
export interface EvaluationQuestion {
  /** 题目ID */
  id: string;
  /** 题号 */
  index: number;
  /** 题目类型：single=单选, multi=多选, star=星级评分, text=主观题 */
  type: string;
  /** 题目内容 */
  title: string;
  /** 选项列表（单选/多选时使用） */
  options: EvaluationOption[];
  /** 是否必填 */
  required: boolean;
  /** 作答结果（页面内使用） */
  answer?: string | string[] | number;
}

/** 评教问卷选项 */
export interface EvaluationOption {
  /** 选项ID */
  id: string;
  /** 选项文本 */
  label: string;
  /** 分值 */
  score: number;
}

/** 评教答卷（单题答案） */
export interface EvaluationAnswer {
  /** 题目ID */
  questionId: string;
  /** 答案：单选为选项ID字符串，多选为选项ID数组，星级为数字，主观题为文本 */
  value: string | string[] | number;
}

/** 完整的评教问卷 */
export interface EvaluationQuestionnaire {
  /** 评教任务ID */
  taskId: string;
  /** 题目列表 */
  questions: EvaluationQuestion[];
}
