import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalysisReportSendComponent} from './analysis-report-send.component';
import {MockModalService} from '../../../../mock/modal-service.mock';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {TestData} from '../../../../mock/test-data';
import {AnalysisData} from '../../../models/analysis-data';
import {AnalysisSecondPag} from '../../../models/analysis-second-pag';
import {Observable} from 'rxjs/Rx';
import {AnalysisSecondHeadingReadonlyComponent} from '../analysis-second-heading-readonly/analysis-second-heading-readonly.component';
import {ModalService} from '../../../services/modal.service';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ReportSendElem} from '../../../models/report-send-elem';
import {AnalysisDataService} from '../analysis-data.service';
import {MockAnalysisDataService} from '../../../../mock/analysis-data-service.mock';
import {ToastService} from '../../../services/toast.service';
import {AnalysisModalComponent} from '../analysis-modal/analysis-modal.component';
import {FormsModule} from '@angular/forms';
import {User} from '../../../models/user';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {AuthService} from '../../../services/auth.service';

describe('AnalysisReportSendComponent', () => {
  let component: AnalysisReportSendComponent;
  let fixture: ComponentFixture<AnalysisReportSendComponent>;
  let activatedRouteStub;
  let mockAuthHttp: MockCustomAuthHttpService;
  let mockModalService: MockModalService;
  let authServiceStub;

  beforeEach(async(() => {
    activatedRouteStub = {
      data: Observable.of({
        thirdData: new AnalysisSecondPag(TestData.arrival2PagEditResponse.data),
        analysisData: <AnalysisData>{id: 1},
        reportSendElems: TestData.reportSendResponse.data.map(elem => new ReportSendElem(elem)),
        analysisUrl: 'pag'
      })
    };
    mockAuthHttp = new MockCustomAuthHttpService();
    mockModalService = new MockModalService();
    authServiceStub = {
      userSubject: new AsyncSubject<User>()
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [AnalysisReportSendComponent, AnalysisSecondHeadingReadonlyComponent, AnalysisModalComponent],
      providers: [
        ToastService,
        {
          provide: ModalService,
          useValue: mockModalService
        },
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: AnalysisDataService,
          useClass: MockAnalysisDataService
        },
        {
          provide: AuthService,
          useValue: authServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(Router.prototype, 'navigateByUrl');
    fixture = TestBed.createComponent(AnalysisReportSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send to report', () => {
    expect(Router.prototype.navigateByUrl).toHaveBeenCalledWith('/pag/analysis/1/report');
  });
});
