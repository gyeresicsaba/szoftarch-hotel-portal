import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddComponent} from './add.component';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastService} from '../../../services/toast.service';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SharedModule} from '../../../shared/shared.module';
import {SpinnerService} from '../../../services/spinner.service';
import {Router} from '@angular/router';
import {MockSpinnerService} from '../../../../mock/spinner-service.mock';
import {MockRouter} from '../../../../mock/router.mock';
import {EditDetailsComponent} from '../edit-details/edit-details.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let mockAuthHttp: MockCustomAuthHttpService;

  const mockSpinner = new MockSpinnerService();
  const mockRouter = new MockRouter();

  beforeEach(async(() => {
    mockAuthHttp = new MockCustomAuthHttpService();
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, SharedModule, ReactiveFormsModule],
      declarations: [AddComponent, EditDetailsComponent],
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
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
