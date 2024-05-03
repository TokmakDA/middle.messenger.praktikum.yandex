import Block from '../../tools/Block';

class Link extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <a href={{ url }} class='link' target='_self'>
          {{ text }}
        </a>
      `,
      ...props,
    });
  }
}

export default Link;
