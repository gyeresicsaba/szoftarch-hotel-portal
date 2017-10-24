import {TestBed, inject} from '@angular/core/testing';
import {SpinnerService} from './spinner.service';

describe('SpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService]
    });
  });

  it('should return 0', inject([SpinnerService], (service: SpinnerService) => {
    service.getSpinnerCounter('test').subscribe((counter) => {
      expect(counter).toBe(0);
    });
  }));

  it('should increment counter', inject([SpinnerService], (service: SpinnerService) => {
    service.incrementCounter('test');

    service.getSpinnerCounter('test').subscribe((counter) => {
      expect(counter).toBe(1);
    });
  }));

  it('should return undefine', inject([SpinnerService], (service: SpinnerService) => {
    service.decrementCounter('test');

    service.getSpinnerCounter('test').subscribe((counter) => {
      expect(counter).toBeUndefined();
    });

  }));

  it('should decrement counter', inject([SpinnerService], (service: SpinnerService) => {
    service.incrementCounter('test');
    service.incrementCounter('test');
    service.incrementCounter('test');

    service.decrementCounter('test');

    service.getSpinnerCounter('test').subscribe((counter) => {
      expect(counter).toBe(2);
    });
  }));
});
