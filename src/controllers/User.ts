import UsersApi from '../api/users';
import {
  TChangePasswordRequest,
  TFindUserRequest,
  TUpdateUserRequest,
  TUserApi,
} from '../@types/api';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
  /**
   * Обновляет профиль пользователя.
   * @param data Данные для обновления профиля.
   */
  public static async updateProfile(data: TUpdateUserRequest) {
    this.setLoading(true);
    try {
      const response = await UsersApi.updateProfile(data);
      this.throwError(response, 'Ошибка обновления профиля');

      this.store.set({ user: response as TUserApi, isEditionProfile: false });
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при обновлении профиля');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Обновляет аватар пользователя.
   * @param file Файл изображения для обновления аватара.
   */
  public static async updateAvatar(file: File) {
    this.setLoading(true);
    try {
      const formData = this.createFormData(file, 'avatar');

      const response = await UsersApi.updateAvatar(formData);
      this.throwError(response, 'Ошибка обновления аватара');

      // TODO Проверить на другую логику
      this.store.set({ user: response as TUserApi, isEditionProfile: false });
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при обновлении аватара');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Обновляет пароль пользователя.
   * @param data Данные для изменения пароля.
   */
  public static async updatePassword(data: TChangePasswordRequest) {
    this.setLoading(true);
    try {
      const response = await UsersApi.updatePassword(data);
      this.throwError(response, 'Ошибка изменения пароля');

      // TODO добавить дополнительную логику после успешного обновления пароля
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при изменении пароля');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Ищет пользователей по логину.
   * @param data Данные для поиска пользователя.
   */
  public static async searchUsers(data: TFindUserRequest) {
    this.setLoading(true);
    try {
      const response = await UsersApi.searchUsers(data);
      this.throwError(response, 'Ошибка поиска пользователей');

      return response;

      // TODO добавить дополнительную логику после успешного поиска
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при поиске пользователей');
      return undefined;
    } finally {
      this.setLoading(false);
    }
  }

  // /**
  //  * Ищет пользователей по логину.
  //  * @param data Данные для поиска пользователя.
  //  */
  public static async getUserByID(id: string | number) {
    this.setLoading(true);
    try {
      const response = await UsersApi.fetchUserByID(id);
      this.throwError(response, 'Ошибка поиска пользователей');

      this.store.set({ findUser: response as TUserApi });

      // TODO добавить дополнительную логику после успешного поиска
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при поиске пользователей');
    } finally {
      this.setLoading(false);
    }
  }
}
