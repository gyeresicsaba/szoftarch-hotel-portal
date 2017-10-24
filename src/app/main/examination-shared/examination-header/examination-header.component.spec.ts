import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExaminationHeaderComponent} from './examination-header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs/Rx';
import {MockAnalysisDataService} from '../../../../mock/analysis-data-service.mock';
import {AnalysisDataService} from '../analysis-data.service';

describe('ExaminationHeaderComponent', () => {
  let component: ExaminationHeaderComponent;
  let fixture: ComponentFixture<ExaminationHeaderComponent>;
  let subject;
  let mockAnalysisDataService: MockAnalysisDataService;

  beforeEach(async(() => {
    mockAnalysisDataService = new MockAnalysisDataService();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ExaminationHeaderComponent],
      providers: [
        {
          provide: AnalysisDataService,
          useValue: mockAnalysisDataService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationHeaderComponent);
    component = fixture.componentInstance;
    subject = new Subject();
    Object.defineProperty(Router.prototype, 'events', {value: subject});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set root', () => {
    Object.defineProperty(Router.prototype, 'url', {value: '/pag/analysis/arrival1'});
    subject.next(new NavigationEnd(1, '', ''));
    fixture.detectChanges();
    expect(component.root).toBe('/pag/analysis');
    expect(component.current).toBe(0);

    Object.defineProperty(Router.prototype, 'url', {value: '/pag/analysis/1/arrival2'});
    subject.next(new NavigationEnd(1, '', ''));
    fixture.detectChanges();
    expect(component.root).toBe('/pag/analysis/1');
    expect(component.current).toBe(1);
  });
});
