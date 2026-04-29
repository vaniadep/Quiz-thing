import { useEffect, useState } from 'react';
import './App.css';
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

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (currentPath === routes.quiz) {
    return (
      <Quiz
        onFinish={() => navigate(routes.result)}
        onBackHome={() => navigate(routes.home)}
      />
    );
  }

  if (currentPath === routes.result) {
    return (
      <Result
        onRestart={() => navigate(routes.quiz)}
        onBackHome={() => navigate(routes.home)}
      />
    );
  }

  return <Home onStart={() => navigate(routes.quiz)} />;
}

export default App;
