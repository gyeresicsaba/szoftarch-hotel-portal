import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomSelectComponent} from './custom-select.component';

describe('CustomSelectComponent', () => {
  let component: CustomSelectComponent;
  let fixture: ComponentFixture<CustomSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectComponent);
    component = fixture.componentInstance;
    component.items = [{'id': 63, 'code': '+', 'name': 'egykereszt', 'order': 2, 'comment': null, 'default': false}, {
      'id': 65,
      'code': '3+',
      'name': 'háromkereszt',
      'order': 4,
      'comment': null,
      'default': false
    }, {'id': 64, 'code': '2+', 'name': 'kétkereszt', 'order': 3, 'comment': null, 'default': false}, {
      'id': 67,
      'code': 'kl',
      'name': 'klinikai',
      'order': 6,
      'comment': null,
      'default': false
    }, {'id': 71, 'code': 'kg', 'name': 'klinikai, gennyes', 'order': 10, 'comment': null, 'default': false}, {
      'id': 72,
      'code': 'kv',
      'name': 'klinikai, véres',
      'order': 11,
      'comment': null,
      'default': false
    }, {'id': 73, 'code': 'kgv', 'name': 'klnikai, gennyes, véres', 'order': 12, 'comment': null, 'default': false}, {
      'id': 62,
      'code': '-',
      'name': 'negatív',
      'order': 1,
      'comment': null,
      'default': false
    }, {'id': 66, 'code': '4+', 'name': 'négykereszt', 'order': 5, 'comment': null, 'default': false}, {
      'id': 74,
      'code': 't',
      'name': 'túrós',
      'order': 13,
      'comment': null,
      'default': false
    }, {'id': 70, 'code': 'va', 'name': 'vak', 'order': 9, 'comment': null, 'default': false}, {
      'id': 69,
      'code': 'vé',
      'name': 'véres',
      'order': 8,
      'comment': null,
      'default': false
    }, {'id': 68, 'code': 'vt', 'name': 'véres, túrós', 'order': 7, 'comment': null, 'default': false}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
