import { SelectableCourse } from '../model/CourseModel';
import { GradeRecord, SubScores } from '../model/GradeModel';
import { MOCK_GRADES_HISTORY, MOCK_GRADES_UNPUBLISHED } from '../mock/MockData';
import { ScheduleStore } from './ScheduleStore';

interface MockGradePreset {
  regular: number;
  midterm: number;
  final: number;
  experiment?: number;
}

const GRADE_PRESETS: Record<string, MockGradePreset> = {
  'VDZ02119204.09': { regular: 92, midterm: 88, final: 88, experiment: 95 },
  'VDZ02112704.11': { regular: 90, midterm: 85, final: 85, experiment: 88 },
  'VDZ02114904.10': { regular: 86, midterm: 82, final: 84 },
  'VDZ02103003.10': { regular: 88, midterm: 86, final: 86 },
  'VDZ02115104.10': { regular: 85, midterm: 80, final: 82 },
  'VDZ02102903.11': { regular: 93, midterm: 90, final: 90 },
  'VDZ02119303.09': { regular: 91, midterm: 88, final: 89, experiment: 92 },
  'VMK01100203.43': { regular: 95, midterm: 92, final: 93 },
  'VJW01102302.01': { regular: 90, midterm: 86, final: 88 },
};

/**
 * 成绩数据：当前学期从课表课程生成模拟成绩
 */
export class GradeStore {
  static getGradesForSemester(semester: string): GradeRecord[] {
    const activeSemester = AppStorage.get<string>('currentSemester') || '2025-2026 第2学期';
    if (semester === activeSemester) {
      return GradeStore.buildGradesFromSchedule(semester);
    }
    if (semester === '2024-2025 第2学期') {
      return MOCK_GRADES_HISTORY;
    }
    if (semester === '2025-2026 第1学期') {
      return MOCK_GRADES_UNPUBLISHED;
    }
    return [];
  }

  private static buildGradesFromSchedule(semester: string): GradeRecord[] {
    const courses = ScheduleStore.getActiveScheduleCourses();
    const grades: GradeRecord[] = [];
    for (let i = 0; i < courses.length; i++) {
      grades.push(GradeStore.courseToGrade(courses[i], semester, i));
    }
    return grades;
  }

  private static courseToGrade(course: SelectableCourse, semester: string, index: number): GradeRecord {
    const subScores = GradeStore.buildSubScores(course.courseCode, index);
    const finalScore = subScores.final;
    const overallScore = GradeStore.calcOverallScore(subScores);
    return {
      id: `grade_${course.courseCode}`,
      semester: semester,
      courseCode: course.courseCode,
      courseSerial: course.courseCode,
      courseName: course.courseName,
      courseType: course.courseType,
      credit: course.credit,
      finalScore: finalScore,
      overallScore: overallScore,
      endScore: overallScore,
      isPublished: true,
      subScores: subScores,
    };
  }

  private static buildSubScores(courseCode: string, index: number): SubScores {
    const preset = GRADE_PRESETS[courseCode];
    if (preset) {
      return {
        regular: preset.regular,
        midterm: preset.midterm,
        final: preset.final,
        experiment: preset.experiment,
      };
    }
    const base = 74 + (index * 3) % 20;
    return {
      regular: base + 4,
      midterm: base + 2,
      final: base,
      experiment: index % 2 === 0 ? base + 6 : undefined,
    };
  }

  private static calcOverallScore(subScores: SubScores): number {
    if (subScores.experiment !== undefined && subScores.experiment > 0) {
      return Math.round(
        subScores.regular * 0.2 +
        subScores.midterm * 0.2 +
        subScores.final * 0.4 +
        subScores.experiment * 0.2
      );
    }
    if (subScores.midterm > 0) {
      return Math.round(subScores.regular * 0.3 + subScores.midterm * 0.3 + subScores.final * 0.4);
    }
    return Math.round(subScores.regular * 0.4 + subScores.final * 0.6);
  }
}
