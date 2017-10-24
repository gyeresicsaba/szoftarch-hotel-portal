/**
 * Created by ekemate on 2017. 03. 22..
 */
import {Observable} from 'rxjs/Rx';
import {TestData} from './test-data';
import {AnalysisData} from '../app/models/analysis-data';

export class MockAnalysisDataService {
  subject = Observable.of(new AnalysisData(TestData.analysisResponse.data));
  init = jasmine.createSpy('init');
  update = jasmine.createSpy('update');

  constructor() {
    this.update.and.returnValue(this.subject);
  }
}
