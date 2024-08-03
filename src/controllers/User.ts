import UsersApi from '../api/users';
import {
  TChangePasswordRequest,
  TFindUserRequest,
  TUpdateUserRequest,
} from '../@types/api';
import { User } from '../@types/types';
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

      window.store.set({ user: response as User, isEditionProfile: false });
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при обновлении профиля');
    } finally {
      this.setLoading(false);
    }
  }

  // TODO ПРоверить, может лучше вынесу в компонент
  /**
   * Создает FormData из файла для обновления аватара.
   * @param file Файл изображения.
   * @returns FormData для отправки.
   */
  private static createAvatarFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('avatar', file);
    return formData;
  }

  /**
   * Обновляет аватар пользователя.
   * @param file Файл изображения для обновления аватара.
   */
  public static async updateAvatar(file: File) {
    this.setLoading(true);
    try {
      const formData = this.createAvatarFormData(file);

      const response = await UsersApi.updateAvatar(formData);
      this.throwError(response, 'Ошибка обновления аватара');

      // TODO Проверить на другую логику
      window.store.set({ user: response as User, isEditionProfile: false });
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

      window.store.set({ findUsers: response as User[] });

      // TODO добавить дополнительную логику после успешного поиска
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при поиске пользователей');
    } finally {
      this.setLoading(false);
    }
  }
}
