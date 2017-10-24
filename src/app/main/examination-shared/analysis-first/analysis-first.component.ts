import {Component, OnInit} from '@angular/core';
import {Partner} from '../../../models/partner';
import {Observable, Subject, Subscription} from 'rxjs/Rx';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {PartnerDetails} from '../../../models/partner-details';
import {Contact} from '../../../models/contact';
import {Payer} from '../../../models/payer';
import {ActivatedRoute, Router} from '@angular/router';
import {AnalysisFirst} from '../../../models/analysis-first';
import {AnalysisData} from '../../../models/analysis-data';
import {AnalysisDataService} from '../analysis-data.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-analysis-first',
  templateUrl: './analysis-first.component.html',
  styleUrls: ['./analysis-first.component.scss']
})
export class AnalysisFirstComponent implements OnInit {
  partnerSelectVisible: boolean;
  searchString: string;
  partners: Partner[] = [];
  selectedPartner: Partner;
  addedPartnerContact: Contact;
  contacts: Contact[];
  resultContacts: Contact[] = [];
  tempContacts: { contact: Contact, checked: boolean }[];
  addedContacts: Contact[] = [];
  results: Payer[];
  payers: Payer[];
  selectedResult: Payer;
  resultSelectVisible = false;
  payerSelectVisible = false;
  selectedPayer: Payer;
  addedResult: PartnerDetails;
  addedPayer: PartnerDetails;
  addedPartner: PartnerDetails;
  resetSubject = new Subject();
  readonly = false;
  noAddedPartnerModal = false;
  canReopen: boolean;
  firstData: AnalysisFirst;
  contactSelectVisible: boolean;
  private analysisUrl: string;
  private subscription: Subscription;
  private analysisId: number;

