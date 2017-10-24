import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TypeaheadComponent} from './typeahead.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ITypeAheadElement} from '../../models/typeahead';
import {SimpleChange, SimpleChanges} from '@angular/core';

describe('TypeaheadComponent', () => {
  let component: TypeaheadComponent;
  let fixture: ComponentFixture<TypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TypeaheadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search change', fakeAsync(() => {
    spyOn(component.searchChanged, 'emit');
    component.searchControl.setValue('almafa');
    tick(600);
    fixture.detectChanges();
    expect(component.searchChanged.emit).toHaveBeenCalledWith('almafa');
  }));

  it('should detect changes', () => {
    const testItems = [
      <ITypeAheadElement>{name: 'teszt', DisplayValue: '1234 - teszt'},
      <ITypeAheadElement>{name: 'teszt2', DisplayValue: '1234 - teszt2'}
    ];
    component.items = testItems;
    component.ngOnChanges(<SimpleChanges>{items: new SimpleChange([], testItems, true)});
    expect(component.ownItems.length).toBe(2);
  });

  it('should reset', () => {
    component.ownItems = [
      {
        value: <ITypeAheadElement>{name: 'teszt', DisplayValue: '1234 - teszt'},
        active: true
      },
      {
        value: <ITypeAheadElement>{name: 'teszt2', DisplayValue: '1234 - teszt2'},
        active: false
      }
    ];
    fixture.detectChanges();
    expect(component.ownItems.length).toBe(2);
    component.resetSubject.next();
    expect(component.ownItems.length).toBe(0);
  });

  it('should handle enter key events', () => {
    component.ownItems = [
      {
        value: <ITypeAheadElement>{name: 'teszt', DisplayValue: '1234 - teszt'},
        active: true
      },
      {
        value: <ITypeAheadElement>{name: 'teszt2', DisplayValue: '1234 - teszt2'},
        active: false
      }
    ];
    spyOn(component, 'selectElem').and.callThrough();
    spyOn(component.finish, 'emit');

    const event = <KeyboardEvent>{key: 'Enter'};
    event.preventDefault = jasmine.createSpy('preventDefault');
    event.stopPropagation = jasmine.createSpy('stopPropagation');

    component.keyUp(event);
    expect(component.selectElem).toHaveBeenCalled();

    component.keyUp(event);
    expect(component.finish.emit).toHaveBeenCalled();
  });

  it('should handle arrow key events', () => {
    component.ownItems = [
      {
        value: <ITypeAheadElement>{name: 'teszt', DisplayValue: '1234 - teszt'},
        active: true
      },
      {
        value: <ITypeAheadElement>{name: 'teszt2', DisplayValue: '1234 - teszt2'},
        active: false
      }
    ];

    component.keyUp(<KeyboardEvent>{key: 'ArrowDown'});
    expect(component.ownItems[0].active).toBe(false);
    expect(component.ownItems[1].active).toBe(true);

    component.keyUp(<KeyboardEvent>{key: 'ArrowUp'});
    expect(component.ownItems[0].active).toBe(true);
    expect(component.ownItems[1].active).toBe(false);
  });
});
