// Типы для работы с WebSocket
export interface WebSocketMessage {
  type: string;
  content: string;
}

export interface WebSocketOldMessagesRequest extends WebSocketMessage {
  type: 'get old';
  content: string; // offset в виде строки
}

export interface WebSocketSendMessageRequest extends WebSocketMessage {
  type: 'message';
  content: string;
}

export interface WebSocketSendFileRequest extends WebSocketMessage {
  type: 'file';
  content: string; // ID файла
}

export interface WebSocketSendStickerRequest extends WebSocketMessage {
  type: 'sticker';
  content: string; // ID стикера
}

export interface WebSocketPingRequest extends WebSocketMessage {
  type: 'ping';
}

export interface WebSocketResponseMessage {
  chat_id: number;
  time: string;
  type: 'message' | 'file' | 'sticker';
  user_id: string;
  content: string;
  file?: WebSocketResponseFile;
}

export interface WebSocketResponseFile {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export interface WebSocketConnect {
  chatId: number;
  userId: number;
  token: string;
}
