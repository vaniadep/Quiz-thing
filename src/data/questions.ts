import type { Question } from '../types/Question';

export const questions: Question[] = [
  {
    id: 1,
    question: 'Какой хук в React чаще всего используют для хранения состояния компонента?',
    options: ['useEffect', 'useState', 'useMemo', 'useRef'],
    correctAnswerIndex: 1,
  },
  {
    id: 2,
    question: 'Что такое JSX?',
    options: [
      'Формат базы данных',
      'Синтаксис, похожий на HTML, который используется внутри JavaScript/TypeScript',
      'Отдельный язык программирования',
      'Инструмент для сборки проекта',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    question: 'Какой файл обычно является точкой входа в Vite + React проекте?',
    options: ['src/main.tsx или src/main.jsx', 'src/data/questions.ts', 'README.md', 'public/favicon.svg'],
    correctAnswerIndex: 0,
  },
  {
    id: 4,
    question: 'Что делает localStorage?',
    options: [
      'Сохраняет данные только до перезагрузки страницы',
      'Хранит данные в браузере пользователя между посещениями сайта',
      'Автоматически отправляет данные на сервер',
      'Стилилизует React-компоненты',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    question: 'Для чего нужен интерфейс TypeScript?',
    options: [
      'Чтобы описать структуру объекта и типы его полей',
      'Чтобы заменить HTML-разметку',
      'Чтобы запускать проект без браузера',
      'Чтобы удалить ошибки во время выполнения автоматически',
    ],
    correctAnswerIndex: 0,
  },
];
