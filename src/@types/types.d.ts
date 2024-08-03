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

export type AppState = {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  isOpenDialogChat: boolean;
  chats: Chat[];
  loginError?: string;
  isEditionProfile: boolean;
  isAuthorized: boolean;
  findUsers: User[];
};

export type User = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
};

type LastMessage = {
  user: User;
  time: string;
  content: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string | null;
  unreadCount: number;
  lastMessage: LastMessage | null;
};

export type TFormData = {
  [key: string]: string;
};
