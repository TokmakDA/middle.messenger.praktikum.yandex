import HTTPTransport from '../tools/HTTPTransport';
import { TErrorApi, TResourcesResponse } from '../@types/api';
import URLS from '../lib/constants/urls';

const transport = new HTTPTransport({ withCredentials: true });

export default class ResourcesApi {
  static async sendResource(
    data: FormData,
  ): Promise<TResourcesResponse | TErrorApi> {
    return transport.post<FormData, TResourcesResponse | TErrorApi>(
      URLS.resources,
      {
        data,
      },
    );
  }
}
