import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SummarizedListComponent} from './summarized-list.component';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {BoxBase} from '../../../models/box-base';
import {TestData} from '../../../../mock/test-data';
import {PaginatedResponse} from '../../../models/paginated-response';
import {Observable} from 'rxjs/Observable';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {ActivatedRoute} from '@angular/router';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';

describe('SummarizedListComponent', () => {
  let component: SummarizedListComponent;
  let fixture: ComponentFixture<SummarizedListComponent>;
  let activatedRouteStub;
  let mockAuthHttp: MockCustomAuthHttpService;
  const response: PaginatedResponse<BoxBase> = new PaginatedResponse<BoxBase>(TestData.boxesResponse, BoxBase);

  beforeEach(async(() => {
    activatedRouteStub = {
      data: Observable.of({response: response})
    };
    mockAuthHttp = new MockCustomAuthHttpService();
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.boxesResponse));

    TestBed.configureTestingModule({
      declarations: [SummarizedListComponent],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', fakeAsync(() => {
    component.partnerNumberSearchControl.setValue('48');
    tick(600);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('boxes/summary?page=1&qpartner=48');
  }));
});
