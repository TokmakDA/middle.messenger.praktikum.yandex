import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import getFormattedDate from '../../../../utils/getFormattedDate';
import { MY_LOGIN } from '../../../../temp/data';
import checkmark from '../../../../components/checkmark';
import avatarSVG from '../../../../assets/images/avatar.svg';

type TypeProps = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number | null;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
  is_active?: boolean;
};

Handlebars.registerPartial('checkmark', checkmark);

export default (props: TypeProps) => {
  const displayTime = getFormattedDate(props.last_message.time);
  const isMy = props.last_message.user.login === MY_LOGIN;

  return Handlebars.compile(tpl)({
    ...props,
    displayTime,
    isMy,
    avatarSVG,
  });
};
