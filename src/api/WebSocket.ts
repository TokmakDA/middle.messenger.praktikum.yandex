import { WebSocketConnect, WebSocketResponseMessage } from '../@types/socket';
import store from '../services';
import URLS from '../lib/constants/urls';

export class WebSocketService {
  private socket: WebSocket | null = null;
  private static instance: WebSocketService;
  private pingInterval: NodeJS.Timeout | null = null;
  private store = store;

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
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
      // eslint-disable-next-line no-console
      console.log('Соединение закрыто чисто');
    } else {
      // eslint-disable-next-line no-console
      console.log('Обрыв соединения');
    }
    // eslint-disable-next-line no-console
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
  };

  private onMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    this.handleIncomingMessage(data);
  };

  private onError = (event: Event) => {
    // eslint-disable-next-line no-console
    console.warn('Ошибка', (event as ErrorEvent).message);
  };

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

  public sendFile(content: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content,
          type: 'file',
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
