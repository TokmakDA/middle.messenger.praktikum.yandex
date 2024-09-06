import HTTPTransport from '../tools/HTTPTransport';
import {
  TErrorApi,
  TSignInRequest,
  TSignUpRequest,
  TSignUpResponse,
  TUserApi,
} from '../@types/api';
import URLS from '../lib/constants/urls';

const authTransport = new HTTPTransport({ withCredentials: true });

export default class AuthApi {
  static async create(
    data: TSignUpRequest,
  ): Promise<TSignUpResponse | TErrorApi> {
    return authTransport.post<TSignUpRequest, TSignUpResponse | TErrorApi>(
      URLS.auth.signup,
      {
        data,
      },
    );
  }

  static async login(data: TSignInRequest): Promise<void | TErrorApi> {
    return authTransport.post<TSignInRequest, void | TErrorApi>(
      URLS.auth.signin,
      {
        data,
      },
    );
  }

  static async me(): Promise<TUserApi | TErrorApi> {
    return authTransport.get<void, TUserApi | TErrorApi>(URLS.auth.user, {
      withCredentials: true,
    });
  }

  static async logout(): Promise<void | TErrorApi> {
    return authTransport.post<void, void | TErrorApi>(URLS.auth.logout);
  }
}
