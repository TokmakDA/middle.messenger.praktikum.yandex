import HTTPTransport from '../tools/HTTPTransport';
import {
  APIError,
  TSignInRequest,
  TSignUpRequest,
  TSignUpResponse,
} from '../@types/api';
import { User } from '../@types/types';
import URLS from '../lib/constants/urls';

const authTransport = new HTTPTransport({ withCredentials: true });

export default class AuthApi {
  static async create(
    data: TSignUpRequest,
  ): Promise<TSignUpResponse | APIError> {
    return authTransport.post<TSignUpRequest, TSignUpResponse | APIError>(
      URLS.auth.signup,
      {
        data,
      },
    );
  }

  static async login(data: TSignInRequest): Promise<void | APIError> {
    return authTransport.post<TSignInRequest, void | APIError>(
      URLS.auth.signin,
      {
        data,
      },
    );
  }

  static async me(): Promise<User | APIError> {
    return authTransport.get<void, User | APIError>(URLS.auth.user, {
      withCredentials: true,
    });
  }

  static async logout(): Promise<void | APIError> {
    return authTransport.post<void, void | APIError>(URLS.auth.logout);
  }
}
