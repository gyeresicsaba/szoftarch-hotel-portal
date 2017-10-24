import {Component, Input, OnInit} from '@angular/core';
import {AnalysisSecondHeader} from '../../../models/analysis-second-header';
import {AnalysisSecondTampon} from '../../../models/analysis-second-tampon';
import {AnalysisSecondMastitis} from '../../../models/analysis-second-mastitis';

@Component({
  selector: 'app-analysis-second-heading-readonly',
  templateUrl: './analysis-second-heading-readonly.component.html',
  styleUrls: ['./analysis-second-heading-readonly.component.scss']
})
export class AnalysisSecondHeadingReadonlyComponent implements OnInit {
  @Input() data: AnalysisSecondHeader;

  constructor() {
  }

  ngOnInit() {
  }

  get isTamponHeader(): boolean {
    return this.data instanceof AnalysisSecondTampon;
  }

  get isMastitisHeader(): boolean {
    return this.data instanceof AnalysisSecondMastitis;
  }
}
