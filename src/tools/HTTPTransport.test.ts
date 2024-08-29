import { expect, use } from 'chai';
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import sinonChai from 'sinon-chai';
import HTTPTransport from './HTTPTransport';
import URLS from '../lib/constants/urls';

describe('HTTP Transport', function () {
  use(sinonChai);

  let http: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];
  let xhr: SinonFakeXMLHttpRequestStatic;

  before(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (request) => requests.push(request);
  });

  beforeEach(() => {
    requests = [];
    http = new ({});
  });

  after(() => {
    xhr.restore();
  });

  describe('GET requests', () => {
    it('should include query params in GET request', () => {
      const data = { first: 1, second: 2 };
      const expectedUrl = `${URLS.base}/test?first=1&second=2`;

      http.get('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];

      expect(request.url).to.equal(expectedUrl);
      expect(request.method).to.equal('GET');
    });

    it('should not include incorrect query params in GET request', () => {
      const data = { first: 1, second: 2 };
      const incorrectUrl = `${URLS.base}/test?wrong=param`;

      http.get('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];

      expect(request.url).to.not.equal(incorrectUrl);
    });

    it('should handle empty query parameters correctly', () => {
      const data = {};
      const expectedUrl = `${URLS.base}/test`;

      http.get('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];

      expect(request.url).to.equal(expectedUrl);
    });
  });

  describe('POST requests', () => {
    it('should include request body in POST request', () => {
      const data = { first: 1, second: 2 };
      const expectedUrl = `${URLS.base}/test`;

      http.post('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];

      expect(request.url).to.equal(expectedUrl);
      expect(request.requestBody).to.deep.equal(JSON.stringify(data));
      expect(request.method).to.equal('POST');
    });

    it('should not have incorrect data in the request body for POST request', () => {
      const data = { first: 1, second: 2 };

      http.post('/test', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];

      expect(request.requestBody).to.not.deep.equal(
        JSON.stringify({ wrong: 'data' }),
      );
    });
  });

  describe('PUT and DELETE requests', () => {
    it('should handle PUT request correctly', () => {
      const data = { update: 'value' };
      const expectedUrl = `${URLS.base}/update`;

      http.put('/update', { data });

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];

      expect(request.url).to.equal(expectedUrl);
      expect(request.method).to.equal('PUT');
      expect(request.requestBody).to.deep.equal(JSON.stringify(data));
    });

    it('should handle DELETE request correctly', () => {
      const expectedUrl = `${URLS.base}/delete`;

      http.delete('/delete');

      expect(requests).to.have.lengthOf(1);
      const request = requests[0];

      expect(request.url).to.equal(expectedUrl);
      expect(request.method).to.equal('DELETE');
    });
  });
});
