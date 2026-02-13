import { AssessmentResult, CompletedPause, FeelingResponse } from '../types';

export function calculateBand(total: number): 'high' | 'mixed' | 'low' {
  if (total >= 20) return 'high';
  if (total >= 15) return 'mixed';
  return 'low';
}

export function getBandLabel(band: 'high' | 'mixed' | 'low'): string {
  switch (band) {
    case 'high':
      return 'You feel mostly in control';
    case 'mixed':
      return 'Mixed feelings about control';
    case 'low':
      return 'Technology often feels in charge';
  }
}

export function getBandDescription(band: 'high' | 'mixed' | 'low'): string {
  switch (band) {
    case 'high':
      return 'Your responses suggest you generally feel in command of your technology use. The pauses ahead can help maintain that balance.';
    case 'mixed':
      return 'Your responses suggest your relationship with technology has room for improvement. The pauses ahead are designed to help.';
    case 'low':
      return 'Your responses suggest technology often feels like it is in the driving seat. You are not alone — and the pauses ahead are here to help.';
  }
}

export function calculateStreak(completedPauses: CompletedPause[]): number {
  if (completedPauses.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = new Set(
    completedPauses.map((p) => {
      const d = new Date(p.completedAt);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
  );

  const sortedDates = Array.from(dates).sort((a, b) => b - a);

  // Check if today or yesterday is in the set
  const todayTime = today.getTime();
  const yesterdayTime = todayTime - 86400000;

  if (!dates.has(todayTime) && !dates.has(yesterdayTime)) {
    return 0;
  }

  let streak = 0;
  let checkDate = dates.has(todayTime) ? todayTime : yesterdayTime;

  for (let i = 0; i < sortedDates.length; i++) {
    if (sortedDates[i] === checkDate) {
      streak++;
      checkDate -= 86400000;
    } else if (sortedDates[i] < checkDate) {
      break;
    }
  }

  return streak;
}

export function calculateFeltBetterPercent(completedPauses: CompletedPause[]): number {
  if (completedPauses.length === 0) return 0;
  const betterCount = completedPauses.filter((p) => p.feeling === 'better').length;
  return Math.round((betterCount / completedPauses.length) * 100);
}

export function getStudyWeekNumber(firstOpenDate: string | null): number {
  if (!firstOpenDate) return 1;
  const start = new Date(firstOpenDate);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return Math.min(Math.floor(diffDays / 7) + 1, 4);
}
