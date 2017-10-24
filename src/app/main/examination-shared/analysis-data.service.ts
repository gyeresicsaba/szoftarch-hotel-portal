import {Injectable} from '@angular/core';
import {CustomAuthHttpService} from '../../services/custom-auth-http.service';
import {AnalysisData} from '../../models/analysis-data';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {SharedVarsService} from '../../services/shared-vars.service';

@Injectable()
export class AnalysisDataService {
  private analysisData: AnalysisData;
  private module: string;
  subject: BehaviorSubject<AnalysisData> = new BehaviorSubject<AnalysisData>(null);

  constructor(private authHttp: CustomAuthHttpService, private sharedVars: SharedVarsService) {
  }

  update(): Observable<AnalysisData> {
    return new Observable<AnalysisData>(observer => {
      this.authHttp.get(this.module + '/' + this.analysisData.id)
        .map(resp => new AnalysisData(resp.data))
        .subscribe((data) => {
          this.sharedVars.setVar<string>(this.module + 'FullIdentifier', data.full_identifier);
          this.analysisData = data;
          this.subject.next(data);
          observer.next(this.analysisData);
          observer.complete();
        });
    });
  }

  init(module: string, id: number): Observable<AnalysisData> {
    this.module = module;
    return new Observable<AnalysisData>(observer => {
      this.authHttp.get(this.module + '/' + id)
        .map(resp => new AnalysisData(resp.data))
        .subscribe(
          (data) => {
            this.sharedVars.setVar<string>(this.module + 'FullIdentifier', data.full_identifier);
            this.subject.complete();
            this.subject = new BehaviorSubject<AnalysisData>(data);
            this.analysisData = data;
            observer.next(this.analysisData);
            observer.complete();
          },
          (error) => {
            observer.error(error);
            observer.complete();
          });
    });
  }
}
