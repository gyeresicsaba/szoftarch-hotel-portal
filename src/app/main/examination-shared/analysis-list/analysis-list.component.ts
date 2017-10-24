import {Component, OnInit} from '@angular/core';
import {PickedDate} from '../../../models/picked-date';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import {PaginatedResponse} from '../../../models/paginated-response';
import {AnalysisListItem} from '../../../models/analysis-list-item';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../services/auth.service';
import {Modal} from '../../../models/modal';
import {ModalService} from '../../../services/modal.service';
import {Location} from '@angular/common';
import {ListSettings} from '../../../models/list-settings';

@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss']
})
export class AnalysisListComponent implements OnInit {
  startDateModel: { date: PickedDate | {} } = {date: {}};
  endDateModel: { date: PickedDate | {} } = {date: {}};
  startDatePickerOptions: IMyOptions = {
    height: '28px',
    selectionTxtFontSize: '14px',
    editableDateField: false,
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    width: '125px'
  };
  endDatePickerOptions: IMyOptions = {
    height: '28px',
    selectionTxtFontSize: '14px',
    editableDateField: false,
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    width: '125px'
  };

  response: PaginatedResponse<AnalysisListItem>;
  partnerNumberSearchControl = new FormControl();
  analysisIdSearchControl = new FormControl();
  subscription: Subscription;
  sortString = '';
  page = 1;
  analysisSearchString = '';
  partnerSearchString = '';
  apiPrefix: string;
  jwtToken: string;
  canCopyArchive: boolean;
  canDelete: boolean;
  displayDeleted: boolean;
  filterComplete: boolean;
  filterBillable: boolean;
  filterByPayer: boolean;
  billArray: { [id: number]: boolean } = {};
  allBilled: boolean;
  private partnerTimeout;
  private startDateString: string;
  private endDateString: string;
  private storage: ListSettings;

  constructor(private route: ActivatedRoute, private authHttp: CustomAuthHttpService, private authService: AuthService,
              private router: Router, private modalService: ModalService, private location: Location) {
  }

  ngOnInit() {
    this.apiPrefix = environment.apiPrefix;
    this.jwtToken = localStorage.getItem('token');
    this.route.data.subscribe((data: { response: PaginatedResponse<AnalysisListItem>, analysisUrl: string }) => {
      this.response = data.response;
      this.response.data.forEach((elem: AnalysisListItem) => {
        if (elem.BillApprovedAt && !elem.BilledAt) {
          this.billArray[elem.id] = false;
        }
      });

      this.authService.userSubject.subscribe((user) => {
        this.canCopyArchive = user.modules.hasOwnProperty(data.analysisUrl) && user.modules[data.analysisUrl].includes('archive_copy');
        this.canDelete = user.modules.hasOwnProperty(data.analysisUrl) && user.modules[data.analysisUrl].includes('delete');
      });

      this.storage = new ListSettings(data.analysisUrl);
    });

    for (const obj in this.route.snapshot.params) {
      if (this.route.snapshot.params.hasOwnProperty(obj)) {
        switch (obj) {
          case 'sort':
            this.sortString = this.route.snapshot.params[obj];
            break;
          case 'page':
            this.page = this.route.snapshot.params[obj];
            break;
          case 'deleted':
            this.displayDeleted = this.route.snapshot.params[obj];
            break;
          case 'complete':
            this.filterComplete = this.route.snapshot.params[obj];
            break;
          case 'billable':
            this.filterBillable = this.route.snapshot.params[obj];
            break;
          case 'qpayer':
            this.filterByPayer = this.route.snapshot.params[obj];
            break;
          case 'qstart':
            this.startDateString = this.route.snapshot.params[obj];
            this.startDateModel.date = this.route.snapshot.params[obj];
            break;
          case 'qend':
            this.endDateString = this.route.snapshot.params[obj];
            this.endDateModel.date = this.route.snapshot.params[obj];
            break;
          case 'qnumber':
            this.partnerNumberSearchControl.setValue(this.route.snapshot.params[obj]);
            this.partnerSearchString = this.route.snapshot.params[obj];
            break;
          case 'qid':
            this.analysisIdSearchControl.setValue(this.route.snapshot.params[obj]);
            this.analysisSearchString = this.route.snapshot.params[obj];
            break;
        }
      }

    }


    this.partnerNumberSearchControl.valueChanges.subscribe((value) => {
      this.partnerNumberFormat(value);

      clearTimeout(this.partnerTimeout);
      this.partnerTimeout = setTimeout(() => {
        this.searchPartner();
      }, 500);
    });

    this.analysisIdSearchControl.valueChanges.debounceTime(500).subscribe(value => {
      this.searchAnalysis(value);
    });
  }

  private searchAnalysis(str: string) {
    this.analysisSearchString = str;
    this.page = 1;
    this.getList();
  }

  private searchPartner() {
    this.page = 1;
    this.getList();
  }

  sort(param: string) {
    if (this.sortString === param) {
      this.sortString = '-' + param;
    } else if (this.sortString === '-' + param) {
      this.sortString = '';
    } else {
      this.sortString = param;
    }
    this.page = 1;
    this.getList();
  }

  pickerStartDateChange(event: IMyDateModel) {
    this.startDateString = event.formatted;
    this.getList();
  }

  pickerEndDateChange(event: IMyDateModel) {
    this.endDateString = event.formatted;
    this.getList();
  }

  billAll() {
    this.allBilled = !this.allBilled;
    for (const obj in this.billArray) {
      if (this.billArray.hasOwnProperty(obj)) {
        this.billArray[obj] = this.allBilled;
      }
    }
  }

