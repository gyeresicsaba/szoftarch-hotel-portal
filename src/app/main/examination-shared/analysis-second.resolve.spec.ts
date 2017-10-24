/**
 * Created by ekemate on 2017. 03. 13..
 */
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {AnalysisSecondResolve} from './analysis-second.resolve';
import {CustomAuthHttpService} from '../../services/custom-auth-http.service';
import {SpinnerService} from '../../services/spinner.service';
import {TestData} from '../../../mock/test-data';
import {AnalysisSecondPag} from '../../models/analysis-second-pag';
import {MockCustomAuthHttpService} from '../../../mock/custom-auth-http-service.mock';
import {MockSpinnerService} from '../../../mock/spinner-service.mock';
import {MockRouter} from '../../../mock/router.mock';

describe('AnalysisSecondResolve', () => {
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
    activatedRouteStub.data = {type: AnalysisSecondPag, analysisUrl: 'pag'};

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AnalysisSecondResolve,
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

  it('should call http', inject([AnalysisSecondResolve], (resolve: AnalysisSecondResolve<AnalysisSecondPag>) => {
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.arrival2PagEditResponse));
    resolve.resolve(activatedRouteStub).subscribe((response) => {
      expect(response).toEqual(jasmine.any(AnalysisSecondPag));
    });
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag/1/arrival2/edit');
  }));

  it('should catch error and navigate', inject([AnalysisSecondResolve], (resolve: AnalysisSecondResolve<AnalysisSecondPag>) => {
    mockAuthHttp.get.and.returnValue(Observable.throw({error: {status_code: 500, message: 'test analysis second pag resolve error'}}));
    resolve.resolve(activatedRouteStub).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
  }));
});
