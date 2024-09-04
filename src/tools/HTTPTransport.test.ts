import { expect, use } from 'chai';
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import sinonChai from 'sinon-chai';
import HTTPTransport from './HTTPTransport';
import URLS from '../lib/constants/urls';

describe('HTTP Transport', () => {
  use(sinonChai);

  let http: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];
  let xhr: SinonFakeXMLHttpRequestStatic;

  // Подменяем оригинальные XHR-запросы на тестовые, чтобы перехватывать их
  before(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (request) => requests.push(request);
  });

  // Очищаем список запросов и создаем новый экземпляр HTTPTransport перед каждым тестом
  beforeEach(() => {
    requests = [];
    http = new HTTPTransport({});
  });

  // Восстанавливаем оригинальные XHR после выполнения всех тестов
  after(() => {
    xhr.restore();
  });

  // Тестируем GET-запросы
  describe('GET requests', () => {
    it('should include query params in GET request', () => {
      // Проверяем, что параметры запроса правильно включены в URL
      const data = { first: 1, second: 2 };
      const expectedUrl = `${URLS.base}/test?first=1&second=2`;

      http.get('/test', { data });

      // Проверка, что был выполнен один запрос
      expect(requests).to.have.lengthOf(1);
      const request = requests[0];
      // URL должен содержать параметры
      expect(request.url).to.equal(expectedUrl);
      // Метод должен быть GET
      expect(request.method).to.equal('GET');
    });

    it('should not include incorrect query params in GET request', () => {
      // Проверяем, что неверные параметры не включаются в URL
      const data = { first: 1, second: 2 };
      const incorrectUrl = `${URLS.base}/test?wrong=param`;

      http.get('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];
      // URL не должен содержать неправильные параметры
      expect(request.url).to.not.equal(incorrectUrl);
    });

    it('should handle empty query parameters correctly', () => {
      // Проверяем, что пустые параметры запроса обрабатываются правильно
      const data = {};
      const expectedUrl = `${URLS.base}/test`;

      http.get('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];
      // URL не должен содержать пустых параметров
      expect(request.url).to.equal(expectedUrl);
    });
  });

  // Тестируем POST-запросы
  describe('POST requests', () => {
    it('should include request body in POST request', () => {
      // Проверяем, что данные правильно включены в тело POST-запроса
      const data = { first: 1, second: 2 };
      const expectedUrl = `${URLS.base}/test`;

      http.post('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];
      // URL должен быть правильным
      expect(request.url).to.equal(expectedUrl);
      // Тело запроса должно содержать данные
      expect(request.requestBody).to.deep.equal(JSON.stringify(data));
      // Метод должен быть POST
      expect(request.method).to.equal('POST');
    });

    it('should not have incorrect data in the request body for POST request', () => {
      // Проверяем, что неправильные данные не включаются в тело запроса
      const data = { first: 1, second: 2 };

      http.post('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];
      // Тело не должно содержать неправильные данные
      expect(request.requestBody).to.not.deep.equal(
        JSON.stringify({ wrong: 'data' }),
      );
    });
  });

  // Тестируем PUT и DELETE запросы
  describe('PUT and DELETE requests', () => {
    it('should handle PUT request correctly', () => {
      // Проверяем, что PUT-запрос правильно обрабатывается
      const data = { update: 'value' };
      const expectedUrl = `${URLS.base}/update`;

      http.put('/update', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];
      // URL должен быть правильным
      expect(request.url).to.equal(expectedUrl);
      // Метод должен быть PUT
      expect(request.method).to.equal('PUT');
      // Тело запроса должно содержать данные
      expect(request.requestBody).to.deep.equal(JSON.stringify(data));
    });

    it('should handle DELETE request correctly', () => {
      // Проверяем, что DELETE-запрос правильно обрабатывается
      const expectedUrl = `${URLS.base}/delete`;

      http.delete('/delete');

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];
      // URL должен быть правильным
      expect(request.url).to.equal(expectedUrl);
      // Метод должен быть DELETE
      expect(request.method).to.equal('DELETE');
    });
  });
});
