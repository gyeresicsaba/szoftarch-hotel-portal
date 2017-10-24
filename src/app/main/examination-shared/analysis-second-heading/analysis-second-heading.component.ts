import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnalysisSecondHeader} from '../../../models/analysis-second-header';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import * as moment from 'moment';
import {PickedDate} from '../../../models/picked-date';
import {AnalysisSecondTampon} from '../../../models/analysis-second-tampon';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {AnalysisSecondMastitis} from '../../../models/analysis-second-mastitis';
import {DictionaryElement} from '../../../models/dictionary-element';
import {PaginatedResponse} from '../../../models/paginated-response';
import {Subject} from 'rxjs/Subject';
import {AnalysisSecondFeedtoxin} from '../../../models/analysis-second-feedtoxin';
import {AnalysisSecondMilktoxin} from '../../../models/analysis-second-milktoxin';
import {AnalysisSecondPag} from '../../../models/analysis-second-pag';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-analysis-second-heading',
  templateUrl: './analysis-second-heading.component.html',
  styleUrls: ['./analysis-second-heading.component.scss']
})
export class AnalysisSecondHeadingComponent implements OnInit {
  @Input() data: AnalysisSecondHeader;
  @Output() dataChange = new EventEmitter<AnalysisSecondHeader>();
  sampleTakenAtDateModel = {date: <PickedDate>{}};
  sampleArrivedAtDateModel = {date: <PickedDate>{}};
  examineMadeAtDateModel = {date: <PickedDate>{}};
  sampleTakenAtDatePickerOptions: IMyOptions = {
    height: '28px',
    selectionTxtFontSize: '14px',
    editableDateField: false,
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    disableSince: new PickedDate(moment().add(1, 'days'))
  };
  sampleArrivedAtDatePickerOptions: IMyOptions = {
    height: '28px',
    selectionTxtFontSize: '14px',
    editableDateField: false,
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    disableSince: new PickedDate(moment().add(1, 'days'))
  };
  examineMadeAtDatePickerOptions: IMyOptions = {
    height: '28px',
    selectionTxtFontSize: '14px',
    editableDateField: false,
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    disableSince: new PickedDate(moment().add(1, 'days'))
  };
  sampleDeliveryMethods?: Array<string>;
  sampleSentByDictionaryElements: PaginatedResponse<DictionaryElement> = <PaginatedResponse<DictionaryElement>>{data: []};
  selectedSampleSentByDictionaryElement: DictionaryElement;
  resetSubject = new Subject();
  commentItems: PaginatedResponse<DictionaryElement> = <PaginatedResponse<DictionaryElement>>{data: []};
  commentDictionaryId: number;
  heightOnly: boolean;
  heightAndPos: boolean;

  constructor(private authHttp: CustomAuthHttpService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    switch (this.route.snapshot.data.analysisUrl) {
      case 'pag':
        this.heightOnly = true;
        this.commentDictionaryId = 23;
        break;
      case 'tampon':
        this.heightAndPos = true;
        this.commentDictionaryId = 24;
        break;
      case 'milktoxin':
        this.heightOnly = true;
        this.commentDictionaryId = 25;
        break;
      case 'mastitis':
        this.heightAndPos = true;
        this.commentDictionaryId = 26;
        break;
      case 'feedtoxin':
        this.commentDictionaryId = 27;
        break;
      default:
        this.commentDictionaryId = 23;
        break;
    }
    if (this.data.dates.sample_taken_at.isValid()) {
      this.sampleTakenAtDateModel.date = new PickedDate();
      this.sampleTakenAtDateModel.date.fromMoment(this.data.dates.sample_taken_at);
    }
    if (this.data.dates.sample_arrived_at.isValid()) {
      this.sampleArrivedAtDateModel.date = new PickedDate();
      this.sampleArrivedAtDateModel.date.fromMoment(this.data.dates.sample_arrived_at);
    }
    if (this.data.dates.examine_made_at.isValid()) {
      this.examineMadeAtDateModel.date = new PickedDate();
      this.examineMadeAtDateModel.date.fromMoment(this.data.dates.examine_made_at);
    }
    if (this.isTamponHeader) {
      this.authHttp.get('dictionaries/4').subscribe(data => {
        this.sampleDeliveryMethods = data.data;
      });
    }
    if (this.isMastitisHeader) {
      this.authHttp.get('dictionaries/11').subscribe(data => {
        this.sampleDeliveryMethods = data.data;
      });
    }
    if (this.data instanceof AnalysisSecondPag ||
      this.data instanceof AnalysisSecondFeedtoxin ||
      this.data instanceof AnalysisSecondMilktoxin) {
      this.selectedSampleSentByDictionaryElement = new DictionaryElement({name: this.data.production_controller});
    }
  }

  pickerSampleTakenAtDateChange(event: IMyDateModel) {
    this.data.dates.sample_taken_at = moment(event.jsdate);
    this.dataChange.emit(this.data);
  }

  pickerSampleArrivedAtDateChange(event: IMyDateModel) {
    this.data.dates.sample_arrived_at = moment(event.jsdate);
    this.dataChange.emit(this.data);
  }

  pickerExamineMadeAtDateChange(event: IMyDateModel) {
    this.data.dates.examine_made_at = moment(event.jsdate);
    this.dataChange.emit(this.data);
  }

  get isTamponHeader(): boolean {
    return this.data instanceof AnalysisSecondTampon;
  }

  get isMastitisHeader(): boolean {
    return this.data instanceof AnalysisSecondMastitis;
  }

  get isFeedtoxinHeader(): boolean {
    return this.data instanceof AnalysisSecondFeedtoxin;
  }

  getSampleSentByDictionaryElements(query: string) {
    this.authHttp.get('dictionaries/8?sort=name&q=' + query)
      .map(elements => new PaginatedResponse<DictionaryElement>(elements, DictionaryElement))
      .subscribe((elements) => {
        this.sampleSentByDictionaryElements = elements;
      });
  }

  selectSampleSentByDictionaryElement(dict: DictionaryElement) {
    if (this.selectedSampleSentByDictionaryElement &&
      (this.data instanceof AnalysisSecondPag ||
      this.data instanceof AnalysisSecondFeedtoxin ||
      this.data instanceof AnalysisSecondMilktoxin)) {
      this.data.production_controller = dict.name;
      this.data.production_controller_id = dict.code;
    }
    /*else {
     this.data.production_controller = '';
     this.data.production_controller_id = null;
     }*/
  }

  getComments(str: string) {
    return this.authHttp.get('dictionaries/' + this.commentDictionaryId + '?sort=name&q=' + str)
      .map(elements => new PaginatedResponse<DictionaryElement>(elements, DictionaryElement))
      .subscribe(comments => {
          this.commentItems = comments;
        }
      );
  }
}
