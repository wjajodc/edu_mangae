/**
 * 日期与时间工具方法
 * 提供学期、教学周、日期格式化等通用函数
 */

/**
 * 解析 YYYY-MM-DD 为本地日期
 */
function parseLocalDate(dateStr: string): Date {
  const parts: string[] = dateStr.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

/**
 * 取所在周的周一（00:00）
 */
function getMondayOfDate(date: Date): Date {
  const monday: Date = new Date(date.getTime());
  const jsDay: number = monday.getDay();
  const offset: number = jsDay === 0 ? -6 : 1 - jsDay;
  monday.setDate(monday.getDate() + offset);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * 各学期第 1 教学周周一（与校历对齐，2025-2026 第二学期 6 月 9 日为第 15 周）
 */
function getSemesterWeek1Monday(semesterKey: string): Date {
  const startMap: Record<string, string> = {
    '2025-2026-1': '2025-09-01',
    '2025-2026-2': '2026-03-02',
    '2024-2025-1': '2024-09-02',
    '2024-2025-2': '2025-02-24',
  };
  const dateStr = startMap[semesterKey] !== undefined ? startMap[semesterKey] : '2026-03-02';
  return getMondayOfDate(parseLocalDate(dateStr));
}

/**
 * 根据日期与学期键计算教学周（第 1 周起）
 */
export function getTeachingWeek(date: Date, semesterKey: string): number {
  const week1Monday: Date = getSemesterWeek1Monday(semesterKey);
  const targetMonday: Date = getMondayOfDate(date);
  const diffDays: number = Math.floor((targetMonday.getTime() - week1Monday.getTime()) / 86400000);
  const week: number = Math.floor(diffDays / 7) + 1;
  return week < 1 ? 1 : week;
}

/**
 * 获取当前日期的教学周，并写入 AppStorage.currentWeek
 */
export function syncCurrentTeachingWeek(semesterKey?: string): number {
  const key: string = semesterKey !== undefined && semesterKey.length > 0
    ? semesterKey
    : (AppStorage.get<string>('currentScheduleKey') || '2025-2026-2');
  const week: number = getTeachingWeek(new Date(), key);
  AppStorage.setOrCreate('currentWeek', week);
  return week;
}

/**
 * 获取当前日期字符串（YYYY-MM-DD）
 */
export function getCurrentDate(): string {
  const now: Date = new Date();
  const year: number = now.getFullYear();
  const month: string = String(now.getMonth() + 1).padStart(2, '0');
  const day: string = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 获取当前是星期几（1-7，1=周一）
 */
export function getCurrentDayOfWeek(): number {
  const now: Date = new Date();
  const day: number = now.getDay();
  return day === 0 ? 7 : day;
}

/**
 * 获取明天的日期字符串
 */
export function getTomorrowDate(): string {
  const now: Date = new Date();
  now.setDate(now.getDate() + 1);
  const year: number = now.getFullYear();
  const month: string = String(now.getMonth() + 1).padStart(2, '0');
  const day: string = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 日期格式化（MM-DD）
 */
export function formatDateShort(dateStr: string): string {
  if (!dateStr || dateStr.length < 10) {
    return dateStr;
  }
  return dateStr.substring(5, 10);
}

/**
 * 获取当前时间字符串（HH:MM）
 */
export function getCurrentTime(): string {
  const now: Date = new Date();
  const hour: string = String(now.getHours()).padStart(2, '0');
  const minute: string = String(now.getMinutes()).padStart(2, '0');
  return `${hour}:${minute}`;
}

/**
 * 格式化日期时间为中文格式
 */
export function formatDateTimeChinese(dateStr: string): string {
  if (!dateStr) {
    return '—';
  }
  // 输入格式: YYYY-MM-DD HH:MM
  const parts: string[] = dateStr.split(' ');
  const datePart: string = parts[0] || '';
  const timePart: string = parts[1] || '';
  if (!datePart) {
    return '—';
  }
  const dateParts: string[] = datePart.split('-');
  if (dateParts.length < 3) {
    return dateStr;
  }
  return `${dateParts[0]}年${dateParts[1]}月${dateParts[2]}日 ${timePart}`;
}

/**
 * 节次数字转中文描述
 */
export function periodToLabel(startPeriod: number, endPeriod: number): string {
  const segment: string = getPeriodSegment(startPeriod);
  const endLabel: string = (startPeriod === endPeriod) ? '' : `-${endPeriod}`;
  return `${segment} ${startPeriod}${endLabel} 节`;
}

/**
 * 获取节次所属时段
 */
function getPeriodSegment(period: number): string {
  if (period <= 4) {
    return '上午';
  } else if (period <= 8) {
    return '下午';
  } else {
    return '晚间';
  }
}

/**
 * 获取单节次时间范围（课表左侧展示，如 8:00-8:50）
 */
export function getPeriodTimeSlot(period: number): string {
  const timeMap: Map<number, string> = new Map([
    [1, '8:00-8:50'],
    [2, '9:00-9:50'],
    [3, '10:10-11:00'],
    [4, '11:10-12:00'],
    [5, '14:00-14:50'],
    [6, '15:00-15:50'],
    [7, '16:10-17:00'],
    [8, '17:10-18:00'],
    [9, '19:00-19:50'],
    [10, '20:00-20:50'],
  ]);
  return timeMap.get(period) || '';
}

/**
 * 根据教学周偏移，计算该周周一至周日的 MM-DD 日期
 */
export function getWeekDateLabels(viewWeek: number, anchorWeek: number): string[] {
  const today: Date = new Date();
  const jsDay: number = today.getDay();
  const mondayOffset: number = jsDay === 0 ? -6 : 1 - jsDay;
  const monday: Date = new Date(today);
  monday.setDate(today.getDate() + mondayOffset + (viewWeek - anchorWeek) * 7);

  const labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d: Date = new Date(monday);
    d.setDate(monday.getDate() + i);
    const month: string = String(d.getMonth() + 1).padStart(2, '0');
    const day: string = String(d.getDate()).padStart(2, '0');
    labels.push(`${month}-${day}`);
  }
  return labels;
}

/**
 * 获取节次时间范围（如"08:00-09:35"）
 */
export function getPeriodTime(startPeriod: number, endPeriod: number): string {
  const timeMap: Map<number, [string, string]> = new Map([
    [1, ['08:00', '08:45']],
    [2, ['08:50', '09:35']],
    [3, ['09:50', '10:35']],
    [4, ['10:40', '11:25']],
    [5, ['14:00', '14:45']],
    [6, ['14:50', '15:35']],
    [7, ['15:50', '16:35']],
    [8, ['16:40', '17:25']],
    [9, ['19:00', '19:45']],
    [10, ['19:50', '20:35']],
  ]);
  const start: [string, string] | undefined = timeMap.get(startPeriod);
  const end: [string, string] | undefined = timeMap.get(endPeriod);
  if (start && end) {
    return `${start[0]}-${end[1]}`;
  }
  return '';
}

/**
 * 星期数字转中文
 */
export function dayOfWeekToChinese(day: number): string {
  const map: Map<number, string> = new Map([
    [1, '一'],
    [2, '二'],
    [3, '三'],
    [4, '四'],
    [5, '五'],
    [6, '六'],
    [7, '日'],
  ]);
  return map.get(day) || '—';
}

/**
 * 生成唯一ID（简单版）
 */
let idCounter: number = 1000;
export function generateId(): string {
  idCounter++;
  return `id_${Date.now()}_${idCounter}`;
}

/**
 * 模拟网络延迟（用于Mock操作）
 */
export function mockDelay(ms: number = 500): Promise<void> {
  return new Promise<void>((resolve: (value: void) => void) => {
    setTimeout(() => resolve(), ms);
  });
}
