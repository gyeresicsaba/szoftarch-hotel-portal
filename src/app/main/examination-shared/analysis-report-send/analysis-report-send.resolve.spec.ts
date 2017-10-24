/**
 * Created by ekemate on 2017. 03. 21..
 */
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {AnalysisReportSendResolve} from './analysis-report-send.resolve';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {TestData} from '../../../../mock/test-data';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {MockSpinnerService} from '../../../../mock/spinner-service.mock';
import {MockRouter} from '../../../../mock/router.mock';
import {ReportSendElem} from '../../../models/report-send-elem';

describe('AnalysisReportSendResolve', () => {
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
        AnalysisReportSendResolve,
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

  it('should call http', inject([AnalysisReportSendResolve], (resolve: AnalysisReportSendResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.reportSendResponse));
    resolve.resolve(activatedRouteStub).subscribe((response) => {
      expect(response.length).toEqual(2);
      expect(response[0]).toEqual(new ReportSendElem(TestData.reportSendResponse.data[0]));
    });
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag/1/report/send');
  }));

  it('should catch error and navigate', inject([AnalysisReportSendResolve], (resolve: AnalysisReportSendResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.throw({error: {status_code: 500, message: 'test analysis report send resolve error'}}));
    resolve.resolve(activatedRouteStub).subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
  }));
});
