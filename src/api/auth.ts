import HTTPTransport from '../tools/HTTPTransport.ts';
import {
  APIError,
  TSignInRequest,
  TSignUpRequest,
  TSignUpResponse,
  UserResponse,
} from '../@types/api';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async create(data: TSignUpRequest): Promise<TSignUpResponse> {
    return authApi.post<TSignUpRequest, TSignUpResponse>('/signup', { data });
  }

  async login(data: TSignInRequest): Promise<void | APIError> {
    return authApi.post<TSignInRequest, void>('/signin', { data });
  }

  async me(): Promise<APIError> {
    return authApi.get('/user');
  }

  async logout(): Promise<UserResponse | APIError> {
    return authApi.post('/logout');
  }
}
