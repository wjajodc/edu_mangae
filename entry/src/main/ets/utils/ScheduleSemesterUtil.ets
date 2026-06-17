import { SemesterMeta } from '../model/CourseModel';

/**
 * 课表学年学期解析与格式化
 * 兼容：2025-2026学年第二学期、2025-2026 第1学期 等格式
 */
export class ScheduleSemesterUtil {
  static parse(raw: string): SemesterMeta | null {
    if (!raw || raw.length === 0) {
      return null;
    }
    const yearMatch = raw.match(/(\d{4}-\d{4})/);
    if (!yearMatch) {
      return null;
    }
    const yearRange = yearMatch[1];
    const term = ScheduleSemesterUtil.detectTerm(raw);
    return ScheduleSemesterUtil.buildMeta(yearRange, term, raw);
  }

  static fromKey(key: string): SemesterMeta | null {
    const match = key.match(/^(\d{4}-\d{4})-([12])$/);
    if (!match) {
      return null;
    }
    const yearRange = match[1];
    const term = parseInt(match[2]);
    return ScheduleSemesterUtil.buildMeta(yearRange, term, key);
  }

  static buildKey(yearRange: string, term: number): string {
    return `${yearRange}-${term}`;
  }

  static formatDisplay(yearRange: string, term: number): string {
    return `${yearRange}学年${term}学期`;
  }

  private static buildMeta(yearRange: string, term: number, rawLabel: string): SemesterMeta {
    const meta: SemesterMeta = {
      key: ScheduleSemesterUtil.buildKey(yearRange, term),
      yearRange: yearRange,
      term: term,
      displayLabel: ScheduleSemesterUtil.formatDisplay(yearRange, term),
      rawLabel: rawLabel,
    };
    return meta;
  }

  private static detectTerm(raw: string): number {
    if (/第二|第2|2学期|学期2|下学期/.test(raw)) {
      return 2;
    }
    if (/第一|第1|1学期|学期1|上学期/.test(raw)) {
      return 1;
    }
    return 1;
  }
}
