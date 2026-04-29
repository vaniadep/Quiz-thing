const LAST_RESULT_KEY = 'quizLastResult';
const BEST_RESULT_KEY = 'quizBestResult';

interface ResultProps {
  onRestart: () => void;
  onBackHome: () => void;
}

interface ResultData {
  score: number;
  total: number;
  date: string;
}

function readResult(key: string): ResultData | null {
  const savedResult = localStorage.getItem(key);

  if (!savedResult) {
    return null;
  }

  try {
    return JSON.parse(savedResult) as ResultData;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function Result({ onRestart, onBackHome }: Readonly<ResultProps>) {
  const lastResult = readResult(LAST_RESULT_KEY);
  const bestResult = readResult(BEST_RESULT_KEY);

  if (!lastResult) {
    return (
      <main className="page result-page">
        <section className="result-card">
          <h1>Результатов пока нет</h1>
          <p className="lead">Сначала пройдите викторину, чтобы увидеть свой счёт.</p>
          <button className="primary-button" type="button" onClick={onRestart}>
            Начать викторину
          </button>
        </section>
      </main>
    );
  }

  const percent = Math.round((lastResult.score / lastResult.total) * 100);

  return (
    <main className="page result-page">
      <section className="result-card">
        <p className="badge">Финальный результат</p>
        <h1>
          {lastResult.score} из {lastResult.total}
        </h1>
        <p className="lead">Вы ответили правильно на {percent}% вопросов.</p>

        <div className="best-result">
          <span>Лучший результат</span>
          <strong>
            {bestResult ? `${bestResult.score} из ${bestResult.total}` : 'Пока не сохранён'}
          </strong>
        </div>

        <div className="actions-row centered">
          <button className="secondary-button" type="button" onClick={onBackHome}>
            На главную
          </button>
          <button className="primary-button" type="button" onClick={onRestart}>
            Пройти ещё раз
          </button>
        </div>
      </section>
    </main>
  );
}
