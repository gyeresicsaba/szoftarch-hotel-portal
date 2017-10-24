import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ListComponent} from './list.component';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {PaginatedResponse} from '../../../models/paginated-response';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ModalService} from '../../../services/modal.service';
import {TestData} from '../../../../mock/test-data';
import {Modal} from '../../../models/modal';
import {MockModalService} from '../../../../mock/modal-service.mock';
import {Box} from '../../../models/box';
import {SharedModule} from '../../../shared/shared.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let activatedRouteStub;
  let mockAuthHttp: MockCustomAuthHttpService;
  let mockModalService: MockModalService;
  let testBox: Box;
  const response: PaginatedResponse<Box> = new PaginatedResponse<Box>(TestData.boxesResponse, Box);

  beforeEach(async(() => {
    activatedRouteStub = {
      data: Observable.of({response: response})
    };
    mockAuthHttp = new MockCustomAuthHttpService();
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.boxesResponse));
    mockModalService = new MockModalService();
    testBox = response.data[0];

    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ModalService,
          useValue: mockModalService
        },
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
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', fakeAsync(() => {
    component.partnerNumberSearchControl.setValue('48');
    tick(600);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('boxes?page=1&qpartner=48');
  }));

  it('should search box', fakeAsync(() => {
    component.boxNumberSearchControl.setValue('48');
    tick(600);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('boxes?page=1&qbox=48');
  }));

  it('should open modal', () => {
    component.openDeleteModal(testBox);

    expect(mockModalService.open).toHaveBeenCalled();
  });

  it('should delete on modal callback', () => {
    mockAuthHttp.delete.and.returnValue(Observable.of(null));

    mockModalService.open.and.callFake((modal: Modal) => {
      modal.buttons[0].callback();
    });
    component.openDeleteModal(testBox);

    expect(mockAuthHttp.delete).toHaveBeenCalledWith('boxes/5');
    expect(component.response.data.length).toBe(4);
  });
});
