/**
 * Created by ekemate on 2017. 02. 23..
 */
export class MockCustomAuthHttpService {
  get = jasmine.createSpy('get');
  put = jasmine.createSpy('put');
  post = jasmine.createSpy('post');
  //noinspection ReservedWordAsName
  delete = jasmine.createSpy('delete');

  constructor() {
  }
}
