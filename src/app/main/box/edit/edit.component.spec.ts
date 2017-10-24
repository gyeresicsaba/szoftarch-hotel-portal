import {inject, TestBed} from '@angular/core/testing';
import {EditResolve} from './edit.resolve';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {MockSpinnerService} from '../../../../mock/spinner-service.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {MockRouter} from '../../../../mock/router.mock';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {SharedVarsService} from '../../../services/shared-vars.service';
import {TestData} from '../../../../mock/test-data';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Box} from '../../../models/box';

describe('EditComponent', () => {
  let mockAuthHttp: MockCustomAuthHttpService;
  let mockSpinner: MockSpinnerService;
  let mockRouter: MockRouter;
  let activatedRoute: ActivatedRouteSnapshot;

  beforeEach(() => {
    mockSpinner = new MockSpinnerService();
    mockAuthHttp = new MockCustomAuthHttpService();
    mockRouter = new MockRouter();
    activatedRoute = new ActivatedRouteSnapshot();
    activatedRoute.params = {id: 1};
    activatedRoute.data = {breadcrumbVar: 'currentBoxNumber'};

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        SharedVarsService,
        EditResolve,
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp
        },
        {
          provide: SpinnerService,
          useValue: mockSpinner
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });
  });

  it('should call http', inject([EditResolve], (resolve: EditResolve) => {
    spyOn(SharedVarsService.prototype, 'setVar');

    mockAuthHttp.get.and.callFake((param) => Observable.of(TestData.responses[param]));
    resolve.resolve(activatedRoute).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(SharedVarsService.prototype.setVar)
      .toHaveBeenCalledWith('currentBoxNumber', TestData.boxDetailsResponse.data.box_number);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('boxes/1');
  }));

  it('should map objects', inject([EditResolve], (resolve: EditResolve) => {
    mockAuthHttp.get.and.callFake((param) => Observable.of(TestData.responses[param]));
    resolve.resolve(activatedRoute).subscribe(data => {
      expect(data).toEqual(jasmine.any(Box));
    });
  }));

  it('should catch error and navigate', inject([EditResolve], (resolve: EditResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.throw({error: {status_code: 500, message: 'test EditableUser details resolve error'}}));
    resolve.resolve(activatedRoute).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
  }));
});
