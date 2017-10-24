import {Component, OnInit} from '@angular/core';
import {PDFJS, PDFW} from 'pdfjs-dist';
import {environment} from '../../../../environments/environment';
import {AnalysisData} from '../../../models/analysis-data';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {ToastService} from '../../../services/toast.service';
import {BootstrapTypes} from '../../../models/bootstrap-types';
import {Toast} from '../../../models/toast';
import {AnalysisDataService} from '../analysis-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {AnalysisSecondMilktoxin} from '../../../models/analysis-second-milktoxin';
import {User} from '../../../models/user';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-analysis-report',
  templateUrl: './analysis-report.component.html',
  styleUrls: ['./analysis-report.component.scss']
})
export class AnalysisReportComponent implements OnInit {
  scale = 1;
  pageNumber = 1;
  maxPageNum: number;
  analysis: AnalysisData;
  canApprove: boolean;
  hasExcel = false;
  excelUrl: string;
  apiUrl: string;
  private pdf: any;
  private canvas: HTMLCanvasElement;
  private context;
  analysisId: number;
  analysisUrl: string;
  jwtToken: string;
  userSelectVisible: boolean;
  users: User[] = [];
  usersAppr: User[] = [];
  selectedUser: User;
  selectedApprove: User;
  searchString: string;
  subscription: Subscription;
  resetSubject = new Subject();
  initialized: boolean;


  constructor(private analysisDataService: AnalysisDataService, private authHttp: CustomAuthHttpService,
              private toastService: ToastService, private router: Router, private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.jwtToken = localStorage.getItem('token');
    this.canvas = <HTMLCanvasElement>document.getElementById('pdf-canvas');
    this.context = this.canvas.getContext('2d');

    this.route.data.subscribe((data: { analysisUrl: string, milktoxinReportData?: AnalysisSecondMilktoxin }) => {
      this.analysisUrl = data.analysisUrl;

      if (data.milktoxinReportData) {
        this.hasExcel = true;
      }
    });

    PDFJS.workerSrc = './assets/pdf.worker.js';
    this.analysisDataService.subject.first().subscribe((analysis) => {
      this.analysisId = analysis.id;
      this.analysis = analysis;

      if (!this.analysis.report_generated) {
        setTimeout(() => {
          this.router.navigateByUrl('/' + this.analysisUrl + '/analysis/' + this.analysisId + '/results');
        }, 100);
        return;
      }
      this.excelUrl = environment.apiPrefix + this.analysisUrl + '/' + this.analysisId + '/report/excel?token=' + this.jwtToken;
      this.apiUrl = environment.apiPrefix;

      this.authService.userSubject.subscribe((user) => {
        this.canApprove = user.modules.hasOwnProperty(this.analysisUrl) && user.modules[this.analysisUrl].includes('report_approve');

        this.selectedApprove = user;

        if (this.analysisUrl === 'tampon' || this.analysisUrl === 'mastitis') {
          this.selectedApprove = null;
          this.authHttp.get(this.analysisUrl + '/' + this.analysisId + '/report/users').subscribe((resp) => {
            //noinspection JSUnusedLocalSymbols
            this.authHttp.get('users/' + resp.generated_by).subscribe((respUser) => {
              // this.selectedUser = new User(respUser.data);
              this.initialized = true;
            });
          });
        }
      });

      this.getPdf();
    });
  }

  approveBtn() {
    if (this.analysisUrl === 'tampon' || this.analysisUrl === 'mastitis') {
      this.userSelectVisible = true;
    } else {
      this.approve();
    }
  }

  getUsers(query: string) {
    this.searchString = query;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.searchString && this.searchString.length > 0 && !this.selectedUser) {
      const url = 'users/list?sort="name"&q=' + this.searchString;
      this.subscription = this.authHttp.get(url)
        .map(resp => resp.data.map(user => new User(user)))
        .subscribe(response => {
          this.users = response;
        });
    }
  }

  getUsersAppr(query: string) {
    this.searchString = query;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.searchString && this.searchString.length > 0 && !this.selectedApprove) {
      const url = 'users/list?sort="name"&q=' + this.searchString;
      this.subscription = this.authHttp.get(url)
        .map(resp => resp.data.map(user => new User(user)))
        .subscribe(response => {
          this.usersAppr = response;
        });
    }
  }

  private getPdf() {
    const pdfSource = <any>{
      url: environment.apiPrefix + this.analysisUrl + '/' + this.analysisId + '/report',
      httpHeaders: {Authorization: 'Bearer ' + localStorage.getItem('token')}
    };
    PDFJS.getDocument(pdfSource).then((pdf) => {
      this.pdf = pdf;
      this.maxPageNum = this.pdf.numPages;

      this.renderPage();
    });
  }

  private renderPage() {
    this.pdf.getPage(this.pageNumber).then((page) => {
      const viewport = page.getViewport(this.scale);

      // Prepare canvas using PDF page dimensions
      this.canvas.height = viewport.height;
      this.canvas.width = viewport.width;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: this.context,
        viewport: viewport
      };

      const renderTask = page.render(renderContext);
      renderTask.then(() => {
      });
    });
  }

  zoomIn() {
    this.scale += 0.25;
    this.renderPage();
  }

  zoomOut() {
    this.scale -= 0.25;
    this.renderPage();
  }

  setZoomDefault() {
    this.scale = 1;
    this.renderPage();
  }

  next() {
    if (this.pageNumber >= this.maxPageNum) {
      return;
    }
    this.pageNumber++;
    this.renderPage();
  }

  prev() {
    if (1 >= this.pageNumber) {
      return;
    }
    this.pageNumber--;
    this.renderPage();
  }

  save() {
    this.authHttp.post(this.analysisUrl + '/' + this.analysisId + '/report/save', {}).subscribe(() => {
      this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
      this.analysis.report_saved = true;
      this.analysisDataService.update().subscribe();
    });
  }

  approve() {

    this.authHttp.post(this.analysisUrl + '/' + this.analysisId + '/report/approve', {
      generated_by: this.selectedUser ? this.selectedUser.id : this.selectedApprove.id,
      approved_by: this.selectedApprove ? this.selectedApprove.id : this.selectedApprove.id
    }).subscribe(() => {
      this.userSelectVisible = false;
      this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
      this.analysis.report_approved = true;
      this.analysisDataService.update().subscribe();
      this.getPdf();
    });
  }

  central() {
    this.authHttp.post(this.analysisUrl + '/' + this.analysisId + '/report/central', {}).subscribe(() => {
      this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
      this.analysis.report_approved = true;
      this.analysisDataService.update().subscribe();
      this.getPdf();
    });
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
