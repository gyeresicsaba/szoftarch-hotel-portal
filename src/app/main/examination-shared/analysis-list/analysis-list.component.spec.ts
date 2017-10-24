import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalysisListComponent} from './analysis-list.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {ActivatedRoute} from '@angular/router';
import {AnalysisListItem} from '../../../models/analysis-list-item';
import {PaginatedResponse} from '../../../models/paginated-response';
import {TestData} from '../../../../mock/test-data';
import {AsyncSubject, Observable} from 'rxjs/Rx';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {MockModalService} from '../../../../mock/modal-service.mock';
import {ModalService} from '../../../services/modal.service';

describe('AnalysisListComponent', () => {
  let component: AnalysisListComponent;
  let fixture: ComponentFixture<AnalysisListComponent>;
  let mockAuthHttp: MockCustomAuthHttpService;
  let activatedRouteStub;
  let mockModalService: MockModalService;
  const response: PaginatedResponse<AnalysisListItem> = new PaginatedResponse<AnalysisListItem>(TestData.pagListResponse, AnalysisListItem);
  let authServiceStub;


  beforeEach(async(() => {
    mockAuthHttp = new MockCustomAuthHttpService();
    activatedRouteStub = <ActivatedRoute>{};
    activatedRouteStub.snapshot = {data: {analysisUrl: 'pag'}};
    activatedRouteStub.data = Observable.of({response: response});
    mockModalService = new MockModalService();
    authServiceStub = {
      userSubject: new AsyncSubject<User>()
    };

    mockAuthHttp.get.and.returnValue(Observable.of(TestData.pagListResponse));

    TestBed.configureTestingModule({
      declarations: [AnalysisListComponent],
      imports: [SharedModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
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
          provide: AuthService,
          useValue: authServiceStub
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort', () => {
    component.sort('full_identifier');
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag?sort=full_identifier&page=1');
    component.sort('full_identifier');
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag?sort=-full_identifier&page=1');
    component.sort('full_identifier');
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag?sort=&page=1');
  });
});
