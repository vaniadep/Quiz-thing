interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: Readonly<HomeProps>) {
  return (
    <main className="page home-page">
      <section className="hero-card">
        <p className="badge">React + TypeScript</p>
        <h1>Добро пожаловать в квиз-викторину!</h1>
        <p className="lead">Проверьте свои знания, ответив на несколько вопросов.</p>
        <button className="primary-button" type="button" onClick={onStart}>
          Начать
        </button>
      </section>
    </main>
  );
}
