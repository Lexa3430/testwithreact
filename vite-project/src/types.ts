export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface QuizState {
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    showResults: boolean;
    answers: number[];
  }