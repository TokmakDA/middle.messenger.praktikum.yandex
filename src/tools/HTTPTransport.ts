import { queryStringify } from '../lib/utils/utils';
import { BASE_URL } from '../lib/constants/apiEndpoints';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

type TMethod = keyof typeof METHODS;

type THeaders = Record<string, string>;

interface TOptions<T> {
  method?: TMethod;
  data?: T;
  headers?: THeaders;
  timeout?: number;
  withCredentials?: boolean;
}

type HTTPMethod = <TRequest, TResponse>(
  url: string,
  options?: TOptions<TRequest>,
) => Promise<TResponse>;

/**
 * Класс для выполнения HTTP-запросов
 */
export default class HTTPTransport {
  protected apiUrl: string;
  protected withCredentialsDefault: boolean;

  /**
   * Конструктор класса HTTPTransport
   * @param apiPath - Путь к API
   * @param withCredentialsDefault - Значение по умолчанию для withCredentials
   */
  constructor({ apiPath = '', withCredentials = false }) {
    this.apiUrl = `${BASE_URL}${apiPath}`;
    this.withCredentialsDefault = withCredentials;
  }

  get: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url: string, options) =>
    this.request(url, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.DELETE });

  patch: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.PATCH });

  /**
   * Выполняет HTTP-запрос
   * @param url - URL для запроса
   * @param options - Опции запроса
   * @returns Ответ сервера
   */
  request = <TRequest, TResponse>(
    url: string,
    options: TOptions<TRequest>,
  ): Promise<TResponse> => {
    const {
      method = 'GET',
      data,
      headers,
      timeout = 5000,
      withCredentials = this.withCredentialsDefault,
    } = options;
    let updatedUrl = `${this.apiUrl}${url}`;

    // Обработка GET-запроса с параметрами
    if (method === METHODS.GET && data) {
      const queryParams = queryStringify(data);
      updatedUrl += `?${queryParams}`;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, updatedUrl);
      xhr.setRequestHeader('Content-Type', 'application/json');

      // Установка заголовков запроса
      if (headers) {
        Object.entries(headers).forEach(([header, value]) => {
          xhr.setRequestHeader(header, value);
        });
      }

      xhr.withCredentials = withCredentials;
      xhr.timeout = timeout;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            if (xhr.response === 'OK') {
              resolve(xhr.response);
            } else {
              const response = JSON.parse(xhr.response);
              resolve(response);
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error}`));
          }
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Request failed'));
      };

      xhr.ontimeout = () => {
        reject(new Error('Request timed out'));
      };

      // Отправка данных в запросе
      xhr.send(method === METHODS.GET ? null : JSON.stringify(data));
    });
  };
}
