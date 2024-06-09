import { APIError } from '../@types/api';

export function apiHasError(response: unknown): response is APIError {
  return (response as APIError)?.reason !== undefined;
}
