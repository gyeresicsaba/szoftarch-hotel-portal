import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DetailsComponent} from './details.component';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ModalService} from '../../../services/modal.service';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {MockRouter} from '../../../../mock/router.mock';
import {MockModalService} from '../../../../mock/modal-service.mock';
import {Box} from '../../../models/box';
import {Modal} from '../../../models/modal';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let activatedRouteStub;
  let mockModalService: MockModalService;
  let mockAuthHttp: MockCustomAuthHttpService;
  let mockRouter;
  const box = new Box( {
    'id': 1,
    'in': null,
    'out': '2017-01-01',
    'number': 'D12312',
    'name': 'Lakatos',
    'partner_number': '49-523-82',
    'pipe_in': 0,
    'pipe_out': 10,
    'pipe_diff': 10,
    'battery_in': 0,
    'battery_out': 20,
    'battery_diff': 20,
    'postage': true,
    'comment': null
  });

  beforeEach(async(() => {
    activatedRouteStub = {
      data: Observable.of({response: box})
    };
    mockModalService = new MockModalService();
    mockRouter = new MockRouter();
    mockAuthHttp = new MockCustomAuthHttpService();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DetailsComponent],
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
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    component.openDeleteModal();

    expect(mockModalService.open).toHaveBeenCalled();
  });

  it('should delete on modal callback', () => {
    mockAuthHttp.delete.and.returnValue(Observable.of(null));

    mockModalService.open.and.callFake((modal: Modal) => {
      modal.buttons[0].callback();
    });
    component.openDeleteModal();

    expect(mockAuthHttp.delete).toHaveBeenCalledWith('boxes/1');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('box');
    expect(mockModalService.close).toHaveBeenCalled();
  });
});
