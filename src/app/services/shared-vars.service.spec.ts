import {TestBed, inject} from '@angular/core/testing';
import {SharedVarsService} from './shared-vars.service';

describe('SharedVarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedVarsService]
    });
  });

  it('should ...', inject([SharedVarsService], (service: SharedVarsService) => {
    expect(service).toBeTruthy();
  }));

  it('should get and set', inject([SharedVarsService], (service: SharedVarsService) => {
    service.setVar<string>('testKey', 'testString');

    const result = service.getVar<string>('testKey');

    expect(result).toBe('testString');
  }));

  it('should return null for undefined', inject([SharedVarsService], (service: SharedVarsService) => {
    service.setVar<string>('testKey', 'testString');

    const result = service.getVar<string>('testKey1');

    expect(result).toBeNull();
  }));
});
