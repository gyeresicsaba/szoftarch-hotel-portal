/**
 * Created by ekemate on 2017. 02. 23..
 */
import {Subject} from 'rxjs/Rx';
export class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
  navigate = jasmine.createSpy('navigate');
  events = new Subject();
  //noinspection JSUnusedGlobalSymbols
  createUrlTree = jasmine.createSpy('createUrlTree');
  //noinspection JSUnusedGlobalSymbols
  serializeUrl = jasmine.createSpy('serializeUrl');
}
