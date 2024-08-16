import { apiHasError } from '../lib/utils/apiHasError';
import { ROUTES_PATH } from '../lib/constants/routes';
import { INITIAL_STATE } from '../lib/constants/state';
import { Store } from '../services/Store';
import { AppState } from '../@types/store';

/**
 * Базовый контроллер с общими методами.
 */
export class BaseController {
  protected static store: Store<AppState> = window.store;

  /**
   * Обновляет ошибки в состоянии store.
   * @param value Новое состояние ошибки.
   */
  protected static setError(value: string | null) {
    this.store.set({ error: value });
  }

  /**
   * Очищает ошибки в состоянии store.
   */
  protected static clearError() {
    this.setError(null);
  }

  /**
   * Сбрасывает ошибки при изменении поля формы.
   */
  public static changeForm() {
    const { error } = this.store.getState();
    if (error) {
      this.clearError(); // Очищаем ошибки, если они есть
    }
  }

  /**
   * Обрабатывает ошибки и устанавливает их в состояние store.
   * @param error Ошибка для обработки.
   * @param defaultErrorMessage Сообщение по умолчанию, если ошибка не является экземпляром Error.
   */
  protected static handleError(
    error: unknown,
    defaultErrorMessage: string = 'Неизвестная ошибка',
  ) {
    const errorMessage =
      error instanceof Error ? error.message : defaultErrorMessage;
    this.setError(errorMessage);
    // eslint-disable-next-line no-console
    console.error('Error:', errorMessage);
  }

  /**
   * Проверяет наличие ошибки в ответе и выбрасывает её при необходимости.
   * @param response Ответ от API.
   * @param unknownErrorMessage Сообщение по умолчанию для неизвестной ошибки.
   */
  protected static throwError(
    response: unknown,
    unknownErrorMessage: string = 'Неизвестная ошибка',
  ) {
    if (apiHasError(response)) {
      const errorResponse = response as { reason?: string };
      throw new Error(errorResponse.reason || unknownErrorMessage);
    }
  }

  /**
   * Очищает состояние пользователя и перенаправляет на страницу авторизации.
   */
  protected static clearState() {
    this.store.set(INITIAL_STATE);
    window.router.go(ROUTES_PATH.signin);
  }

  /**
   * Обновляет состояние загрузки.
   * @param isLoading Статус загрузки.
   */
  protected static setLoading(isLoading: boolean) {
    this.store.set({ isLoading });
  }

  /**
   * Создает FormData из файла для обновления аватара.
   * @param file Файл изображения.
   * @param name
   * @returns FormData для отправки.
   */
  protected static createFormData(file: File, name: string): FormData {
    const formData = new FormData();
    formData.append(name, file);
    return formData;
  }
}
