import Block from '../../tools/Block';
import FileInputElement from './file-input-element';
import './style.scss';

interface FileInputProps {
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  error?: string;
  onChange: (file: File) => void;
}

export default class FileInput extends Block {
  constructor(props: FileInputProps) {
    super({
      ...props,
      attr: false,
      template: `
        <div class="file-input">
          <div class="file-input__container">
            {{{ fileInput }}}
            <label class="file-input__label" for='{{ name }}'>{{ label }}</label>
          </div>
          <span class="file-input__error">{{ error }}</span>
        </div>
      `,
      fileInput: new FileInputElement({
        ...props,
      }),
    });
  }
}
