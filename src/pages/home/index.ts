import Block from '../../tools/Block';
import template from './tpl.hbs?raw';
import './style.scss';
import LoyautCenterBlock from '../../layouts/center';
import ROUTES from '../../data/constants';

class HomeBlock extends Block {
  constructor({ ...props }) {
    super({ template, ...props });
  }
}

const homePage = new LoyautCenterBlock({
  content: new HomeBlock({
    links: ROUTES,
  }),
});

export default homePage;
