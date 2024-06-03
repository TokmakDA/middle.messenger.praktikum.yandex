import './assets/styles/index.scss';
import { router } from './routes';
import store from './services';

window.store = store;

router.start();
