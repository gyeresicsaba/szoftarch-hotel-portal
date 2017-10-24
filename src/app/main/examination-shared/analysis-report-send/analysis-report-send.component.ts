import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {AnalysisSecondPag} from '../../../models/analysis-second-pag';
import {ReportSendElem} from '../../../models/report-send-elem';
import * as moment from 'moment';
import {AnalysisDataService} from '../analysis-data.service';
import {ToastService} from '../../../services/toast.service';
import {BootstrapTypes} from '../../../models/bootstrap-types';
import {Toast} from '../../../models/toast';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-analysis-report-send',
  templateUrl: './analysis-report-send.component.html',
  styleUrls: ['./analysis-report-send.component.scss']
})
export class AnalysisReportSendComponent implements OnInit {
  data: AnalysisSecondPag;
  elems: ReportSendElem[];
  analysisId: number;
  analysisUrl: string;
  currentItem: ReportSendElem;
  sendButtonDisabled = false;
  sendModalVisible = false;
  sendModalCallback: Function;
  message: string;
  subject: string;
  deleted: boolean;
  analysisFullId: string;
  jwtToken: string;
  apiUrl: string;
  canPrint: boolean;

  constructor(private route: ActivatedRoute, private authHttp: CustomAuthHttpService, private router: Router,
              private analysisDataService: AnalysisDataService, private toastService: ToastService, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.analysisId = data.analysisData.id;
      this.analysisUrl = data.analysisUrl;
      this.data = data.thirdData;
      this.elems = data.reportSendElems;

      this.analysisDataService.subject.subscribe((analysis) => {
        this.deleted = analysis.deleted;
        if (!analysis.report_approved) {
          this.router.navigateByUrl('/' + this.analysisUrl + '/analysis/' + this.analysisId + '/report');
        }
      });
      const emails = {
        'milktoxin': 'tejlabor',
        'pag': 'analitika',
        'feedtoxin': 'analitika',
        'mastitis': 'mikrobi',
        'tampon': 'mikrobi'
      };
      this.analysisFullId = data.analysisData.full_identifier;
      this.subject = this.analysisFullId + ' Jegyzőkönyv';
      this.message = 'Tisztelt Partnerünk!\n\n' +
        'Az alábbiakban küldjük a ' + this.data.customer.name + ' (' + this.data.customer.number + ') által megrendelt, ' +
        this.analysisFullId + ' azonosítójú vizsgálat jegyzőkönyvét.\n\n' +
        'Üdvözlettel,\n' +
        'Állattenyésztési Teljesítményvizsgáló Kft.\n' +
        '2100 Gödöllő, Dózsa György út 58. Pf.: 258\n' +
        'E-mail: ' + emails[this.analysisUrl] + '@atkft.hu\n' +
        'Telefon: 28/515-540\n' +
        'Fax: 28/515-550';

      this.authService.userSubject.subscribe((user) => {
        this.canPrint = user.modules.hasOwnProperty(this.analysisUrl) && user.modules[this.analysisUrl].includes('original_pdf');
      });
    });
    this.jwtToken = localStorage.getItem('token');
    this.apiUrl = environment.apiPrefix;
  }

  reportSend(elem: ReportSendElem) {
    this.sendModalVisible = true;
    this.currentItem = elem;
    this.sendModalCallback = () => {
      this.sendButtonDisabled = true;
      this.sendModalVisible = false;
      this.post(elem);
      this.sendModalCallback = null;
      this.currentItem = null;
    };
  }

  private post(elem: ReportSendElem) {
    this.authHttp.post(this.analysisUrl + '/' + this.analysisId + '/report/send/' + elem.id, {
      subject: this.subject,
      message: this.message
    })
      .subscribe(() => {
        this.sendButtonDisabled = false;
        elem.sent_at = moment();
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres küldés!', '', 3000));
        this.analysisDataService.update().subscribe();
      });
  }

  sendAll() {
    this.currentItem = <ReportSendElem>{};
    this.sendModalVisible = true;
    this.sendModalCallback = () => {
      this.sendButtonDisabled = true;
      this.authHttp.post(this.analysisUrl + '/' + this.analysisId + '/report/send/all', {
        message: this.message,
        subject: this.subject
      }).subscribe(() => {
        this.elems.forEach(elem => {
          elem.sent_at = moment();
        });
        this.sendButtonDisabled = false;
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres küldés!', '', 3000));
        this.analysisDataService.update().subscribe();
        this.sendModalVisible = false;
        this.sendModalCallback = null;
        this.currentItem = null;
      });
    };
  }

  //noinspection JSMethodCanBeStatic
  print(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    let iframe = <HTMLIFrameElement>document.getElementById('printIframe');
    if (iframe) {
      iframe.remove();
    }

    iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.id = 'printIframe';
    document.body.appendChild(iframe);

    iframe.src = (<HTMLAnchorElement>event.target).href;

    iframe.onload = () => {
      setTimeout(() => {
        this.analysisDataService.update().subscribe();
      }, 500);
    };
  }
}