  constructor(private authHttp: CustomAuthHttpService, private router: Router, private authService: AuthService,
              private route: ActivatedRoute, private analysisDataService: AnalysisDataService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { firstData?: AnalysisFirst, analysisData?: AnalysisData, analysisUrl: string }) => {
      this.analysisUrl = data.analysisUrl;
      if (data.analysisData) {
        this.analysisId = data.analysisData.id;
        this.readonly = data.analysisData.arrival_closed || data.analysisData.deleted;
      }
      if (data.firstData) {
        this.firstData = data.firstData;
      }
      if (data.firstData && !this.readonly) {
        this.loadData(data.firstData);
      }
      if (data.analysisData) {
        this.authService.userSubject.subscribe((user) => {
          this.canReopen = user.modules.hasOwnProperty(data.analysisUrl)
            && user.modules[data.analysisUrl].includes('reopen')
            && !data.analysisData.report_approved
            && !data.analysisData.deleted;
        });
      }
      if (this.readonly) {
        this.authHttp.get(this.analysisUrl + '/' + data.analysisData.id + '/arrival1/view')
          .subscribe((resp) => {
            this.addedPartner = new PartnerDetails(resp.data.customer);
            this.addedResult = new PartnerDetails(resp.data.result);
            this.addedPayer = new PartnerDetails(resp.data.payer);
            this.addedContacts = resp.data.result_emails.map(email => {
              return {email: email};
            });
            this.addedPartnerContact = resp.data.customer_contact;
          });
      }
    });
  }

  getPartners(query: string) {
    this.searchString = query;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.searchString && this.searchString.length > 0 && !this.selectedPartner) {
      const url = this.analysisUrl + '/partners?sort="name"&q=' + this.searchString;
      this.subscription = this.authHttp.get(url)
        .map(resp => resp.data.map(partner => new Partner(partner)))
        .subscribe(response => {
          this.partners = response;
        });
    }
  }

  selectPartner(partner: Partner) {
    this.selectedPartner = partner;
  }

  addPartner() {
    this.tempContacts = [];
    this.authHttp.get(this.analysisUrl + '/partners/' + this.selectedPartner.id)
      .map(response => new PartnerDetails(response.data))
      .subscribe((partner: PartnerDetails) => {
        this.addedPartner = partner;
        this.authHttp.get(this.analysisUrl + '/partners/' + this.addedPartner.id + '/contacts')
          .map(response => response.data.map(contact => new Contact(contact)))
          .subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
            const defContacts = this.contacts.filter(contact => contact.isDefault);
            if (defContacts.length) {
              this.addedPartnerContact = defContacts[0];
            }
            if (!this.addedPartnerContact) {
              this.noAddedPartnerModal = true;
            }
            this.contacts.forEach(contact => {
              this.tempContacts.push({contact: contact, checked: contact.isDefault});
            });
            this.getResults();
          });
        this.getPayers();
      });

    this.partnerSelectVisible = false;
    this.selectedPartner = null;
    this.resetSubject.next();
  }

  private getPayers() {
    this.authHttp.get(this.analysisUrl + '/partners/' + this.addedPartner.id + '/payers')
      .map(response => response.data.map(result => new Payer(result)))
      .subscribe((payers: Payer[]) => {
        this.payers = payers;
        this.selectedPayer = this.payers.filter(payer => payer.isDefault)[0];
        this.addPayer();
      });
  }

  private getResults() {
    this.authHttp.get(this.analysisUrl + '/partners/' + this.addedPartner.id + '/results')
      .map(response => response.data.map(result => new Payer(result)))
      .subscribe((results: Payer[]) => {
        this.results = results;
        const defResult = this.results.filter(result => result.isDefault)[0];
        this.selectResult(defResult).subscribe(() => {
          this.addResult();
        });
      });
  }

  selectResult(result: Payer) {
    this.selectedResult = result;
    this.resultContacts.forEach(contact => {
      for (let i = 0; i < this.tempContacts.length; i++) {
        if (this.tempContacts[i].contact === contact) {
          this.tempContacts.splice(i, 1);
          break;
        }
      }
    });
    return new Observable(observer => {
      if (result.id !== this.addedPartner.id) {
        this.authHttp.get(this.analysisUrl + '/partners/' + result.id + '/contacts')
          .map(response => response.data.map(contact => new Contact(contact)))
          .subscribe((contacts: Contact[]) => {
            this.resultContacts = contacts;
            this.resultContacts.forEach(contact => {
              this.tempContacts.push({contact: contact, checked: contact.isDefault});
            });
            observer.next();
          });
      } else {
        observer.next();
      }
    });
  }

  addResult() {
    this.addedContacts = [];
    this.resultSelectVisible = false;
    if (this.selectedResult.id === this.addedPartner.id) {
      this.addedResult = this.addedPartner;
    } else {
      this.authHttp.get(this.analysisUrl + '/partners/' + this.selectedResult.id)
        .map(response => new PartnerDetails(response.data))
        .subscribe((partner: PartnerDetails) => {
          this.addedResult = partner;
        });
    }
    this.tempContacts.forEach(contact => {
      if (contact.checked) {
        this.addedContacts.push(contact.contact);
      }
    });
  }

  addPayer() {
    this.payerSelectVisible = false;
    if (this.selectedPayer.id === this.addedPartner.id) {
      this.addedPayer = this.addedPartner;
    } else {
      this.authHttp.get(this.analysisUrl + '/partners/' + this.selectedPayer.id)
        .map(response => new PartnerDetails(response.data))
        .subscribe((partner: PartnerDetails) => {
          this.addedPayer = partner;
        });
    }
  }

  save() {
    const data: { customerId: number, customerContactId: number, resultId: number, resultEmailIds: number[], payerId: number } = {
      customerId: this.addedPartner.id,
      customerContactId: this.addedPartnerContact.id,
      resultId: this.addedResult.id,
      resultEmailIds: this.addedContacts.map(contact => contact.id),
      payerId: this.addedPayer.id
    };
    if (this.analysisId) {
      this.authHttp.put(this.analysisUrl + '/' + this.analysisId + '/arrival1', data)
        .subscribe((response: { data: { id: number, full_identifier: string } }) => {
          this.analysisDataService.init(this.analysisUrl, response.data.id);
          this.router.navigateByUrl('/' + this.analysisUrl + '/analysis/' + response.data.id + '/arrival2');
        });
    } else {
      this.authHttp.post(this.analysisUrl + '/arrival1', data).subscribe((response: { data: { id: number, full_identifier: string } }) => {
        this.analysisDataService.init(this.analysisUrl, response.data.id);
        this.router.navigateByUrl('/' + this.analysisUrl + '/analysis/' + response.data.id + '/arrival2');
      });
    }

  }

  private loadData(data: AnalysisFirst) {
    this.tempContacts = [];
    this.authHttp.get(this.analysisUrl + '/partners/' + data.customerId)
      .map(response => new PartnerDetails(response.data))
      .subscribe((partner: PartnerDetails) => {
        this.addedPartner = partner;
        this.authHttp.get(this.analysisUrl + '/partners/' + this.addedPartner.id + '/contacts')
          .map(response => response.data.map(contact => new Contact(contact)))
          .subscribe((contacts: Contact[]) => {
            this.contacts = contacts;
            this.addedPartnerContact = this.contacts.filter(contact => contact.id === data.customerContactId)[0];
            this.contacts.forEach(contact => {
              this.tempContacts.push({contact: contact, checked: (data.resultEmailIds.indexOf(contact.id) > -1)});
            });
            this.authHttp.get(this.analysisUrl + '/partners/' + this.addedPartner.id + '/results')
              .map(response => response.data.map(result => new Payer(result)))
              .subscribe((results: Payer[]) => {
                this.results = results;
                this.selectedResult = this.results.filter(result => result.id === data.resultId)[0];
                if (this.selectedResult.id !== this.addedPartner.id) {
                  this.authHttp.get(this.analysisUrl + '/partners/' + this.selectedResult.id + '/contacts')
                    .map(response => response.data.map(contact => new Contact(contact)))
                    .subscribe((resultContacts: Contact[]) => {
                      this.resultContacts = resultContacts;
                      this.resultContacts.forEach(contact => {
                        this.tempContacts.push({
                          contact: contact,
                          checked: (data.resultEmailIds.indexOf(contact.id) > -1)
                        });
                      });
                      this.addResult();
                    });
                } else {
                  this.addResult();
                }

              });
          });
        this.authHttp.get(this.analysisUrl + '/partners/' + this.addedPartner.id + '/payers')
          .map(response => response.data.map(result => new Payer(result)))
          .subscribe((payers: Payer[]) => {
            this.payers = payers;
            this.selectedPayer = this.payers.filter(payer => payer.id === data.payerId)[0];
            this.addPayer();
          });
      });
  }

  reopen() {
    this.readonly = false;
    this.loadData(this.firstData);
  }
}
