export type QuestionType = 'SHORT_TEXT' | 'LONG_TEXT' | 'MULTIPLE_CHOICE' | 'EMAIL' | 'NUMBER';

export interface Question {
  id: string;
  briefing_id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  order_index: number;
}

export interface Briefing {
  id: string;
  title: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface BriefingWithQuestions extends Briefing {
  questions: Question[];
}

export interface Response {
  id: string;
  briefing_id: string;
  answers: Record<string, any>; // { questionId: resposta }
  respondent_email?: string;
  created_at: string;
}

export interface CreateBriefingData {
  title: string;
  description?: string;
  questions: Omit<Question, 'id' | 'briefing_id' | 'order_index'>[];
}

export interface AnswerData {
  answers: Record<string, any>;
  respondent_email?: string;
}