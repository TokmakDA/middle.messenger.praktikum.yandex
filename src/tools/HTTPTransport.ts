import { queryStringify } from './utils';
import { BASE_URL } from '../lib/constants';

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

export default class HTTPTransport {
  protected apiUrl: string;
  protected withCredentialsDefault: boolean;

  constructor(apiPath: string, withCredentialsDefault = false) {
    this.apiUrl = `${BASE_URL}${apiPath}`;
    this.withCredentialsDefault = withCredentialsDefault;
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

    if (method === METHODS.GET && data) {
      const queryParams = queryStringify(data);
      updatedUrl += `?${queryParams}`;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, updatedUrl);
      xhr.setRequestHeader('Content-Type', 'application/json');

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

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
