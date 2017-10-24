import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalComponent} from './modal.component';
import {ModalService} from '../../services/modal.service';
import {MockModalService} from '../../../mock/modal-service.mock';
import {BehaviorSubject, Subject} from 'rxjs/Rx';
import {Modal} from '../../models/modal';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockModalService: MockModalService;
  let modalSubject: Subject<Modal>;

  beforeEach(async(() => {
    modalSubject = new Subject<Modal>();
    mockModalService = new MockModalService();
    mockModalService.getIsVisible.and.returnValue(new BehaviorSubject<boolean>(false));
    mockModalService.getModalData.and.returnValue(modalSubject);
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [{
        provide: ModalService,
        useValue: mockModalService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set modal', () => {
    const testModal = new Modal('', '', []);
    modalSubject.next(testModal);
    expect(component.modal).toBe(testModal);
  });

  it('should close', () => {
    component.close();
    expect(mockModalService.close).toHaveBeenCalled();
  });
});
