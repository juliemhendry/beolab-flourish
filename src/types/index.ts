export type Gender = 'female' | 'male' | 'non-binary' | 'prefer-not-to-say';

export type FeelingResponse = 'worse' | 'same' | 'better';

export type PauseCategory =
  | 'breathe'
  | 'move'
  | 'sense'
  | 'light-air'
  | 'nature'
  | 'connect'
  | 'focus';

export interface Pause {
  id: string;
  title: string;
  category: PauseCategory;
  instruction: string;
  durationSeconds: number;
  durationLabel: string;
  citation: string;
  citationDetail: string;
}

export interface CompletedPause {
  pauseId: string;
  completedAt: string; // ISO date
  feeling: FeelingResponse;
  doneEarly: boolean;
}

export interface AssessmentResult {
  date: string; // ISO date
  scores: number[]; // 5 items, each 1-5
  total: number; // 5-25
  band: 'high' | 'mixed' | 'low';
}

export interface WeeklyCheckIn {
  date: string; // ISO date
  rating: number; // 0-10
  weekNumber: number;
}

export interface Demographics {
  age: number | null;
  gender: Gender | null;
}

export interface UserData {
  deviceId: string;
  onboardingComplete: boolean;
  demographics: Demographics;
  researchConsent: boolean;
  remindersEnabled: boolean;
  assessments: AssessmentResult[];
  completedPauses: CompletedPause[];
  weeklyCheckIns: WeeklyCheckIn[];
  firstOpenDate: string | null;
}

export const DEFAULT_USER_DATA: UserData = {
  deviceId: '',
  onboardingComplete: false,
  demographics: { age: null, gender: null },
  researchConsent: true,
  remindersEnabled: true,
  assessments: [],
  completedPauses: [],
  weeklyCheckIns: [],
  firstOpenDate: null,
};

// Assessment questions from Digital Flourishing Scale adaptation
export const ASSESSMENT_QUESTIONS = [
  'I feel in control of my technology use',
  'I am able to use my phone without getting distracted from what I intended to do',
  'I can stop using my phone when I want to',
  'My phone does not keep me from doing things I should be doing',
  'I use my phone intentionally, not out of habit',
] as const;

export const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
] as const;

export const FEELING_OPTIONS: { value: FeelingResponse; label: string; icon: string }[] = [
  { value: 'worse', label: 'Worse', icon: 'cloud' },
  { value: 'same', label: 'Same', icon: 'minus-circle' },
  { value: 'better', label: 'Better', icon: 'sun' },
];

// Feeling question pool - rotated randomly per spec
export const FEELING_QUESTIONS = [
  'How do you feel?',
  'How are you feeling right now?',
  'How does that feel?',
  'Notice anything different?',
  'Check in with yourself — how do you feel?',
  'What do you notice?',
] as const;
