import {inject, TestBed} from '@angular/core/testing';

import {AnalysisDataService} from './analysis-data.service';
import {MockCustomAuthHttpService} from '../../../mock/custom-auth-http-service.mock';
import {SharedVarsService} from '../../services/shared-vars.service';
import {CustomAuthHttpService} from '../../services/custom-auth-http.service';
import {Observable} from 'rxjs/Rx';
import {TestData} from '../../../mock/test-data';
import {AnalysisData} from '../../models/analysis-data';

describe('AnalysisDataService', () => {
  let mockAuthHttp: MockCustomAuthHttpService;

  beforeEach(() => {
    mockAuthHttp = new MockCustomAuthHttpService();

    TestBed.configureTestingModule({
      providers: [
        AnalysisDataService,
        SharedVarsService,
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp
        }
      ]
    });
  });

  it('should ...', inject([AnalysisDataService], (service: AnalysisDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should call http', inject([AnalysisDataService], (service: AnalysisDataService) => {
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.analysisResponse));
    spyOn(SharedVarsService.prototype, 'setVar');
    service.init('pag', 1).subscribe((response) => {
      expect(response).toEqual(jasmine.any(AnalysisData));
    });
    expect(SharedVarsService.prototype.setVar).toHaveBeenCalledWith('pagFullIdentifier', 'V0004\/2017');
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag/1');
  }));
});
