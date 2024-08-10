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
