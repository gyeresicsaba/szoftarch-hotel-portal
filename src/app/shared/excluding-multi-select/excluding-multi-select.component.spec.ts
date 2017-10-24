import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExcludingMultiSelectComponent} from './excluding-multi-select.component';

describe('ExcludingMultiSelectComponent', () => {
  let component: ExcludingMultiSelectComponent;
  let fixture: ComponentFixture<ExcludingMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExcludingMultiSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcludingMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
