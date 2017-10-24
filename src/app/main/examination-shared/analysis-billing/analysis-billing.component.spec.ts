import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalysisBillingComponent} from './analysis-billing.component';
import {AnalysisSecondHeadingReadonlyComponent} from '../analysis-second-heading-readonly/analysis-second-heading-readonly.component';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {TestData} from '../../../../mock/test-data';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {AnalysisData} from '../../../models/analysis-data';
import {AnalysisBillingTable} from '../../../models/analysis-billing-table';
import {AnalysisDataService} from '../analysis-data.service';
import {MockAnalysisDataService} from '../../../../mock/analysis-data-service.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {AsyncSubject} from 'rxjs/Rx';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {ToastService} from '../../../services/toast.service';

describe('AnalysisBillingComponent', () => {
  let component: AnalysisBillingComponent;
  let fixture: ComponentFixture<AnalysisBillingComponent>;
  let authServiceStub;

  let activatedRouteStub;
  beforeEach(async(() => {
    activatedRouteStub = <ActivatedRoute>{};
    activatedRouteStub.data = Observable.of({
      billingData: {
        table: new AnalysisBillingTable(TestData.analysisBillingTableResponse.data),
        items: TestData.analysisBillingItemNumbers.data
      },
      analysisData: <AnalysisData>{id: 1},
      analysisUrl: 'pag'
    });
    authServiceStub = {
      userSubject: new AsyncSubject<User>()
    };

    TestBed.configureTestingModule({
      declarations: [AnalysisBillingComponent, AnalysisSecondHeadingReadonlyComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        ToastService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }, {
          provide: CustomAuthHttpService,
          useClass: MockCustomAuthHttpService
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
    fixture = TestBed.createComponent(AnalysisBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send to report-send', () => {
    expect(Router.prototype.navigateByUrl).toHaveBeenCalledWith('/pag/analysis/1/report-send');
  });
});
