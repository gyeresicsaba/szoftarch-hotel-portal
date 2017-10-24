import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AnalysisModalComponent} from './analysis-modal.component';

describe('AnalysisModalComponent', () => {
  let component: AnalysisModalComponent;
  let fixture: ComponentFixture<AnalysisModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    component.visible = true;
    spyOn(component.visibleChange, 'emit');
    component.closeFunction();

    expect(component.visibleChange.emit).toHaveBeenCalledTimes(1);
    expect(component.visible).toBe(false);
  });
});
