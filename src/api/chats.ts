import HTTPTransport from '../tools/HTTPTransport';
import {
  TErrorApi,
  ChatUser,
  TChatUsersQueryParams,
  TChatCard,
  TChatListParams,
  TChatUsersPayload,
  TCreateChatRequest,
  TCreateChatResponse,
  TChatRequest,
  TDeleteChatResponse,
  TChangeChatUsersRequest,
  TPathID,
  TTokenChat,
} from '../@types/api';
import URLS from '../lib/constants/urls';

const transport = new HTTPTransport({ withCredentials: true });

export default class ChatsApi {
  static async fetchChatList(
    data: TChatListParams,
  ): Promise<TChatCard[] | TErrorApi> {
    return transport.get<TChatListParams, TChatCard[] | TErrorApi>(
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
      `${URLS.chats.users(payload.id)}`,
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

  static async getTokenFromChat({
    id,
  }: TPathID): Promise<TTokenChat | TErrorApi> {
    return transport.post<TPathID, TTokenChat | TErrorApi>(
      URLS.chats.token(id),
    );
  }

  static async setChatAvatar(data: FormData): Promise<never | TErrorApi> {
    return transport.put<FormData, never | TErrorApi>(URLS.chats.avatar, {
      data,
    });
  }
}
