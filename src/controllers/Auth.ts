/* eslint-disable no-console */
import AuthApi from '../api/auth';
import { TSignInRequest, TSignUpRequest, TUserApi } from '../@types/api';
import { ROUTES_PATH } from '../lib/constants/routes';
import { BaseController } from './BaseController';

export class UserAuthController extends BaseController {
  /**
   * Выполняет вход пользователя в систему.
   * @param data Данные для входа.
   */
  public static async login(data: TSignInRequest) {
    try {
      this.setLoading(true);
      const response = await AuthApi.login(data);
      this.throwError(response, 'Ошибка авторизации');
      await this.getUserMe();
      window.router.go(ROUTES_PATH.chat);
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка авторизации');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Регистрация нового пользователя.
   * @param data Данные для регистрации.
   */
  public static async signUp(data: TSignUpRequest) {
    this.setLoading(true);
    try {
      const response = await AuthApi.create(data);
      this.throwError(response, 'Ошибка при регистрации');
      await this.getUserMe();
      window.router.go(ROUTES_PATH.chat);
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при регистрации');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Получает информацию о текущем пользователе и обновляет состояние.
   */
  public static async getUserMe() {
    this.setLoading(true);
    try {
      const response = await AuthApi.me();
      this.throwError(
        response,
        'Произошла ошибка при получении пользовательских данных',
      );
      this.store.set({ user: response as TUserApi, isAuthorized: true });
    } catch (error) {
      this.handleError(error);
      this.clearState();
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Выполняет выход пользователя из системы и перенаправляет на страницу авторизации.
   */
  public static async logout() {
    this.setLoading(true);
    try {
      const response = await AuthApi.logout();
      this.throwError(response, 'Неизвестная ошибка');
      this.clearState();
    } catch (error) {
      this.handleError(error);
    } finally {
      this.setLoading(false);
    }
  }
}
