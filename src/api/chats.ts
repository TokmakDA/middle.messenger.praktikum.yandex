import HTTPTransport from '../tools/HTTPTransport';
import {
  TErrorApi,
  ChatUser,
  TChatUsersQueryParams,
  TChat,
  TChatListParams,
  TChatUsersPayload,
  TCreateChatRequest,
  TCreateChatResponse,
  TChatRequest,
  TDeleteChatResponse,
  TChangeChatUsersRequest,
} from '../@types/api';
import URLS from '../lib/constants/urls';

const transport = new HTTPTransport({ withCredentials: true });

export default class ChatsApi {
  static async fetchChatList(
    data: TChatListParams,
  ): Promise<TChat[] | TErrorApi> {
    return transport.get<TChatListParams, TChat[] | TErrorApi>(
      URLS.chats.base,
      {
        data,
      },
    );
  }

  static async createChat(
    data: TCreateChatRequest,
  ): Promise<TCreateChatResponse | TErrorApi> {
    return transport.post<TCreateChatRequest, TCreateChatResponse | TErrorApi>(
      URLS.chats.base,
      {
        data,
      },
    );
  }

  static async deleteChat(
    data: TChatRequest,
  ): Promise<TDeleteChatResponse | TErrorApi> {
    return transport.delete<TChatRequest, TDeleteChatResponse | TErrorApi>(
      URLS.chats.base,
      {
        data,
      },
    );
  }

  static async fetchUsers(
    payload: TChatUsersPayload,
  ): Promise<ChatUser[] | TErrorApi> {
    return transport.get<TChatUsersQueryParams, ChatUser[] | TErrorApi>(
      `${URLS.users.user(payload.id)}`,
      {
        data: payload.data,
      },
    );
  }
  static async addUsersToChat(
    data: TChangeChatUsersRequest,
  ): Promise<never | TErrorApi> {
    return transport.put<TChangeChatUsersRequest, never | TErrorApi>(
      URLS.chats.modifyUsers,
      {
        data,
      },
    );
  }

  static async removeUsersFromChat(
    data: TChangeChatUsersRequest,
  ): Promise<never | TErrorApi> {
    return transport.delete<TChangeChatUsersRequest, never | TErrorApi>(
      URLS.chats.modifyUsers,
      {
        data,
      },
    );
  }
}
