import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AnalysisReportComponent} from './analysis-report.component';
import {AnalysisDataService} from '../analysis-data.service';
import {MockAnalysisDataService} from '../../../../mock/analysis-data-service.mock';

describe('AnalysisReportComponent', () => {
  let component: AnalysisReportComponent;
  let fixture: ComponentFixture<AnalysisReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisReportComponent],
      providers: [
        {
          provide: AnalysisDataService,
          useClass: MockAnalysisDataService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // cant run on phantomjs
  /*it('should create', () => {
    expect(component).toBeTruthy();
   });*/
});
