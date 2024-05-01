import './assets/styles/index.scss';
import { routes } from './routes';

// Рендерим компоненты
const render: (path: string) => void = (path) => {
  const root = document.getElementById('app');

  const page = routes[path];

  if (root) {
    root.append(page.getContent() as Node);
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
