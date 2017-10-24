import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SpinnerComponent} from './spinner.component';
import {SpinnerService} from '../../services/spinner.service';
import {Observable} from 'rxjs/Rx';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      providers: [
        {
          provide: SpinnerService,
          useValue: {
            getSpinnerCounter: () => Observable.of(1)
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
