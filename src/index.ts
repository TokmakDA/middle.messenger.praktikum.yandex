import Handlebars from 'handlebars';
import layouts from 'handlebars-layouts';
import { isObjKey } from './utils/utils';
import './assets/styles/index.scss';

import signin from './pages/signin';
import signup from './pages/signup';
import errors from './pages/errors';
import profile from './pages/profile';
import chats from './pages/chat';

// Register helpers
layouts.register(Handlebars);

// Добавим роуты
const routes = {
  '/': `<h1>Home</h1><p>Welcome home!</p>`,
  '/signin': signin({}),
  '/signup': signup({}),
  '/profile': profile(),
  '/chats': chats(),
  '/404': errors({ title: '404', text: 'Не туда попали' }),
  '/500': errors({ title: '500', text: 'Мы уже фиксим' }),
};

// Рендерим компоненты
const render: (path: string) => void = (path) => {
  const root = document.querySelector('#app');

  // Провекра ключа в роутах
  if (isObjKey(path, routes)) {
    if (root) {
      root.innerHTML = routes[path];
    }
  } else {
    console.log(path, 'маршрут не найден');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.pathname;
  if (hash in routes) {
    render(hash);
  } else {
    render('/404');
  }
});