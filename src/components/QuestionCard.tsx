import type { Question } from '../types/Question';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  onOptionSelect: (optionIndex: number) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onOptionSelect,
}: Readonly<QuestionCardProps>) {
  return (
    <section className="question-card">
      <p className="question-progress">
        Вопрос {questionNumber} из {totalQuestions}
      </p>

      <h2>{question.question}</h2>

      <div className="options-list">
        {question.options.map((option, index) => (
          <label
            key={option}
            className={`option ${selectedOption === index ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => onOptionSelect(index)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
