import HTTPTransport from '../tools/HTTPTransport';
import {
  TErrorApi,
  TChangePasswordRequest,
  TFindUserRequest,
  TUpdateUserRequest,
  TUserApi,
} from '../@types/api';
import URLS from '../lib/constants/urls';

const userTransport = new HTTPTransport({ withCredentials: true });

export default class UsersApi {
  static async updateProfile(
    data: TUpdateUserRequest,
  ): Promise<TUserApi | TErrorApi> {
    return userTransport.put<TUpdateUserRequest, TUserApi | TErrorApi>(
      URLS.users.profile,
      {
        data,
      },
    );
  }

  static async updateAvatar(data: FormData): Promise<TUserApi | TErrorApi> {
    return userTransport.put<FormData, TUserApi | TErrorApi>(
      URLS.users.avatar,
      {
        data,
      },
    );
  }

  static async updatePassword(
    data: TChangePasswordRequest,
  ): Promise<void | TErrorApi> {
    return userTransport.put<TChangePasswordRequest, void | TErrorApi>(
      URLS.users.password,
      {
        data,
      },
    );
  }

  static async searchUsers(
    data: TFindUserRequest,
  ): Promise<TUserApi[] | TErrorApi> {
    return userTransport.post<TFindUserRequest, TUserApi[] | TErrorApi>(
      URLS.users.search,
      {
        data,
      },
    );
  }

  static async fetchUserByID(
    id: string | number,
  ): Promise<TUserApi | TErrorApi> {
    return userTransport.get<string | number, TUserApi | TErrorApi>(
      URLS.users.user(id),
    );
  }
}
