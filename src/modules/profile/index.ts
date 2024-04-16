import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
// import sidebar from '../../layouts/sidebar';
import back from './back';
import profileInput from './profile-input';
import { PROFILE_INPUTS, PROFILE_LINKS } from '../../temp/data';
import profileLink from './profile_link';
import avatarSVG from '../../assets/images/avatar.svg';

// Handlebars.registerPartial('sidebar', sidebar);
Handlebars.registerPartial('back', back);
Handlebars.registerPartial('profileInput', profileInput);
Handlebars.registerPartial('profileLink', profileLink);

export default (props: object) =>
  Handlebars.compile(tpl)({
    ...props,
    inputs: PROFILE_INPUTS,
    links: PROFILE_LINKS,
    avatarSVG,
  });
