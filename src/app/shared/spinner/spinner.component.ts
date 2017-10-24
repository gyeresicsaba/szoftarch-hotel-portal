import {Component, OnInit, Input} from '@angular/core';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() spinnerId: string;
  public isActive = true;

  constructor(private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.getSpinnerCounter(this.spinnerId).subscribe(
      counter => this.isActive = !!counter
    );
  }

}