  exportToXls() {
    console.log('csövi');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    let excelUrl = this.route.snapshot.data.analysisUrl + '/excel?token=' + localStorage.getItem('token');
    if (this.analysisSearchString.length) {
      excelUrl += '&qid=' + this.analysisSearchString;
    }
    if (this.displayDeleted) {
      excelUrl += '&deleted=' + this.displayDeleted;
    }
    if (this.filterComplete) {
      excelUrl += '&complete=' + this.filterComplete;
    }
    if (this.filterBillable) {
      excelUrl += '&billable=' + this.filterBillable + '&limit=1000';
    }
    if (this.filterByPayer) {
      excelUrl += '&qpayer=' + this.filterByPayer;
    }
    if (this.partnerSearchString.length) {
      excelUrl += '&qnumber=' + this.partnerSearchString;
    }
    if (typeof this.startDateString !== 'undefined') {
      excelUrl += '&qstart=' + this.startDateString;
    }
    if (typeof this.endDateString !== 'undefined') {
      excelUrl += '&qend=' + this.endDateString;
    }
    location.href = environment.apiPrefix + excelUrl;
  }

  nullList() {
    this.page = 1;
    this.getList();
  }

  getList() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.storage.empty();
    let localUrl = '/' + this.route.snapshot.data.analysisUrl + '/list;' + 'sort=' + this.sortString + ';page=' + this.page;
    let url = this.route.snapshot.data.analysisUrl + '?sort=' + this.sortString + '&page=' + this.page;
    this.storage.sort = this.sortString;
    this.storage.page = this.page;
    if (this.analysisSearchString.length) {
      url += '&qid=' + this.analysisSearchString;
      localUrl += ';qid=' + this.analysisSearchString;
      this.storage.qid = this.analysisSearchString;
    }
    if (this.displayDeleted) {
      url += '&deleted=' + this.displayDeleted;
      localUrl += ';deleted=' + this.displayDeleted;
      this.storage.deleted = this.displayDeleted;
    }
    if (this.filterComplete) {
      url += '&complete=' + this.filterComplete;
      localUrl += ';complete=' + this.filterComplete;
      this.storage.complete = this.filterComplete;
    }
    if (this.filterBillable) {
      url += '&billable=' + this.filterBillable + '&limit=1000';
      localUrl += ';billable=' + this.filterBillable + ';limit=1000';
      this.storage.billable = this.filterBillable;
    }
    if (this.filterByPayer) {
      url += '&qpayer=' + this.filterByPayer;
      localUrl += ';qpayer=' + this.filterByPayer;
      this.storage.qpayer = this.filterByPayer;
    }
    if (this.partnerSearchString.length) {
      url += '&qnumber=' + this.partnerSearchString;
      localUrl += ';qnumber=' + this.partnerSearchString;
      this.storage.qnumber = this.partnerSearchString;
    }
    if (typeof this.startDateString !== 'undefined') {
      url += '&qstart=' + this.startDateString;
      localUrl += ';qstart=' + this.startDateString;
      this.storage.qstart = this.startDateString;
    }
    if (typeof this.endDateString !== 'undefined') {
      url += '&qend=' + this.endDateString;
      localUrl += ';qend=' + this.endDateString;
      this.storage.qend = this.endDateString;
    }
    this.location.replaceState(localUrl);
    this.storage.save();
    this.subscription = this.authHttp.get(url)
      .map(list => new PaginatedResponse<AnalysisListItem>(list, AnalysisListItem))
      .subscribe(response => {
        this.response = response;
        this.billArray = {};
        this.response.data.forEach((elem: AnalysisListItem) => {
          if (elem.BillApprovedAt && !elem.BilledAt) {
            this.billArray[elem.id] = false;
          }
        });
      });
  }

  copy(analysis: AnalysisListItem, type: 'archive' | 'arrival') {
    if (type === 'archive' && !analysis.reportUrl) {
      return;
    }
    this.authHttp.post(this.route.snapshot.data.analysisUrl + '/' + analysis.id + '/copy-' + type, {})
      .subscribe(resp => {
        const url = '/' + this.route.snapshot.data.analysisUrl + '/analysis/' + resp.core_analysis.id;
        this.router.navigateByUrl(url + (type === 'archive' ? '/report' : '/arrival1'));
      });
  }

  openDeleteModal(analysis: AnalysisListItem) {
    this.modalService.open(new Modal('Törlés', 'Biztos törölni szeretné?', [{
      text: 'Törlés',
      classes: 'btn-danger',
      callback: () => {
        this.modalService.close();
        this.deleteAnalysis(analysis);
      }
    }]));
  }

  private deleteAnalysis(analysis: AnalysisListItem) {
    this.authHttp.delete(this.route.snapshot.data.analysisUrl + '/' + analysis.id).subscribe(() => {
      this.getList();
    });
  }

  partnerNumberFormat(value: string) {
    const original = value;
    if (value[2] !== '-' && value.length >= 3) {
      value = value.slice(0, 2) + '-' + value.slice(2);
    }
    if (value[6] !== '-' && value.length >= 7) {
      value = value.slice(0, 6) + '-' + value.slice(6);
    }
    this.partnerSearchString = value;
    if (value !== original) {
      this.partnerNumberSearchControl.setValue(value);
    }
  }

  get Checked(): number {
    let num = 0;
    for (const obj in this.billArray) {
      if (this.billArray[obj]) {
        num++;
      }
    }
    return num;
  }

  bill() {
    this.authHttp.post(this.route.snapshot.data.analysisUrl + '/billing/send', {ids: Object.keys(this.billArray)}).subscribe(() => {
      this.allBilled = false;
      this.getList();
    });
  }
}
