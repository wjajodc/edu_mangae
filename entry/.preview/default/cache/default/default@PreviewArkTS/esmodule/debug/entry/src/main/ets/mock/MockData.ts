import type { StudentUser } from '../model/UserModel';
import type { Course, CourseDetail, ScheduleCell, SelectableCourse, SelectionRound, TodayCourseItem } from '../model/CourseModel';
import type { GradeRecord, SemesterGradeSummary, ExamArrangement } from '../model/GradeModel';
import type { EvaluationTask, EvaluationQuestion, EvaluationQuestionnaire } from '../model/EvalModel';
import type { NoticeItem, StudentStatus, AssignmentItem } from '../model/CommonModel';
// ==================== 学生用户数据 ====================
/** 演示学生用户（对应 app.js 中的 DEMO_STUDENT） */
export const MOCK_STUDENT: StudentUser = {
    studentId: '2024316020318',
    name: '林予宸',
    password: 'demo',
    college: '计算机学院',
    major: '计算机科学与技术',
    className: '23计科U3班',
    grade: '2024',
    phone: '138****0000',
    email: '2024316020318@school.edu.cn',
    address: '广东省深圳市南山区xx路xx号',
    avatarInitial: '林',
};
/** 额外学生用户（用于边界测试） */
export const MOCK_STUDENT_2: StudentUser = {
    studentId: '2024316020320',
    name: '张三',
    password: '123456',
    college: '计算机学院',
    major: '计算机科学与技术',
    className: '23计科U3班',
    grade: '2024',
    phone: '139****1111',
    email: '2024316020320@school.edu.cn',
    address: '广东省广州市天河区xx路xx号',
    avatarInitial: '张',
};
// ==================== 学籍数据 ====================
/** 学籍信息（对标 Web 学籍信息字段） */
export const MOCK_STUDENT_STATUS: StudentStatus = {
    studentId: '2024316020318',
    name: '林予宸',
    englishName: 'Lin Yuchen',
    gender: '男',
    grade: '2024',
    schoolSystem: '4年',
    program: '本科',
    educationLevel: '普通本科',
    studentCategory: '全日制',
    major: '计算机科学与技术',
    department: '计算机学院',
    adminDepartment: '计算机学院',
    direction: '—',
    className: '23计科U3班',
    enrollmentDate: '2024-09-01',
    expectedGraduation: '2028-07-01',
    studyMode: '全日制',
    isRegistered: '是',
    isOnCampus: '是',
    campus: '主校区',
    status: '在校',
    statusEffectiveDate: '2024-09-01',
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
        courseCode: 'VDZ02115204.06',
        courseName: 'Web 前端应用',
        credit: 3,
        courseType: '专业拓展课程',
        college: '计算机学院',
        teacher: '石雅莹',
        classroom: '教8栋613',
        capacity: 60,
        enrolled: 48,
        weekRange: '2-9周',
        weeks: [2, 9],
        weekType: 0,
        description: '本课程介绍Web前端开发基础，包括HTML、CSS、JavaScript及主流框架。',
        timeSlots: [
            { dayOfWeek: 1, startPeriod: 1, endPeriod: 2, timeLabel: '上午 1-2节', timeSegment: 'am' },
        ],
    },
    {
        courseCode: 'VDZ02115204.xx',
        courseName: '软件综合实践',
        credit: 4,
        courseType: '集中实践教学课程',
        college: '计算机学院',
        teacher: '李国强',
        classroom: '教9栋708',
        capacity: 50,
        enrolled: 42,
        weekRange: '按教务安排',
        weeks: [1, 16],
        weekType: 0,
        description: '集中实践课程，完成一个完整的软件项目。',
        timeSlots: [
            { dayOfWeek: 2, startPeriod: 5, endPeriod: 8, timeLabel: '下午 5-8节（连上）', timeSegment: 'pm' },
        ],
    },
    {
        courseCode: 'VDZ02115xxx',
        courseName: '大型数据库管理与维护',
        credit: 3,
        courseType: '专业拓展课程',
        college: '计算机学院',
        teacher: '李国强',
        classroom: '教9栋708',
        capacity: 55,
        enrolled: 50,
        weekRange: '3-14周',
        weeks: [3, 14],
        weekType: 0,
        description: '学习大型数据库的设计、管理与维护。',
        timeSlots: [
            { dayOfWeek: 5, startPeriod: 1, endPeriod: 2, timeLabel: '上午 1-2节', timeSegment: 'am' },
        ],
    },
    {
        courseCode: 'VDZ02115yyy',
        courseName: '移动应用开发',
        credit: 3,
        courseType: '专业核心课程',
        college: '计算机学院',
        teacher: '王老师',
        classroom: '教6栋201',
        capacity: 60,
        enrolled: 55,
        weekRange: '1-16周',
        weeks: [1, 16],
        weekType: 0,
        description: '学习移动应用开发，包括Android和HarmonyOS平台。',
        timeSlots: [
            { dayOfWeek: 2, startPeriod: 3, endPeriod: 4, timeLabel: '上午 3-4节', timeSegment: 'am' },
        ],
    },
    {
        courseCode: 'VDZ02115zzz',
        courseName: '操作系统',
        credit: 4,
        courseType: '专业核心课程',
        college: '计算机学院',
        teacher: '赵老师',
        classroom: '教7栋410',
        capacity: 65,
        enrolled: 60,
        weekRange: '3-14周',
        weeks: [3, 14],
        weekType: 0,
        description: '学习操作系统原理，包括进程管理、内存管理、文件系统等。',
        timeSlots: [
            { dayOfWeek: 4, startPeriod: 3, endPeriod: 4, timeLabel: '上午 3-4节', timeSegment: 'am' },
        ],
    },
];
// ==================== 课表数据 ====================
/** 课表单元格数据（对应 HTML 原型中的课表格子） */
export const MOCK_SCHEDULE_CELLS: ScheduleCell[] = [
    // 周一 1-2节：Web前端应用
    { courseCode: 'VDZ02115204.06', courseName: 'Web 前端应用', teacher: '石雅莹', classroom: '教8栋613', weekRange: '2-9周', dayOfWeek: 1, startPeriod: 1, endPeriod: 2, span: 2, isContinued: false, scheduleType: 'normal' },
    // 周二 3-4节：移动应用开发
    { courseCode: 'VDZ02115yyy', courseName: '移动应用开发', teacher: '王老师', classroom: '教6栋201', weekRange: '1-16周', dayOfWeek: 2, startPeriod: 3, endPeriod: 4, span: 2, isContinued: false, scheduleType: 'normal' },
    // 周二 5-8节：软件综合实践（连上）
    { courseCode: 'VDZ02115204.xx', courseName: '软件综合实践', teacher: '李国强', classroom: '教9栋708', weekRange: '按教务安排', dayOfWeek: 2, startPeriod: 5, endPeriod: 8, span: 4, isContinued: false, scheduleType: 'normal' },
    // 周三 空
    // 周四 3-4节：操作系统
    { courseCode: 'VDZ02115zzz', courseName: '操作系统', teacher: '赵老师', classroom: '教7栋410', weekRange: '3-14周', dayOfWeek: 4, startPeriod: 3, endPeriod: 4, span: 2, isContinued: false, scheduleType: 'normal' },
    // 周五 1-2节：大型数据库
    { courseCode: 'VDZ02115xxx', courseName: '大型数据库管理与维护', teacher: '李国强', classroom: '教9栋708', weekRange: '3-14周', dayOfWeek: 5, startPeriod: 1, endPeriod: 2, span: 2, isContinued: false, scheduleType: 'normal' },
];
/** 实践课表数据 */
export const MOCK_PRACTICE_SCHEDULE: ScheduleCell[] = [
    { courseCode: 'PRAC001', courseName: '企业实习', teacher: '李老师', classroom: '校外实习基地', weekRange: '1-16周', dayOfWeek: 3, startPeriod: 5, endPeriod: 8, span: 4, isContinued: false, scheduleType: 'practice' },
    { courseCode: 'PRAC002', courseName: '课程设计', teacher: '王老师', classroom: '教5栋301', weekRange: '10-14周', dayOfWeek: 5, startPeriod: 5, endPeriod: 6, span: 2, isContinued: false, scheduleType: 'practice' },
];
/** 今日课程数据 */
export const MOCK_TODAY_COURSES: TodayCourseItem[] = [
    {
        courseCode: 'VDZ02115204.06',
        courseName: 'Web 前端应用',
        teacher: '石雅莹',
        classroom: '教8栋613',
        startPeriod: 1,
        endPeriod: 2,
        periodLabel: '上午 1-2节',
        timeLabel: '08:00-09:35',
        isTomorrow: false,
    },
    {
        courseCode: 'VDZ02115204.xx',
        courseName: '软件综合实践',
        teacher: '李国强',
        classroom: '教9栋708',
        startPeriod: 5,
        endPeriod: 8,
        periodLabel: '下午 5-8节',
        timeLabel: '14:00-17:25',
        isTomorrow: false,
    },
];
/** 空今日课程（边界数据） */
export const MOCK_TODAY_COURSES_EMPTY: TodayCourseItem[] = [];
/** 明日课程数据 */
export const MOCK_TOMORROW_COURSES: TodayCourseItem[] = [
    {
        courseCode: 'VDZ02115yyy',
        courseName: '移动应用开发',
        teacher: '王老师',
        classroom: '教6栋201',
        startPeriod: 3,
        endPeriod: 4,
        periodLabel: '上午 3-4节',
        timeLabel: '09:50-11:25',
        isTomorrow: true,
    },
];
/** 课程详情数据 */
const WEB_FRONTEND_DETAIL: CourseDetail = {
    courseCode: 'VDZ02115204.06',
    courseName: 'Web 前端应用',
    credit: 3,
    courseType: '专业拓展课程',
    college: '计算机学院',
    teacher: '石雅莹',
    scheduleDesc: '周一 上午 1-2节',
    weekRange: '第2-9周',
    classroom: '教8栋613',
    description: '本课程介绍Web前端开发基础，包括HTML、CSS、JavaScript及主流框架。',
    prerequisites: '无',
    assessmentMethod: '考试+实验',
};
const SOFTWARE_PRACTICE_DETAIL: CourseDetail = {
    courseCode: 'VDZ02115204.xx',
    courseName: '软件综合实践',
    credit: 4,
    courseType: '集中实践教学课程',
    college: '计算机学院',
    teacher: '李国强',
    scheduleDesc: '周二 下午 5-8节（连上）',
    weekRange: '按教务安排',
    classroom: '教9栋708',
    description: '集中实践课程，完成一个完整的软件项目。',
    prerequisites: 'Web前端应用',
    assessmentMethod: '项目答辩',
};
export const MOCK_COURSE_DETAILS: Map<string, CourseDetail> = new Map([
    ['VDZ02115204.06', WEB_FRONTEND_DETAIL],
    ['VDZ02115204.xx', SOFTWARE_PRACTICE_DETAIL],
]);
// ==================== 成绩数据 ====================
/** 当前学期成绩数据（对应 app.js 中的 gradeData） */
export const MOCK_GRADES_CURRENT: GradeRecord[] = [
    {
        id: 'g001',
        semester: '2025-2026 第1学期',
        courseCode: 'VDZ02115204.06',
        courseSerial: 'VDZ02115204.06',
        courseName: 'Web 前端应用',
        courseType: '专业拓展课程',
        credit: 3,
        finalScore: 88,
        overallScore: 90,
        endScore: 90,
        gpa: 4.0,
        isPublished: true,
        subScores: { regular: 92, midterm: 88, final: 88, experiment: 95 },
    },
    {
        id: 'g002',
        semester: '2025-2026 第1学期',
        courseCode: 'VDZ02115204.xx',
        courseSerial: 'VDZ02115204.xx',
        courseName: '软件综合实践',
        courseType: '集中实践教学课程',
        credit: 4,
        finalScore: 85,
        overallScore: 87,
        endScore: 87,
        gpa: 3.7,
        isPublished: true,
        subScores: { regular: 90, midterm: 0, final: 85, experiment: 88 },
    },
    {
        id: 'g003',
        semester: '2025-2026 第1学期',
        courseCode: 'VDZ02115xxx',
        courseSerial: 'VDZ02115xxx',
        courseName: '大型数据库管理与维护',
        courseType: '专业拓展课程',
        credit: 3,
        finalScore: 82,
        overallScore: 84,
        endScore: 84,
        gpa: 3.3,
        isPublished: true,
        subScores: { regular: 85, midterm: 80, final: 82 },
    },
];
/** 历史学期成绩数据 */
export const MOCK_GRADES_HISTORY: GradeRecord[] = [
    {
        id: 'g004',
        semester: '2024-2025 第2学期',
        courseCode: 'VDZ02114aaa',
        courseSerial: 'VDZ02114aaa',
        courseName: '数据结构',
        courseType: '专业核心课程',
        credit: 4,
        finalScore: 90,
        overallScore: 91,
        endScore: 91,
        gpa: 4.0,
        isPublished: true,
    },
    {
        id: 'g005',
        semester: '2024-2025 第2学期',
        courseCode: 'VDZ02114bbb',
        courseSerial: 'VDZ02114bbb',
        courseName: '计算机网络',
        courseType: '专业核心课程',
        credit: 3,
        finalScore: 86,
        overallScore: 87,
        endScore: 87,
        gpa: 3.7,
        isPublished: true,
    },
];
/** 成绩未发布（边界数据） */
export const MOCK_GRADES_UNPUBLISHED: GradeRecord[] = [
    {
        id: 'g006',
        semester: '2025-2026 第2学期',
        courseCode: 'VDZ02116aaa',
        courseSerial: 'VDZ02116aaa',
        courseName: '人工智能导论',
        courseType: '专业拓展课程',
        credit: 3,
        finalScore: 0,
        overallScore: 0,
        endScore: 0,
        gpa: 0,
        isPublished: false,
    },
];
/** 学期成绩汇总 */
export const MOCK_SEMESTER_SUMMARY: SemesterGradeSummary = {
    semester: '2025-2026 第1学期',
    totalCredit: 10,
    avgGpa: 3.67,
    weightedAvg: 86.3,
    records: MOCK_GRADES_CURRENT,
};
// ==================== 选课数据 ====================
/** 选课轮次信息 */
export const MOCK_SELECTION_ROUND: SelectionRound = {
    roundName: '2025-2026-1 学期正选',
    startTime: '2025-08-20 09:00',
    endTime: '2025-09-05 23:59',
    isActive: true,
    maxCredit: 30,
};
/** 可选课程列表 */
export const MOCK_SELECTABLE_COURSES: SelectableCourse[] = [
    {
        courseCode: 'VDZ02116aaa',
        courseName: '人工智能导论',
        teacher: '陈教授',
        scheduleInfo: '周三 上午 1-2节 · 教10栋405',
        capacity: 60,
        enrolled: 45,
        credit: 3,
        courseType: '专业拓展课程',
        isSelected: false,
    },
    {
        courseCode: 'VDZ02116bbb',
        courseName: '机器学习',
        teacher: '刘老师',
        scheduleInfo: '周四 上午 3-4节 · 教10栋501',
        capacity: 50,
        enrolled: 50,
        credit: 3,
        courseType: '专业拓展课程',
        isSelected: false,
    },
    {
        courseCode: 'VDZ02116ccc',
        courseName: '软件测试技术',
        teacher: '张老师',
        scheduleInfo: '周五 下午 5-6节 · 教8栋312',
        capacity: 55,
        enrolled: 30,
        credit: 2,
        courseType: '专业选修课程',
        isSelected: true, // 已选
    },
    {
        courseCode: 'VDZ02116ddd',
        courseName: '移动应用开发（鸿蒙）',
        teacher: '王老师',
        scheduleInfo: '周二 上午 3-4节 · 教6栋201',
        capacity: 60,
        enrolled: 58,
        credit: 3,
        courseType: '专业核心课程',
        isSelected: false,
    },
];
/** 已选课程列表 */
export const MOCK_MY_SELECTIONS: SelectableCourse[] = [
    {
        courseCode: 'VDZ02115204.06',
        courseName: 'Web 前端应用',
        teacher: '石雅莹',
        scheduleInfo: '周一 上午 1-2节 · 教8栋613',
        capacity: 60,
        enrolled: 48,
        credit: 3,
        courseType: '专业拓展课程',
        isSelected: true,
    },
    {
        courseCode: 'VDZ02115204.xx',
        courseName: '软件综合实践',
        teacher: '李国强',
        scheduleInfo: '周二 下午 5-8节 · 教9栋708',
        capacity: 50,
        enrolled: 42,
        credit: 4,
        courseType: '集中实践教学课程',
        isSelected: true,
    },
    {
        courseCode: 'VDZ02116ccc',
        courseName: '软件测试技术',
        teacher: '张老师',
        scheduleInfo: '周五 下午 5-6节 · 教8栋312',
        capacity: 55,
        enrolled: 30,
        credit: 2,
        courseType: '专业选修课程',
        isSelected: true,
    },
];
// ==================== 评教数据 ====================
/** 评教任务列表（包含「开放评教/不在开放时间范围内」两种状态） */
export const MOCK_EVAL_TASKS: EvaluationTask[] = [
    {
        id: 'eval001',
        courseCode: 'VDZ02115204.06',
        courseName: 'Web 前端应用',
        courseType: '专业拓展课程',
        teacher: '石雅莹',
        semester: '2025-2026 第1学期',
        questionnaireName: '教师课堂教学情况学生问卷调查',
        status: 'closed',
        openTime: '2026-01-01 00:00',
        closeTime: '2026-01-15 23:59',
        statusText: '不在开放时间范围内',
    },
    {
        id: 'eval002',
        courseCode: 'VDZ02115204.xx',
        courseName: '软件综合实践',
        courseType: '集中实践教学课程',
        teacher: '李国强',
        semester: '2025-2026 第1学期',
        questionnaireName: '教师课堂教学情况学生问卷调查',
        status: 'open',
        openTime: '2025-12-01 00:00',
        closeTime: '2025-12-31 23:59',
        statusText: '开放评教',
    },
    {
        id: 'eval003',
        courseCode: 'VDZ02115xxx',
        courseName: '大型数据库管理与维护',
        courseType: '专业拓展课程',
        teacher: '李国强',
        semester: '2025-2026 第1学期',
        questionnaireName: '教师课堂教学情况学生问卷调查',
        status: 'submitted',
        openTime: '2025-12-01 00:00',
        closeTime: '2025-12-31 23:59',
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
        courseName: 'Web 前端应用',
        examType: '期末考试',
        examDate: '2026-01-10',
        examTime: '09:00-11:00',
        examRoom: '教8栋201',
        seatNumber: 'A15',
        semester: '2025-2026 第1学期',
        notes: '请携带学生证和身份证，提前15分钟入场。',
    },
    {
        id: 'e002',
        courseName: '软件综合实践',
        examType: '项目答辩',
        examDate: '2026-01-12',
        examTime: '14:00-17:00',
        examRoom: '教9栋708',
        seatNumber: '—',
        semester: '2025-2026 第1学期',
        notes: '请准备好项目演示PPT，每组答辩时间15分钟。',
    },
    {
        id: 'e003',
        courseName: '大型数据库管理与维护',
        examType: '期末考试',
        examDate: '2026-01-14',
        examTime: '09:00-11:00',
        examRoom: '教9栋405',
        seatNumber: 'B08',
        semester: '2025-2026 第1学期',
        notes: '闭卷考试，请携带2B铅笔和黑色签字笔。',
    },
];
// ==================== 作业/实验数据（扩展功能）====================
export const MOCK_ASSIGNMENTS: AssignmentItem[] = [
    {
        id: 'a001',
        courseName: 'Web 前端应用',
        courseCode: 'VDZ02115204.06',
        title: '实验一：个人简历页面',
        description: '使用HTML+CSS制作一个个人简历页面，要求响应式布局。',
        deadline: '2025-10-15 23:59',
        status: 'submitted',
        statusText: '已提交',
        score: 92,
        comment: '页面布局合理，响应式效果良好，但颜色搭配可以优化。',
        attachmentRequired: true,
    },
    {
        id: 'a002',
        courseName: 'Web 前端应用',
        courseCode: 'VDZ02115204.06',
        title: '实验二：ToDo List应用',
        description: '使用JavaScript实现一个ToDo List应用，支持增删改查。',
        deadline: '2025-11-01 23:59',
        status: 'not_submitted',
        statusText: '未提交',
        attachmentRequired: true,
    },
    {
        id: 'a003',
        courseName: '软件综合实践',
        courseCode: 'VDZ02115204.xx',
        title: '项目中期报告',
        description: '提交项目中期报告，包括需求分析、系统设计、进度安排。',
        deadline: '2025-11-15 23:59',
        status: 'graded',
        statusText: '已批改',
        score: 88,
        comment: '需求分析较完整，系统设计合理，进度安排可行。',
        attachmentRequired: true,
    },
];
// ==================== 全局配置数据 ====================
/** 当前学年学期 */
export const CURRENT_SEMESTER: string = '2025-2026 第1学期';
/** 当前教学周 */
export const CURRENT_WEEK: number = 11;
/** 学年学期选项 */
export const SEMESTER_OPTIONS: string[] = [
    '2025-2026 第1学期',
    '2025-2026 第2学期',
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
/** 演示登录学号列表 */
export function isValidStudentId(studentId: string): boolean {
    return studentId === '2024316020318' || studentId === '2024316020320' || studentId === 'demo';
}
/** 演示登录密码验证 */
export function validatePassword(studentId: string, password: string): boolean {
    if (!password || password.length === 0) {
        return false;
    }
    // 演示：任意非空密码均可登录
    return true;
}
