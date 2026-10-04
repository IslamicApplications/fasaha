import type { UserStats } from '../types';

// Compare local calendar dates rather than elapsed hours (including DST changes).
function calendarDay(date: Date): number {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000;
}

export function recordActivity(stats: UserStats, now = new Date()): UserStats {
  const previous = new Date(stats.lastActiveDate);
  const gap = calendarDay(now) - calendarDay(previous);
  const previousStreak = Number.isFinite(stats.streak) ? Math.max(0, stats.streak) : 0;
  const streak = gap === 0 ? Math.max(1, previousStreak)
    : gap === 1 ? previousStreak + 1 : 1;
  return { ...stats, streak, lastActiveDate: now.toISOString() };
}
