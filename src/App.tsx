import { useEffect, useState } from 'react';
import './App.css';
import { ThemeToggle } from './components/ThemeToggle';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';

const routes = {
  home: '/',
  quiz: '/quiz',
  result: '/result',
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  let page = <Home onStart={() => navigate(routes.quiz)} />;

  if (currentPath === routes.quiz) {
    page = (
      <Quiz
        onFinish={() => navigate(routes.result)}
        onBackHome={() => navigate(routes.home)}
      />
    );
  }

  if (currentPath === routes.result) {
    page = (
      <Result
        onRestart={() => navigate(routes.quiz)}
        onBackHome={() => navigate(routes.home)}
      />
    );
  }

  return (
    <div className="app">
      <ThemeToggle />
      {page}
    </div>
  );
}

export default App;
