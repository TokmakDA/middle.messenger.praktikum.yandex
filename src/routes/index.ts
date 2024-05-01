import Block from '../tools/Block';

import {
  chatPage,
  erorrPage404,
  erorrPage5XX,
  homePage,
  profilePage,
  signInPage,
  signUpPage,
} from '../pages';

// Добавим роуты
export const routes: Record<string, Block> = {
  '/': homePage,
  '/signin': signInPage,
  '/signup': signUpPage,
  '/profile': profilePage,
  '/chats': chatPage,

  '/404': erorrPage404,
  '/500': erorrPage5XX,
};
