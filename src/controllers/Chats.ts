import ChatsApi from '../api/chats';
import { BaseController } from './BaseController';
import {
  TChat,
  TChatListParams,
  TCreateChatRequest,
  TChatRequest,
  TChatUsersPayload,
  TChangeChatUsersRequest,
  ChatUser,
} from '../@types/api';

export class ChatsController extends BaseController {
  /**
   * Получает список чатов с учетом параметров запроса.
   * @param data Параметры для запроса списка чатов.
   * @param data.offset Опциональный параметр для сдвига страницы (пагинации). Тип: number.
   * @param data.limit Опциональный параметр для лимита количества результатов на страницу. Тип: number.
   * @param data.title Опциональный параметр для фильтрации по названию чата. Тип: string.
   */
  public static async fetchChatList(data: TChatListParams) {
    this.setLoading(true);
    try {
      const response = await ChatsApi.fetchChatList(data);
      this.throwError(response, 'Ошибка получения списка чатов');

      console.log('Чаты успешно получены', response);

      window.store.set({
        chatList: response as TChat[],
      });
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при получении списка чатов');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Создает новый чат.
   * @param data Параметры для создания чата.
   * @param data.title Название нового чата. Тип: string.
   */
  public static async createChat(data: TCreateChatRequest) {
    this.setLoading(true);
    try {
      const response = await ChatsApi.createChat(data);
      this.throwError(response, 'Ошибка создания чата');

      console.log('Чат успешно создан', response);
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при создании чата');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Удаляет существующий чат.
   * @param data Параметры для удаления чата.
   * @param data.chatId ID чата для удаления. Тип: number.
   */
  public static async deleteChat(data: TChatRequest) {
    this.setLoading(true);
    try {
      const response = await ChatsApi.deleteChat(data);
      this.throwError(response, 'Ошибка удаления чата');

      console.log('Чат успешно удален', response);
    } catch (error) {
      this.handleError(error, 'Неизвестная ошибка при удалении чата');
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Получает список пользователей чата по его ID.
   * @param data Параметры для запроса пользователей чата.
   * @param data.id ID чата. Тип: number.
   * @param data.data Опциональные параметры для фильтрации пользователей. Тип: TChatUsersQueryParams.
   */
  public static async fetchUsersChat(data: TChatUsersPayload) {
    this.setLoading(true);
    try {
      const response = await ChatsApi.fetchUsers(data);
      this.throwError(response, 'Ошибка получения списка пользователей чата');

      console.log('Список пользователей получен', response);

      window.store.set({
        chatUsers: response as ChatUser[],
      });
    } catch (error) {
      this.handleError(
        error,
        'Неизвестная ошибка при получении списка пользователей чата',
      );
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Добавляет пользователей в чат.
   * @param data Параметры для добавления пользователей.
   * @param data.chatId ID чата, в который добавляются пользователи. Тип: number.
   * @param data.users Массив ID пользователей для добавления. Тип: number[].
   */
  public static async addUsersToChat(data: TChangeChatUsersRequest) {
    this.setLoading(true);
    try {
      const response = await ChatsApi.addUsersToChat(data);
      this.throwError(response, 'Ошибка добавления пользователей в чат');

      console.log('Пользователи успешно добавлены в чат', response);
    } catch (error) {
      this.handleError(
        error,
        'Неизвестная ошибка при добавлении пользователей в чат',
      );
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Удаляет пользователей из чата.
   * @param data Параметры для удаления пользователей.
   * @param data.chatId ID чата, из которого удаляются пользователи. Тип: number.
   * @param data.users Массив ID пользователей для удаления. Тип: number[].
   */
  public static async removeUsersFromChat(data: TChangeChatUsersRequest) {
    this.setLoading(true);
    try {
      const response = await ChatsApi.removeUsersFromChat(data);
      this.throwError(response, 'Ошибка удаления пользователей из чата');

      console.log('Пользователи успешно удалены из чата', response);
    } catch (error) {
      this.handleError(
        error,
        'Неизвестная ошибка при удалении пользователей из чата',
      );
    } finally {
      this.setLoading(false);
    }
  }
}
