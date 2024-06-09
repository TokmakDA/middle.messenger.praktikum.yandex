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
