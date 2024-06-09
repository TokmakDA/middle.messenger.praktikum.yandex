/* eslint-disable no-console */
import AuthApi from '../api/auth';
import { TSignInRequest, TSignUpRequest } from '../@types/api';
import { ROUTES_PATH } from '../lib/constants';
import { User } from '../@types/types';
import { apiHasError } from '../tools/apiHasError';

const authApi = new AuthApi();
export class UserAuthController {
  public static async login(data: TSignInRequest) {
    //  console.group('login => ');
    //  console.log('data => ', data);
    try {
      window.store.set({ isLoading: true });
      const response = await authApi.login(data);
      if (apiHasError(response)) {
        window.store.set({ error: response.reason });
        throw Error(response.reason);
      }
      await this.getUserMe();
      window.router.go(ROUTES_PATH.chat);
    } catch (error) {
      window.store.set({ error: 'Неизвестная ошибка' });
      //  console.error(error);
    } finally {
      window.store.set({ isLoading: false });
      //  console.groupEnd();
    }
  }

  public static async signUp(data: TSignUpRequest) {
    //  console.group('signUp => ');
    //  console.log('data => ', data);
    window.store.set({ isLoading: true });
    try {
      const response = await authApi.create(data);
      //  console.log(response);
      if (apiHasError(response)) {
        window.store.set({ error: response.reason });
        throw Error(response.reason);
      }
      await this.getUserMe();
      window.router.go(ROUTES_PATH.chat);
    } catch (error) {
      window.store.set({ error: 'Неизвестная ошибка' });
      //  console.error(error);
    } finally {
      window.store.set({ isLoading: false });
      //  console.groupEnd();
    }
  }

  public static async getUserMe() {
    //  console.group('getUserMe => ');
    window.store.set({ isLoading: true });
    try {
      const response = await authApi.me();
      //  console.log(response);

      if (apiHasError(response)) {
        window.store.set({ error: response.reason });
        //  console.error(response.reason);
      } else {
        window.store.set({ user: response as User });
      }
    } catch (error) {
      window.store.set({
        error: 'Произошла ошибка при получении пользовательских данных',
      });
      //  console.error(error);
    } finally {
      window.store.set({ isLoading: false });
      //  console.groupEnd();
    }
  }

  public static async logout() {
    //  console.group('logout => ');

    window.store.set({ isLoading: true });

    try {
      await authApi.logout();
      window.store.set({ user: null, chats: [] });
      window.router.go(ROUTES_PATH.signin);
    } catch (error) {
      if (typeof error === 'string') {
        window.store.set({
          error,
        });
      } else if (error instanceof Error) {
        window.store.set({
          error: error.message || 'Неизвестная ошибка',
        });
      } else {
        window.store.set({
          error: 'Неизвестная ошибка',
        });
      }
      //  console.error(error);
    } finally {
      window.store.set({ isLoading: false });
      //  console.groupEnd();
    }
  }
}
