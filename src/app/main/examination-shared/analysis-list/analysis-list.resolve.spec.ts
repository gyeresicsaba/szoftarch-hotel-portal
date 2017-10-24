import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {AnalysisListResolve} from './analysis-list.resolve';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {MockSpinnerService} from '../../../../mock/spinner-service.mock';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {TestData} from '../../../../mock/test-data';

describe('AnalysisListResolve', () => {
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
        AnalysisListResolve,
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

  it('should call http', inject([AnalysisListResolve], (resolve: AnalysisListResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.pagListResponse));
    const actRoute = new ActivatedRouteSnapshot();
    actRoute.data = {analysisUrl: 'pag'};
    actRoute.params = {test: 'szia'};
    resolve.resolve(actRoute).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag?test=szia');
  }));

  it('should catch error and navigate', inject([AnalysisListResolve], (resolve: AnalysisListResolve) => {
    spyOn(Router.prototype, 'navigateByUrl');
    mockAuthHttp.get.and.returnValue(Observable.throw({error: {status_code: 500, message: 'test list resolve error'}}));
    const actRoute = new ActivatedRouteSnapshot();
    actRoute.data = {analysisUrl: 'pag'};
    actRoute.params = {test: 'szia'};
    resolve.resolve(actRoute).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(Router.prototype.navigateByUrl).toHaveBeenCalledWith('');
  }));
});
