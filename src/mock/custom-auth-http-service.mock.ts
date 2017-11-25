export class MockCustomAuthHttpService {
  get = jasmine.createSpy('get');
  put = jasmine.createSpy('put');
  post = jasmine.createSpy('post');
  //noinspection ReservedWordAsName
  delete = jasmine.createSpy('delete');

  constructor() {
  }
}
