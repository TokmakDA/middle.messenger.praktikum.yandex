import HTTPTransport from '../tools/HTTPTransport';
import {
  APIError,
  TSignInRequest,
  TSignUpRequest,
  TSignUpResponse,
} from '../@types/api';
import { User } from '../@types/types';

const authApi = new HTTPTransport('/auth', true);

export default class AuthApi {
  async create(data: TSignUpRequest): Promise<TSignUpResponse | APIError> {
    return authApi.post<TSignUpRequest, TSignUpResponse | APIError>('/signup', {
      data,
    });
  }

  async login(data: TSignInRequest): Promise<void | APIError> {
    return authApi.post<TSignInRequest, void | APIError>('/signin', { data });
  }

  async me(): Promise<User | APIError> {
    return authApi.get<void, User | APIError>('/user');
  }

  async logout(): Promise<void | APIError> {
    return authApi.post<void, void | APIError>('/logout');
  }
}
