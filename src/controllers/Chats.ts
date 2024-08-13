import ChatsApi from '../api/chats';
import { BaseController } from './BaseController';
import { WebSocketService } from '../api/WebSocket';

import {
  TChatCard,
  TChatListParams,
  TCreateChatRequest,
  TChatRequest,
  TChatUsersPayload,
  TChangeChatUsersRequest,
  ChatUser,
  TTokenChat,
} from '../@types/api';

export class ChatsController extends BaseController {
  private static wsService = WebSocketService;

  /**
   * Получает список чатов с учетом параметров запроса.
   * @param data Параметры для запроса списка чатов.
   * @param data.offset Опциональный параметр для сдвига страницы (пагинации). Тип: number.
   * @param data.limit Опциональный параметр для лимита количества результатов на страницу. Тип: number.
   * @param data.title Опциональный параметр для фильтрации по названию чата. Тип: string.
   */
  public static async fetchChatList(data?: TChatListParams) {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await ChatsApi.fetchChatList({ ...data, limit: 50 });
      this.throwError(response, 'Ошибка получения списка чатов');
      this.store.set({
        chatList: response as TChatCard[],
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
    this.clearError();
    try {
      const response = await ChatsApi.createChat(data);
      this.throwError(response, 'Ошибка создания чата');
      await this.fetchChatList();
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
    this.clearError();
    try {
      const response = await ChatsApi.deleteChat(data);
      this.throwError(response, 'Ошибка удаления чата');
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
    this.clearError();
    try {
      const response = await ChatsApi.fetchUsers(data);
      this.throwError(response, 'Ошибка получения списка пользователей чата');
      this.store.set({
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
    this.clearError();

    try {
      const response = await ChatsApi.addUsersToChat(data);
      this.throwError(response, 'Ошибка добавления пользователей в чат');
      await this.fetchUsersChat({ id: data.chatId } as TChatUsersPayload);
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
    this.clearError()
    try {
      const response = await ChatsApi.removeUsersFromChat(data);
      this.throwError(response, 'Ошибка удаления пользователей из чата');
      await this.fetchUsersChat({ id: data.chatId } as TChatUsersPayload);
    } catch (error) {
      this.handleError(
        error,
        'Неизвестная ошибка при удалении пользователей из чата',
      );
    } finally {
      this.setLoading(false);
    }
  }

  public static async selectChat(chat: TChatCard) {
    const { id } = chat;
    // TODO Добавить проверку на текущий чат
    const { user } = this.store.getState();
    await this.fetchUsersChat({ id } as TChatUsersPayload);

    const tokenResponse = await ChatsApi.getTokenFromChat({ id });
    this.throwError(tokenResponse, 'Ошибка удаления пользователей из чата');
    const { token } = tokenResponse as TTokenChat;
    if (chat.id && user && token) {
      await this.wsService.getInstance().connect({
        chatId: id,
        userId: user.id,
        token,
      });
      this.store.set({ currentChat: chat, isOpenDialogChat: true });

      this.wsService.getInstance().fetchOldMessages();
    }
  }
}
