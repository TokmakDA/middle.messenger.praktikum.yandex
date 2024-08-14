import Block from '../../tools/Block';

interface FileInputElementProps {
  name: string;
  accept?: string;
  onChange: (file: File) => void;
}

export default class FileInputElement extends Block {
  constructor(props: FileInputElementProps) {
    super({
      ...props,
      template: `
        <input
          class="file-input__element"
          placeholder=""
          type="file"
          name='{{ name }}'
          id='{{ name }}'
          accept='{{ accept }}'
        />
      `,
      events: {
        change: (e: Event): void => {
          const input = e.currentTarget as HTMLInputElement;
          if (input.files && input.files.length > 0) {
            (this.props as FileInputElementProps).onChange(input.files[0]);
          }
        },
      },
    });
  }
}
