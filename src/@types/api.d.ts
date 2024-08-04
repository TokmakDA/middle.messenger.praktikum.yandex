export type TSignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignUpResponse = {
  id: number;
};

export type TSignInRequest = {
  login: string;
  password: string;
};

export type TErrorApi = {
  reason: string;
};

export type TFindUserRequest = {
  login: string;
};

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TAvatarFile = File & {
  type: 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/gif' | 'image/webp';
};

export type TUserApi = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type TUpdateUserRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

// Для чатов

// Параметры запроса для получения списка чатов
export type TChatListParams = {
  offset?: number; // Сдвиг для пагинации (query)
  limit?: number; // Лимит результатов на страницу (query)
  title?: string; // Название (query)
};

// Типы для структуры данных ответа
export type TChatListUser = {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
};

export interface LastMessage {
  user: TChatListUser;
  time: string;
  content: string;
}

export type TChat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessage | null;
};

// Тип для запроса создания чата
export type TCreateChatRequest = {
  title: string;
};

// Тип для ответа после создания чата
export type TCreateChatResponse = {
  id: number;
};

// Тип для запроса на удаление чата
export type TChatRequest = {
  chatId: number;
};

// Тип для ответа после удаления чата
export type TDeleteChatResponse = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
  };
};

// Параметры пути (path parameters)
export type TPathID = {
  id: string | number; // ID, обязательный параметр пути
};
// Параметры данных запроса (payload)
export type TChatUsersQueryParams = {
  offset?: number; // Сдвиг для пагинации (query)
  limit?: number; // Лимит результатов на страницу (query)
  name?: string; // Фильтрация по имени (query)
  email?: string; // Фильтрация по email (query)
};

// Тип для ответа получения пользователей
export type ChatUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
};

export type TChatUsersPayload = {
  data: TChatUsersQueryParams;
} & TPathID;

export type TChangeChatUsersRequest = {
  users: number[];
} & TChatRequest;
