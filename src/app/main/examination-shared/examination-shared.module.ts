import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {RouterModule} from '@angular/router';
import {ExaminationHeaderComponent} from './examination-header/examination-header.component';
import {AnalysisFirstComponent} from './analysis-first/analysis-first.component';
import {AnalysisModalComponent} from './analysis-modal/analysis-modal.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnalysisSecondHeadingComponent} from './analysis-second-heading/analysis-second-heading.component';
import {AnalysisSecondHeadingReadonlyComponent} from './analysis-second-heading-readonly/analysis-second-heading-readonly.component';
import {AnalysisListComponent} from './analysis-list/analysis-list.component';
import {AnalysisListResolve} from './analysis-list/analysis-list.resolve';
import {AnalysisReportComponent} from './analysis-report/analysis-report.component';
import {AnalysisReportSendComponent} from './analysis-report-send/analysis-report-send.component';
import {AnalysisReportSendResolve} from './analysis-report-send/analysis-report-send.resolve';
import {AnalysisBillingComponent} from './analysis-billing/analysis-billing.component';
import {AnalysisBillingResolve} from './analysis-billing/analysis-billing.resolve';
import {AnalysisResolve} from './analysis.resolve';
import {AnalysisFirstResolve} from './analysis-first/analysis-first.resolve';
import {AnalysisSecondResolve} from './analysis-second.resolve';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LayoutComponent,
    ExaminationHeaderComponent,
    AnalysisFirstComponent,
    AnalysisModalComponent,
    AnalysisSecondHeadingComponent,
    AnalysisSecondHeadingReadonlyComponent,
    AnalysisReportComponent,
    AnalysisSecondHeadingReadonlyComponent,
    AnalysisListComponent,
    AnalysisReportSendComponent,
    AnalysisBillingComponent
  ],
  exports: [
    LayoutComponent,
    AnalysisFirstComponent,
    ExaminationHeaderComponent,
    AnalysisModalComponent,
    AnalysisSecondHeadingComponent,
    AnalysisSecondHeadingReadonlyComponent,
    AnalysisListComponent,
    AnalysisReportSendComponent,
    AnalysisBillingComponent
  ],
  providers: [
    AnalysisListResolve,
    AnalysisSecondHeadingReadonlyComponent,
    AnalysisReportComponent,
    AnalysisReportSendResolve,
    AnalysisBillingResolve,
    AnalysisFirstResolve,
    AnalysisResolve,
    AnalysisSecondResolve
  ]
})
export class ExaminationSharedModule {
}
