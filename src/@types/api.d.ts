export type TSignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignUpResponse = {
  id: number;
};

export type TSignInRequest = {
  login: string;
  password: string;
};

export type APIError = {
  reason: string;
};

export type TFindUserRequest = {
  login: string;
};

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TAvatarFile = File & {
  type: 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/gif' | 'image/webp';
};

export type TUpdateUserRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};
