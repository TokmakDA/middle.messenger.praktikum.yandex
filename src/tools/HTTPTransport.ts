import { queryStringify } from './utils.ts';
import { BASE_URL } from '../lib/constants.ts';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

type TMethod = keyof typeof METHODS;

type THeaders = Record<string, string>;

interface TOptions<TRequest> {
  method: TMethod;
  data?: TRequest;
  headers?: THeaders;
  timeout?: number;
}

type HTTPMethod = <TRequest, TResponse>(
  url: string,
  options?: { data?: TRequest },
) => Promise<TResponse>;

export default class HTTPTransport {
  protected apiUrl: string;

  constructor(apiPath: string) {
    this.apiUrl = `${BASE_URL}${apiPath}`;
  }

  get: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.DELETE });

  patch: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.PATCH });

  request = <TRequest, TResponse>(
    url: string,
    options: TOptions<TRequest>,
  ): Promise<TResponse> => {
    const { method, data, headers, timeout = 5000 } = options;
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
      xhr.timeout = timeout;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            console.log(xhr);
            const response = JSON.parse(xhr.response);
            resolve(response);
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
