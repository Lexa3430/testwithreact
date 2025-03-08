import React from 'react';
import { Question } from '../types';

interface ResultComponentProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  questions: Question[];
  userAnswers: number[];
}

const ResultComponent: React.FC<ResultComponentProps> = ({
  score,
  totalQuestions,
  onRestart,
  questions,
  userAnswers
}) => {
  const percentage = (score / totalQuestions) * 100;
  
  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <div className="score-display">
        <p>You scored {score} out of {totalQuestions}</p>
        <p className="percentage">{percentage.toFixed(0)}%</p>
      </div>
      
      <div className="answer-review">
        <h3>Review your answers:</h3>
        {questions.map((question, index) => (
          <div key={question.id} className="review-item">
            <p className="review-question">{index + 1}. {question.question}</p>
            <p className="your-answer">
              Your answer: <span className={userAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}>
                {userAnswers[index] === -1 ? 'Not answered' : question.options[userAnswers[index]]}
              </span>
            </p>
            {userAnswers[index] !== question.correctAnswer && (
              <p className="correct-answer">
                Correct answer: {question.options[question.correctAnswer]}
              </p>
            )}
          </div>
        ))}
      </div>
      
      <button onClick={onRestart} className="restart-button">
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultComponent;