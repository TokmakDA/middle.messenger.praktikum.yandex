import Block from '../../tools/Block';
import { Option, SelectElementProps } from '../../@types/types';

export default class SelectElement extends Block {
  constructor(props: SelectElementProps) {
    super({
      ...props,
      tagName: 'select',
      attr: {
        name: props.name,
        class: 'select__element',
      },
      options: props.options,
    });
  }

  render(): string {
    const { options } = this.props as SelectElementProps;
    let optionElements;
    if (Array.isArray(options) && options.length > 0) {
      optionElements = options.map(
        (option: Option) =>
          `<option value="${option.value}">${option.label}</option>`,
      );
    } else {
      optionElements = `<option value="null">Нет пользователей для удаления</option>`;
    }

    return `
      <select name="{{name}}" id="user-select">
        ${optionElements}
      </select>
    `;
  }
}
