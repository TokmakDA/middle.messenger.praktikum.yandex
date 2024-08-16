import Block from '../../tools/Block';
import SelectElement from './select-element';
import './style.scss';
import { BlockProps } from '../../@types/block';
import { Option } from '../../@types/types';

// Типизация для свойств компонента Select
interface SelectProps extends BlockProps {
  options: Option[];
  name: string;
  label: string;
  error?: string;
}

export default class Select extends Block {
  constructor(props: SelectProps) {
    super({
      ...props,
      attr: false,
      template: `
        <div class="select">
          <div class="select__container">
            {{{ select }}}
            <label class="select__label" for="{{ name }}">{{ label }}</label>
          </div>
          <span class="select__error">{{ error }}</span>
        </div>
      `,
      select: new SelectElement({
        ...props,
        options: props.options,
      }),
    });
  }

  componentDidUpdate(oldProps?: SelectProps, newProps?: SelectProps): boolean {
    const { select } = this.children;
    const { options } = this.props as SelectProps;

    // Обновляем опции в SelectElement
    if (options) {
      select.setPropsAndChildren({ options });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
