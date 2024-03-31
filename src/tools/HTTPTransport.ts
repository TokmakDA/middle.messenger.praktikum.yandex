const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

type TOptions = {
  method: string;
  data?: { [key: string]: string };
  headers?: { [key: string]: string };
  timeout?: number;
};

function queryStringify(data: { [key: string]: string }): string {
  return Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join('&');
}

export default class HTTPTransport {
  get(url: string, options: TOptions) {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  }

  post(url: string, options: TOptions) {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  }

  put(url: string, options: TOptions) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  }

  patch(url: string, options: TOptions) {
    return this.request(
      url,
      { ...options, method: METHODS.PATCH },
      options.timeout,
    );
  }

  delete(url: string, options: TOptions) {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  request = (
    url: string,
    options: TOptions,
    timeout = 5000,
  ): Promise<unknown> => {
    const { method, data, headers } = options;
    let updatedUrl = url;

    if (method === METHODS.GET && data) {
      const queryParams = queryStringify(data);
      updatedUrl += `?${queryParams}`;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, updatedUrl);
      xhr.setRequestHeader('Content-Type', 'application/json');

      if (headers) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }

      xhr.timeout = timeout;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
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
