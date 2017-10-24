/**
 * Created by ekemate on 2017. 03. 13..
 */
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {MockSpinnerService} from '../../../mock/spinner-service.mock';
import {MockRouter} from '../../../mock/router.mock';
import {SpinnerService} from '../../services/spinner.service';
import {TestData} from '../../../mock/test-data';
import {AnalysisData} from '../../models/analysis-data';
import {SharedVarsService} from '../../services/shared-vars.service';
import {AnalysisResolve} from './analysis.resolve';
import {AnalysisDataService} from './analysis-data.service';
import {MockAnalysisDataService} from '../../../mock/analysis-data-service.mock';

describe('AnalysisResolve', () => {
  let mockAnalysisDataService: MockAnalysisDataService;
  let mockSpinner: MockSpinnerService;
  let mockRouter: MockRouter;
  let activatedRouteStub: ActivatedRouteSnapshot;

  beforeEach(() => {
    mockSpinner = new MockSpinnerService();
    mockAnalysisDataService = new MockAnalysisDataService();
    mockRouter = new MockRouter();
    activatedRouteStub = new ActivatedRouteSnapshot();
    activatedRouteStub.params = {id: 1};
    activatedRouteStub.data = {analysisUrl: 'pag'};

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AnalysisResolve,
        {
          provide: AnalysisDataService,
          useValue: mockAnalysisDataService
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

  it('should call get the analysisData', inject([AnalysisResolve], (resolve: AnalysisResolve) => {
    mockAnalysisDataService.init.and.returnValue(Observable.of(new AnalysisData(TestData.analysisResponse.data)));
    spyOn(SharedVarsService.prototype, 'setVar');
    resolve.resolve(activatedRouteStub).subscribe((response) => {
      expect(response).toEqual(jasmine.any(AnalysisData));
    });
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockAnalysisDataService.init).toHaveBeenCalledWith('pag', 1);
  }));

  it('should catch error and navigate', inject([AnalysisResolve], (resolve: AnalysisResolve) => {
    spyOn(SharedVarsService.prototype, 'setVar');
    mockAnalysisDataService.init.and.returnValue(Observable.throw({error: {status_code: 500, message: 'test analysis resolve error'}}));
    resolve.resolve(activatedRouteStub).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
  }));
});
