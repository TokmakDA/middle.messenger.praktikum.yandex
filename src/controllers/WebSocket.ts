import {
  WebSocketConnect,
  WebSocketMessage,
  WebSocketResponseMessage,
} from '../@types/socket';
import store from '../services/index';
import URLS from '../lib/constants/urls';
import { BaseController } from './BaseController';

export class WebSocketController extends BaseController {
  private socket: WebSocket | null = null;
  private static instance: WebSocketController;
  private pingInterval: NodeJS.Timeout | null = null;
  private store = store;

  public static getInstance(): WebSocketController {
    if (!WebSocketController.instance) {
      WebSocketController.instance = new WebSocketController();
    }
    return WebSocketController.instance;
  }

  public async connect({ userId, chatId, token }: WebSocketConnect) {
    this.closeConnection();

    this.socket = new WebSocket(
      URLS.ws({
        userId,
        chatId,
        token,
      }),
    );

    this.socket.addEventListener('open', this.onOpen);
    this.socket.addEventListener('close', this.onClose);
    this.socket.addEventListener('message', this.onMessage);
    this.socket.addEventListener('error', this.onError);

    this.pingInterval = setInterval(() => {
      this.sendPing();
    }, 30000);
  }

  private onOpen = () => {
    this.fetchOldMessages();
  };

  private onClose = (event: CloseEvent) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
  };

  private onMessage = (event: MessageEvent) => {
    // console.log('Получены данные', event.data);
    const data = JSON.parse(event.data);
    this.handleIncomingMessage(data);
  };

  private onError = (event: Event) => {
    console.log('Ошибка', (event as ErrorEvent).message);
  };

  private sendUserConnectedNotification() {
    const { user } = this.store.getState();
    if (user) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(
          JSON.stringify({
            content: `${user.id}`,
            type: 'user connected',
          } as WebSocketMessage),
        );
      }
    }
  }

  private isValidMessage(
    message: unknown,
  ): message is WebSocketResponseMessage {
    const validTypes = ['message', 'file', 'sticker'];
    return (
      typeof message === 'object' &&
      message !== null &&
      'type' in message &&
      validTypes.includes((message as WebSocketResponseMessage).type)
    );
  }

  private handleIncomingMessage(
    data: WebSocketResponseMessage[],
    isOld?: boolean,
  ) {
    const messages = this.store.getState().messages || [];

    if (Array.isArray(data) && data.some(this.isValidMessage)) {
      this.store.set({
        messages: isOld ? [...messages, ...data] : [...data, ...messages],
      });
    } else if (this.isValidMessage(data)) {
      this.store.set({
        messages: [data, ...messages],
      });
    } else {
      console.warn('Игнорируем неподдерживаемое сообщение', data);
    }
  }

  public sendPing() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          type: 'ping',
          content: '',
        }),
      );
    }
  }

  public sendMessage(content: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content,
          type: 'message',
        }),
      );
    }
  }

  public sendFile(fileId: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: fileId,
          type: 'file',
        }),
      );
    }
  }

  public sendSticker(stickerId: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: stickerId,
          type: 'sticker',
        }),
      );
    }
  }

  public fetchOldMessages(offset: string = '0') {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: offset,
          type: 'get old',
        }),
      );
    }
  }

  public closeConnection() {
    if (this.socket) {
      this.socket.close();
      this.store.set({
        messages: [],
      });
    }
  }
}
