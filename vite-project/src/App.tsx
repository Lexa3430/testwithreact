import React, { useState, useEffect } from 'react';
import './App.css';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';
import { Question, QuizState } from './types';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    answers: []
  });
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, you might fetch this from an API
    const sampleQuestions: Question[] = [
      {
        id: 1,
        question: "What hook is used for side effects in React?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which is NOT a built-in React hook?",
        options: ["useEffect", "useState", "useHistory", "useRef"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What does TypeScript add to JavaScript?",
        options: ["Static typing", "New runtime features", "Improved performance", "Database access"],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "When is useLayoutEffect fired?",
        options: ["Before browser paint", "After browser paint", "During component mounting only", "After state updates"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "What does the 'key' prop help React with?",
        options: ["Styling elements", "Identifying elements in lists", "Handling events", "Making API calls"],
        correctAnswer: 1
      }
    ];

    setQuizState(prev => ({
      ...prev,
      questions: sampleQuestions,
      answers: new Array(sampleQuestions.length).fill(-1)
    }));
    
    setLoading(false);
  }, []);

  const handleAnswer = (selectedOption: number): void => {
    const { currentQuestionIndex, answers } = quizState;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    
    setQuizState(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const handleNext = (): void => {
    const { currentQuestionIndex, questions } = quizState;
    
    if (currentQuestionIndex < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      calculateScore();
    }
  };

  const handlePrevious = (): void => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1)
    }));
  };

  const calculateScore = (): void => {
    const { questions, answers } = quizState;
    let newScore = 0;
    
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore += 1;
      }
    });
    
    setQuizState(prev => ({
      ...prev,
      score: newScore,
      showResults: true
    }));
  };

  const restartQuiz = (): void => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      answers: new Array(prev.questions.length).fill(-1)
    }));
  };

  if (loading) {
    return <div className="loading">Loading quiz questions...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>React TypeScript Quiz</h1>
      </header>
      <main>
        {quizState.showResults ? (
          <ResultComponent 
            score={quizState.score} 
            totalQuestions={quizState.questions.length} 
            onRestart={restartQuiz}
            questions={quizState.questions}
            userAnswers={quizState.answers}
          />
        ) : (
          <QuizComponent 
            question={quizState.questions[quizState.currentQuestionIndex]}
            selectedAnswer={quizState.answers[quizState.currentQuestionIndex]}
            onSelectAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={quizState.currentQuestionIndex === 0}
            isLast={quizState.currentQuestionIndex === quizState.questions.length - 1}
            questionNumber={quizState.currentQuestionIndex + 1}
            totalQuestions={quizState.questions.length}
          />
        )}
      </main>
    </div>
  );
};

export default App;