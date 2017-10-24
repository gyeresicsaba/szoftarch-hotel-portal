import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiSelectComponent} from './multi-select.component';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    component.items = ['Test1', 'Test2', 'Test3'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleSelect', () => {
    component.selectedItems = null;
    component.toggleSelect('Test1');
    expect(component.selectedItems).toEqual(['Test1']);
    component.toggleSelect('Test3');
    expect(component.selectedItems).toEqual(['Test1', 'Test3']);
    component.toggleSelect('Test2');
    expect(component.selectedItems).toEqual(['Test1', 'Test2', 'Test3']);
    component.toggleSelect('Test2');
    expect(component.selectedItems).toEqual(['Test1', 'Test3']);
    component.toggleSelect('Test1');
    expect(component.selectedItems).toEqual(['Test3']);
    component.toggleSelect('Test3');
    expect(component.selectedItems).toEqual([]);
  });

  it('should handle caret click', () => {
    const event = <MouseEvent>{};
    event.stopPropagation = jasmine.createSpy('stopPropagation');
    component.caretClick(event);
    expect(component.isOpen).toBeTruthy();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should handle out click', () => {
    component.isOpen = true;
    const event = <MouseEvent>{};
    const target = document.createElement('div');
    target.classList.add('multiselect-icon');
    Object.defineProperty(event, 'target', {value: target});

    component.outClick(event);
    expect(component.isOpen).toBeTruthy();

    target.classList.remove('multiselect-icon');
    component.outClick(event);
    expect(component.isOpen).toBeFalsy();
  });
});
