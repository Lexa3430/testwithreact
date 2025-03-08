import React from 'react';
import { Question } from '../types';

interface QuizComponentProps {
  question: Question;
  selectedAnswer: number;
  onSelectAnswer: (selectedOption: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  questionNumber: number;
  totalQuestions: number;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  questionNumber,
  totalQuestions
}) => {
  return (
    <div className="quiz-container">
      <div className="question-counter">
        Question {questionNumber} of {totalQuestions}
      </div>
      <div className="question">
        <h2>{question.question}</h2>
      </div>
      <div className="options">
        {question.options.map((option, index) => (
          <div 
            key={index} 
            className={`option ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onSelectAnswer(index)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="controls">
        <button 
          onClick={onPrevious}
          disabled={isFirst}
          className="control-button"
        >
          Previous
        </button>
        <button 
          onClick={onNext}
          className="control-button primary"
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;