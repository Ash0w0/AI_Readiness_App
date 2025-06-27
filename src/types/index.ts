export interface User {
  name: string;
  role: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TestConfig {
  type: 'quick' | 'full';
  questionCount: number;
  timeLimit: number; // in minutes
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  strengths: string[];
  weaknesses: string[];
  suggestedTopics: LearningTopic[];
  completedAt: Date;
}

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  resources: string[];
}

export interface AppState {
  user: User | null;
  currentTest: TestConfig | null;
  testInProgress: boolean;
  currentQuestionIndex: number;
  answers: number[];
  testResult: TestResult | null;
  darkMode: boolean;
}