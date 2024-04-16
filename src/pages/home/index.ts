import Block from '../../tools/Block';
import tpl from './tpl.hbs?raw';
import './style.scss';
import LoyautCenterBlock from '../../layouts/center';
import ROUTES from '../../data/constants';

class HomeBlock extends Block {
  constructor({ ...props }) {
    super({ tpl, ...props });
  }
}

const homePage = new LoyautCenterBlock({
  content: new HomeBlock({
    links: ROUTES,
  }),
});

export default homePage;
