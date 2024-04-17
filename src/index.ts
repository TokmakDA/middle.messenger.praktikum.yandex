import isObjKey from './tools/utils';
import './assets/styles/index.scss';

import signInPage from './pages/signin';
import signUpPage from './pages/signup';
// import profile from './pages/profile';
import homePage from './pages/home';
import ErrorBlock from './pages/errors';
import LoyautCenterBlock from './layouts/center';
import chatPage from './pages/chat';

// Добавим роуты
const routes = {
  '/': homePage.getContent(),
  '/signin': signInPage.getContent(),
  '/signup': signUpPage.getContent(),
  // '/profile': profile({}),
  '/chats': chatPage.getContent(),
  '/404': new LoyautCenterBlock({
    content: new ErrorBlock({ title: '404', text: 'Не туда попали' }),
  }).getContent(),
  '/500': new LoyautCenterBlock({
    content: new ErrorBlock({ title: '500', text: 'Мы уже фиксим' }),
  }).getContent(),
};

// .setProps({ title: '404', text: 'Не туда попали' })
// .setProps({ title: '500', text: 'Мы уже фиксим' })

// Рендерим компоненты
const render: (path: string) => void = (path) => {
  const root = document.getElementById('app');

  // Провекра ключа в роутах
  if (isObjKey(path, routes)) {
    if (root) {
      root.append(routes[path]);
    }
  } else {
    // eslint-disable-next-line no-console
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
