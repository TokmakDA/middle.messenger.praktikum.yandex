import HTTPTransport from '../tools/HTTPTransport';
import {
  APIError,
  TChangePasswordRequest,
  TFindUserRequest,
  TUpdateUserRequest,
} from '../@types/api';
import { User } from '../@types/types';
import URLS from '../lib/constants/urls';

const userTransport = new HTTPTransport({ withCredentials: true });

export default class UsersApi {
  static async updateProfile(
    data: TUpdateUserRequest,
  ): Promise<User | APIError> {
    return userTransport.put<TUpdateUserRequest, User | APIError>(
      URLS.users.profile,
      {
        data,
      },
    );
  }

  static async updateAvatar(data: FormData): Promise<User | APIError> {
    return userTransport.put<FormData, User | APIError>(URLS.users.avatar, {
      data,
    });
  }

  static async updatePassword(
    data: TChangePasswordRequest,
  ): Promise<void | APIError> {
    return userTransport.put<TChangePasswordRequest, void | APIError>(
      URLS.users.password,
      {
        data,
      },
    );
  }

  static async searchUsers(data: TFindUserRequest): Promise<User[] | APIError> {
    return userTransport.post<TFindUserRequest, User[] | APIError>(
      URLS.users.search,
      {
        data,
      },
    );
  }
}
