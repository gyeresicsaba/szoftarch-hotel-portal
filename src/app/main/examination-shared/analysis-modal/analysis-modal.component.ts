import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-analysis-modal',
  templateUrl: './analysis-modal.component.html',
  styleUrls: ['./analysis-modal.component.scss']
})
export class AnalysisModalComponent implements OnInit {
  @Input() title: string;
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter();
  @Input() width = '600px';

  constructor() {
  }

  ngOnInit() {
  }

  closeFunction() {
    this.visible = false;
    this.visibleChange.emit();
  }
}
