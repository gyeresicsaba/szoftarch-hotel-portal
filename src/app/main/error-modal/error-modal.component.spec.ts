import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorModalComponent} from './error-modal.component';
import {MockModalService} from '../../../mock/modal-service.mock';
import {Subject} from 'rxjs/Subject';
import {ErrorModal} from '../../models/error-modal';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ModalService} from '../../services/modal.service';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;
  let mockModalService: MockModalService;
  let modalSubject: Subject<ErrorModal>;

  beforeEach(async(() => {
    modalSubject = new Subject<ErrorModal>();
    mockModalService = new MockModalService();
    mockModalService.getIsErrorVisible.and.returnValue(new BehaviorSubject<boolean>(false));
    mockModalService.getErrorModalData.and.returnValue(modalSubject);
    TestBed.configureTestingModule({
      declarations: [ErrorModalComponent],
      providers: [{
        provide: ModalService,
        useValue: mockModalService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set modal', () => {
    const testModal = new ErrorModal('', {
      'error': {
        'message': '422 Unprocessable Entity',
        'errors': {'postal_code': ['Nem megfelel\u0151 sz\u00e1m\u00fa sz\u00e1mjegyet tartalmaz']},
        'status_code': 422
      }
    }, []);
    modalSubject.next(testModal);
    expect(component.modal).toBe(testModal);
  });

  it('should close', () => {
    component.close();
    expect(mockModalService.closeError).toHaveBeenCalled();
  });
});
