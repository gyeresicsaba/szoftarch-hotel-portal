import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {AnalysisBillingResolve} from './analysis-billing.resolve';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {MockSpinnerService} from '../../../../mock/spinner-service.mock';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {TestData} from '../../../../mock/test-data';

describe('AnalysisBillingResolve', () => {
  let mockAuthHttp: MockCustomAuthHttpService;
  let mockSpinner: MockSpinnerService;

  beforeEach(() => {
    mockSpinner = new MockSpinnerService();
    mockAuthHttp = new MockCustomAuthHttpService();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AnalysisBillingResolve,
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp
        },
        {
          provide: SpinnerService,
          useValue: mockSpinner
        }
      ]
    });
  });

  it('should call http', inject([AnalysisBillingResolve], (resolve: AnalysisBillingResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.analysisBillingTableResponse));
    const actRoute = new ActivatedRouteSnapshot();
    actRoute.data = {analysisUrl: 'pag'};
    actRoute.params = {id: 5};
    resolve.resolve(actRoute).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag/5/billing');
  }));

  it('should catch error and navigate', inject([AnalysisBillingResolve], (resolve: AnalysisBillingResolve) => {
    spyOn(Router.prototype, 'navigateByUrl');
    mockAuthHttp.get.and.returnValue(Observable.throw({error: {status_code: 500, message: 'test list resolve error'}}));
    const actRoute = new ActivatedRouteSnapshot();
    actRoute.data = {analysisUrl: 'pag'};
    actRoute.params = {id: 5};
    resolve.resolve(actRoute).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(Router.prototype.navigateByUrl).toHaveBeenCalledWith('');
  }));
});
