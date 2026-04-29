import { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { questions } from '../data/questions';

interface QuizProps {
  onFinish: () => void;
  onBackHome: () => void;
}

const LAST_RESULT_KEY = 'quizLastResult';
const BEST_RESULT_KEY = 'quizBestResult';

interface ResultData {
  score: number;
  total: number;
  date: string;
}

function getSavedBestResult(): ResultData | null {
  const savedBest = localStorage.getItem(BEST_RESULT_KEY);

  if (!savedBest) {
    return null;
  }

  try {
    return JSON.parse(savedBest) as ResultData;
  } catch {
    localStorage.removeItem(BEST_RESULT_KEY);
    return null;
  }
}

function saveQuizResult(score: number, total: number) {
  const result: ResultData = {
    score,
    total,
    date: new Date().toISOString(),
  };

  const bestResult = getSavedBestResult();

  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));

  if (!bestResult || score > bestResult.score) {
    localStorage.setItem(BEST_RESULT_KEY, JSON.stringify(result));
  }
}

export function Quiz({ onFinish, onBackHome }: Readonly<QuizProps>) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(
    Array.from({ length: questions.length }, () => null),
  );

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = answers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[currentQuestionIndex] = optionIndex;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
      return;
    }

    const score = questions.reduce((totalScore, question, index) => {
      return answers[index] === question.correctAnswerIndex ? totalScore + 1 : totalScore;
    }, 0);

    saveQuizResult(score, questions.length);
    onFinish();
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  return (
    <main className="page quiz-page">
      <div className="top-row">
        <button className="ghost-button" type="button" onClick={onBackHome}>
          На главную
        </button>
        <span className="counter">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
      />

      <div className="actions-row">
        <button
          className="secondary-button"
          type="button"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Назад
        </button>
        <button
          className="primary-button"
          type="button"
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
        >
          {isLastQuestion ? 'Завершить' : 'Далее'}
        </button>
      </div>
    </main>
  );
}
