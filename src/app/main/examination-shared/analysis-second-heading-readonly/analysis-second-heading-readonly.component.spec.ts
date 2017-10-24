import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AnalysisSecondHeadingReadonlyComponent} from './analysis-second-heading-readonly.component';
import {FormsModule} from '@angular/forms';
import {TestData} from '../../../../mock/test-data';
import {AnalysisSecondPag} from '../../../models/analysis-second-pag';

describe('AnalysisSecondHeadingReadonlyComponent', () => {
  let component: AnalysisSecondHeadingReadonlyComponent;
  let fixture: ComponentFixture<AnalysisSecondHeadingReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AnalysisSecondHeadingReadonlyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisSecondHeadingReadonlyComponent);
    component = fixture.componentInstance;
    component.data = new AnalysisSecondPag(TestData.arrival2PagEditResponse.data);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
