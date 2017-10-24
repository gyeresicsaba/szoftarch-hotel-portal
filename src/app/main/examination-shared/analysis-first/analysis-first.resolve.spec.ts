/**
 * Created by ekemate on 2017. 03. 13..
 */
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {TestData} from '../../../../mock/test-data';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {MockSpinnerService} from '../../../../mock/spinner-service.mock';
import {MockRouter} from '../../../../mock/router.mock';
import {AnalysisFirstResolve} from './analysis-first.resolve';
import {AnalysisFirst} from '../../../models/analysis-first';

describe('AnalysisFirstResolve', () => {
  let mockAuthHttp: MockCustomAuthHttpService;
  let mockSpinner: MockSpinnerService;
  let mockRouter: MockRouter;
  let activatedRouteStub: ActivatedRouteSnapshot;

  beforeEach(() => {
    mockSpinner = new MockSpinnerService();
    mockAuthHttp = new MockCustomAuthHttpService();
    mockRouter = new MockRouter();
    activatedRouteStub = new ActivatedRouteSnapshot();
    activatedRouteStub.params = {id: 1};
    activatedRouteStub.data = {analysisUrl: 'pag'};

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AnalysisFirstResolve,
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

  it('should call http', inject([AnalysisFirstResolve], (resolve: AnalysisFirstResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.arrival1EditResponse));
    resolve.resolve(activatedRouteStub).subscribe((response) => {
      expect(response).toEqual(jasmine.any(AnalysisFirst));
    });
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag/1/arrival1/edit');
  }));

  it('should catch error and navigate', inject([AnalysisFirstResolve], (resolve: AnalysisFirstResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.throw({error: {status_code: 500, message: 'test analysis first resolve error'}}));
    resolve.resolve(activatedRouteStub).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
  }));
});
