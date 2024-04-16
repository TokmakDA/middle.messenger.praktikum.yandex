import tpl from './tpl.hbs?raw';
import './style.scss';
import Block from '../../../tools/Block';
import HeaderChatsBlock from './header';
import FooterChatsBlock from './footer';
import DialogBlock from './dialog';

class ChatroomBlock extends Block {
  constructor({ ...props }) {
    super({
      tpl,
      header: new HeaderChatsBlock({}),
      footer: new FooterChatsBlock({
        // onChange: (value) => {
        //   this.setProps({ message: value });
        //   console.log('onChange: (value) =>', value);
        // },
        // onBlur: (e) => this.validate(e),
        // onSubmit: () => {
        //   console.log(props.message);
        // },
      }),
      dialog: new DialogBlock({}),
      ...props,
    });
  }
}

// const chatRoomBlock = new ChatroomBlock({});

export default ChatroomBlock;
