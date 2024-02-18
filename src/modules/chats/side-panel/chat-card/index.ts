import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import { getFormattedDate } from '../../../../utils/getFormattedDate';
import { MY_LOGIN } from '../../../../temp/data';

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
export default (props: TypeProps) => {
  const display_time = getFormattedDate(props.last_message.time);
  const is_my = props.last_message.user.login === MY_LOGIN;

  return Handlebars.compile(tpl)({
    ...props,
    display_time,
    is_my,
  });
};
