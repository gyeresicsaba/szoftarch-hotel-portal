import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditDetailsComponent} from './edit-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {ToastService} from '../../../services/toast.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Rx';
import {Router, ActivatedRoute} from '@angular/router';
import {SpinnerService} from '../../../services/spinner.service';
import {MockSpinnerService} from '../../../../mock/spinner-service.mock';
import {MockRouter} from '../../../../mock/router.mock';
import {Box} from '../../../models/box';
import {SharedModule} from '../../../shared/shared.module';
import {Partner} from '../../../models/partner';
import {TestData} from '../../../../mock/test-data';

describe('EditDetailsComponent', () => {
  let component: EditDetailsComponent;
  let fixture: ComponentFixture<EditDetailsComponent>;
  const mockSpinner = new MockSpinnerService();
  let mockAuthHttp = new MockCustomAuthHttpService();
  const mockRouter = new MockRouter();
  const activatedRouteStub = new ActivatedRoute();
  const testPartner = new Partner({'id': 33, 'number': '76-877-59', 'name': 'Bal\u00e1zs ZRT', 'city': 'Budapest'});
  const boxDetails = new Box({
    'id': 5,
    'in': '2017-01-08',
    'out': '2017-01-07',
    'box_number': 'H123',
    'partner_id': null,
    'partner_name': 'Fehér',
    'partner_number': '17-243-02',
    'pipe_in': 1,
    'pipe_out': 1,
    'pipe_diff': 0,
    'battery_in': 30,
    'battery_out': 30,
    'battery_diff': 0,
    'postage': true,
    'comment': 'lorem ipsum'
  });

    beforeEach(async(() => {
    mockAuthHttp = new MockCustomAuthHttpService();
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, SharedModule, ReactiveFormsModule],
      declarations: [EditDetailsComponent],
      providers: [
        ToastService,
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
        },
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailsComponent);
    component = fixture.componentInstance;
    component.box = boxDetails;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should getItems', () => {
    mockAuthHttp.get.and.callFake((param) => {
      if (param === 'partners?sort="name"&q=almafa') {
        return Observable.of(TestData.responses['partners']);
      }
      return Observable.of(TestData.responses[param]);
    });
    component.getPartners('almafa');

    expect(mockAuthHttp.get).toHaveBeenCalledWith('partners?sort="name"&q=almafa');
    expect(component.response.data.length).toBe(TestData.partnersResponse.data.length);
  });

  it('should submit new', () => {
    fixture.detectChanges();
    spyOn(ToastService.prototype, 'addToast');
    mockAuthHttp.post.and.returnValue(Observable.of(null));
    component.onSubmit();

    expect(ToastService.prototype.addToast).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/box/list');
  });

  it('should submit edited', () => {
    spyOn(ToastService.prototype, 'addToast');
    component.boxInput = boxDetails;
    fixture.detectChanges();
    mockAuthHttp.put.and.returnValue(Observable.of(null));
    component.onSubmit();

    expect(ToastService.prototype.addToast).toHaveBeenCalled();
    expect(mockAuthHttp.put).toHaveBeenCalledWith('boxes/5', boxDetails.Saveable);
  });

  it('should selectedChange', () => {
    component.select(testPartner);
    expect(component.selected).toBe(testPartner);
    expect(component.box.partner_id).toBe(testPartner.id);
    expect(component.box.partner_name).toBe(testPartner.name);
    expect(component.box.partner_number).toBe(testPartner.number);
  });

  it('should selectedChange to null', () => {
    component.select(null);
    expect(component.selected).toBe(null);
    expect(component.box.partner_id).toBe(null);
    expect(component.box.partner_name).toBe(null);
    expect(component.box.partner_number).toBe(null);
  });
});
