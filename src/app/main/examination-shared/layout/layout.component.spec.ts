import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutComponent} from './layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ExaminationHeaderComponent} from '../examination-header/examination-header.component';
import {SharedVarsService} from '../../../services/shared-vars.service';
import {AnalysisDataService} from '../analysis-data.service';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        LayoutComponent,
        ExaminationHeaderComponent
      ],
      providers: [
        SharedVarsService,
        AnalysisDataService,
        {
          provide: CustomAuthHttpService,
          useClass: MockCustomAuthHttpService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
