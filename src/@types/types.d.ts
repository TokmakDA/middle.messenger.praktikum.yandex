export type InputProps = {
  type?: string;
  name?: string;
  label: string;
  value?: string;
  required?: boolean;
  error?: string;
  attr?: Record<string, string | nubmer | boolean>;
};

export type ButtonProps = {
  type: string;
  text: string;
  disabled?: boolean;
};

export type LinkProps = {
  text: string;
  url: string;
  disabled?: boolean;
};

export type ErrorsPageProps = {
  title: string;
  text: string;
};
