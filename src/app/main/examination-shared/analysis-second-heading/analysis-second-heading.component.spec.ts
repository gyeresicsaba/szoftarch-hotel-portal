import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AnalysisSecondHeadingComponent} from './analysis-second-heading.component';
import {IMyDateModel, MyDatePickerModule} from 'mydatepicker';
import {AnalysisSecondPag} from '../../../models/analysis-second-pag';
import {TestData} from '../../../../mock/test-data';
import {FormsModule} from '@angular/forms';
import * as moment from 'moment';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SharedModule} from '../../../shared/shared.module';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

describe('AnalysisSecondHeadingComponent', () => {
  let component: AnalysisSecondHeadingComponent;
  let fixture: ComponentFixture<AnalysisSecondHeadingComponent>;
  let mockAuthHttp: MockCustomAuthHttpService;
  let activatedRouteStub: any;

  beforeEach(async(() => {
    mockAuthHttp = new MockCustomAuthHttpService();
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.deliveryMethodsDictionaryResponse));
    activatedRouteStub = {snapshot: {data: {analysisUrl: 'pag'}}};

    TestBed.configureTestingModule({
      imports: [MyDatePickerModule, FormsModule, SharedModule],
      declarations: [AnalysisSecondHeadingComponent],
      providers: [
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp,
        }, {

          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisSecondHeadingComponent);
    component = fixture.componentInstance;
    component.data = new AnalysisSecondPag(TestData.arrival2PagEditResponse.data);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update sampleTakenAt', () => {
    const startDate = new Date();
    spyOn(component.dataChange, 'emit');
    component.pickerSampleTakenAtDateChange(<IMyDateModel>{jsdate: startDate});

    expect(component.data.dates.sample_taken_at).toEqual(moment(startDate));
    expect(component.dataChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should update sampleArrivedAt', () => {
    const endDate = new Date();
    spyOn(component.dataChange, 'emit');
    component.pickerSampleArrivedAtDateChange(<IMyDateModel>{jsdate: endDate});

    expect(component.data.dates.sample_arrived_at).toEqual(moment(endDate));
    expect(component.dataChange.emit).toHaveBeenCalledTimes(1);
  });
});
