// SuperMemo-2 (SM-2) Spaced Repetition System (SRS) Implementation

export interface SRSItem {
  id: string;
  interval: number; // in days
  repetition: number; // count of consecutive successful reviews
  easinessFactor: number; // default 2.5
  nextReviewDate: string; // ISO string
  lastReviewedDate?: string;
}

export type SRSGrade = 1 | 2 | 3 | 4 | 5; // 1: Complete Blackout, 2: Incorrect, 3: Hard, 4: Good, 5: Easy

export function calculateNextSRS(item: SRSItem, grade: SRSGrade): SRSItem {
  let { interval, repetition, easinessFactor } = item;

  if (grade >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easinessFactor);
    }
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  // Update Easiness Factor (EF)
  // EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  easinessFactor = easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easinessFactor < 1.3) {
    easinessFactor = 1.3;
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    ...item,
    interval,
    repetition,
    easinessFactor,
    nextReviewDate: nextDate.toISOString(),
    lastReviewedDate: new Date().toISOString(),
  };
}

export function isDueForReview(item: SRSItem): boolean {
  if (!item.nextReviewDate) return true;
  return new Date(item.nextReviewDate).getTime() <= new Date().getTime();
}
