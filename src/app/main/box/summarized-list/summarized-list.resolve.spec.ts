import {inject, TestBed} from '@angular/core/testing';
import {SummarizedListResolve} from './summarized-list.resolve';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {MockSpinnerService} from '../../../../mock/spinner-service.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {MockRouter} from '../../../../mock/router.mock';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {TestData} from '../../../../mock/test-data';

describe('SummarizedListResolve', () => {
  let mockAuthHttp: MockCustomAuthHttpService;
  let mockSpinner: MockSpinnerService;
  let mockRouter: MockRouter;

  beforeEach(() => {
    mockSpinner = new MockSpinnerService();
    mockAuthHttp = new MockCustomAuthHttpService();
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        SummarizedListResolve,
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

  it('should call http', inject([SummarizedListResolve], (resolve: SummarizedListResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.boxesResponse));
    resolve.resolve().subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('boxes/summary');
  }));

  it('should catch error and navigate', inject([SummarizedListResolve], (resolve: SummarizedListResolve) => {
    mockAuthHttp.get.and.returnValue(Observable.throw('test boxes list summary resolve error'));
    resolve.resolve().subscribe();
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
  }));
});
