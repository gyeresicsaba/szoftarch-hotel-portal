import {Component, OnInit} from '@angular/core';
import {AnalysisSecondPag} from '../../../models/analysis-second-pag';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {AnalysisBillingTable} from '../../../models/analysis-billing-table';
import {AnalysisDataService} from '../analysis-data.service';
import {AnalysisData} from '../../../models/analysis-data';
import {AuthService} from '../../../services/auth.service';
import {ToastService} from '../../../services/toast.service';
import {BootstrapTypes} from '../../../models/bootstrap-types';
import {Toast} from '../../../models/toast';
import * as moment from 'moment';

@Component({
  selector: 'app-analysis-billing',
  templateUrl: './analysis-billing.component.html',
  styleUrls: ['./analysis-billing.component.scss']
})
export class AnalysisBillingComponent implements OnInit {

  data: AnalysisSecondPag;
  tableData: AnalysisBillingTable;
  itemNumbers: Array<{ name: string, id: string, price: number }>;
  tmpItem: Array<any> = [];
  readonly = false;
  canBill: boolean;
  isSaved = false;

  private analysisId: number;
  private analysisUrl: string;

  constructor(private route: ActivatedRoute, private authHttp: CustomAuthHttpService, private router: Router,
              private analysisData: AnalysisDataService, private authService: AuthService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.analysisId = data.analysisData.id;
      this.tableData = data.billingData.table;
      this.itemNumbers = data.billingData.items;
      this.data = data.thirdData;
      this.analysisUrl = data.analysisUrl;

      this.tableData.rows.forEach((row, idx) => {
        if (row.item_number !== null) {
          const [id, name] = row.item_number.split(' - ');
          this.tmpItem[idx] = this.itemNumbers.filter(item => item.id === id && item.name === name && item.price === row.unit_price)[0];
        }

      });

      this.authService.userSubject.subscribe((user) => {
        this.canBill = user.modules.hasOwnProperty(this.analysisUrl) && user.modules[this.analysisUrl].includes('billing');
      });

      this.isSaved = this.ButtonsEnabled;
    });
    this.analysisData.subject.subscribe((data: AnalysisData) => {
      this.readonly = data.billed || data.deleted;
      if (!data.report_sent) {
        this.router.navigateByUrl('/' + this.analysisUrl + '/analysis/' + this.analysisId + '/report-send');
      }
    });
  }

  //noinspection JSUnusedGlobalSymbols
  get Price(): number {
    return this.tableData.rows.reduce<number>((sumPrice, row) => sumPrice + row.quantity * row.unit_price, 0);
  }

  get ButtonsEnabled(): boolean {
    return this.tableData.rows.every(row => row.item_number !== null || row.quantity === 0);
  }

  save() {
    this.authHttp.post(this.analysisUrl + '/' + this.analysisId + '/billing/save', this.tableData).subscribe(() => {
      this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
      this.isSaved = true;
    });
  }

  send() {
    this.authHttp.post(this.analysisUrl + '/' + this.analysisId + '/billing/approve', this.tableData).subscribe(() => {
      this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres küldés!', '', 3000));
      this.analysisData.update().subscribe((data: AnalysisData) => {
        this.readonly = data.billed;
        this.data.dates.billed_at = moment();
      });
    });
  }

  itemChanged(event, index) {
    if (event) {
      this.tableData.rows[index].unit_price = event.price;
      this.tableData.rows[index].item_number = event.id + ' - ' + event.name;
    } else {
      this.tableData.rows[index].unit_price = 0;
      this.tableData.rows[index].item_number = null;
    }
  }
}
