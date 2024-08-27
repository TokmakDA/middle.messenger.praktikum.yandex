// import { expect, use } from 'chai';
// import { createSandbox, SinonStub } from 'sinon';
// import sinonChai from 'sinon-chai';
// import HTTPTransport from './HTTPTransport';
//
// describe.skip('HTTP Transport', () => {
//   use(sinonChai);
//
//   const sandbox = createSandbox();
//   let http: HTTPTransport;
//   let requestStub: SinonStub<any>;
//
//   beforeEach(() => {
//     http = new HTTPTransport({});
//     requestStub = sandbox
//       .stub(http, 'request' as keyof typeof http)
//       .callsFake(() => Promise.resolve());
//   });
//
//   afterEach(() => {
//     sandbox.restore();
//   });
//
//   it('should include query params in GET request', () => {
//     const data = { first: 1, second: 2 };
//
//     http.get('/test', { data });
//
//     expect(requestStub).calledWithMatch(`/test?&first=1&second=2`, 'GET');
//   });
// });
