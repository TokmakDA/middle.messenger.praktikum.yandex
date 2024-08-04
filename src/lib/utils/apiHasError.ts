import { TErrorApi } from '../../@types/api';

export function apiHasError(response: unknown): response is TErrorApi {
  return (response as TErrorApi)?.reason !== undefined;
}
