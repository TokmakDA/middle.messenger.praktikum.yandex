// import { expect, use } from 'chai';
// import { createSandbox, SinonStub } from 'sinon';
// import sinonChai from 'sinon-chai';
// import HTTPTransport from './HTTPTransport';
// // import { queryString } from '../lib/utils/utils';
//
// use(sinonChai);
//
// describe.skip('HTTP Transport', () => {
//   const sandbox = createSandbox();
//   let http: HTTPTransport;
//   let requestStub: SinonStub;
//
//   beforeEach(() => {
//     http = new HTTPTransport({});
//     requestStub = sandbox.stub(http, 'request').resolves([]);
//     // request = sandbox
//     // .stub(http, 'request' as keyof typeof http)
//     // .callsFake(() => Promise.resolve())
//     // .resolves([]);
//   });
//
//   afterEach(() => {
//     sandbox.restore();
//   });
//
//   it('should include query params in GET request', () => {
//     const data = { first: 1, second: 2 };
//     // const queryParams = queryString(data);
//     // const expectedUrl = `/test?${queryParams}`;
//
//     http.get('/test', { data });
//
//     expect(requestStub).calledWithMatch(`/test?&first=1&second=2`);
//   });
// });
