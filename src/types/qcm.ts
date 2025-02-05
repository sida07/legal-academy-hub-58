export type QCMCategory = "lawyer" | "other" | "all";

export interface Subject {
  id: string;
  name: string;
  questionCount: number;
  participants: number;
  successRate: number;
}

export interface QCMTest {
  id: string;
  title: string;
  category: QCMCategory;
  year?: string;
  subject?: string;
  questionsCount: number;
  participants: number;
  successRate: number;
  duration: number;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category: QCMCategory;
  subject?: string;
  year?: string;
}