import { SVGBlock } from '../components';
import Block from '../tools/Block';
// eslint-disable-next-line import/no-unresolved
import { BlockProps, Children } from './block';

export type InputProps = {
  type?: string;
  name?: string;
  label: string;
  value?: string;
  required?: boolean;
  error?: string;
  attr?: Record<string, string | nubmer | boolean>;
};

export type TFormData = {
  [key: string]: string;
};

export interface InputFieldAttr {
  type: string;
  required: boolean;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
}

export interface InputField {
  name: string;
  label: string;
  value: string;
  attr: InputFieldAttr;
  type?: string;
}

export interface ButtonProps extends BlockProps {
  type?: string;
  page?: string;
  text?: string;
  iconBefore?: SVGBlock;
  iconAfter?: SVGBlock;
  dialogContent?: Children[] | Block | string;
  dialogPosition?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  attr?: {
    [key: string]: string;
  };
  isOpen?: boolean;
  events?: {
    [key: string]: EventListenerOrEventListenerObject;
  };
  className?: string;
  isIcon?: boolean;
  outline?: boolean;
  flat?: boolean;
  small?: boolean;
  disabled?: boolean;
}

export interface DialogProps extends BlockProps {
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  isOpen?: boolean;
  content?: Children[] | Block | string;
  events?: {
    [key: string]: EventListenerOrEventListenerObject;
  };
}

export interface Option extends BlockProps {
  value: string;
  label: string;
}

export interface SelectElementProps extends BlockProps {
  options: Option[];
  name?: string;
}
