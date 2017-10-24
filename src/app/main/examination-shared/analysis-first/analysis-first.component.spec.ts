import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AnalysisFirstComponent} from './analysis-first.component';
import {AnalysisModalComponent} from '../analysis-modal/analysis-modal.component';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {MockCustomAuthHttpService} from '../../../../mock/custom-auth-http-service.mock';
import {TypeaheadComponent} from '../../../shared/typeahead/typeahead.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncSubject, Observable} from 'rxjs/Rx';
import {TestData} from '../../../../mock/test-data';
import {Partner} from '../../../models/partner';
import {PartnerDetails} from '../../../models/partner-details';
import {Contact} from '../../../models/contact';
import {Payer} from '../../../models/payer';
import {SharedVarsService} from '../../../services/shared-vars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AnalysisFirst} from '../../../models/analysis-first';
import {AnalysisDataService} from '../analysis-data.service';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';

describe('AnalysisFirstComponent', () => {
  let component: AnalysisFirstComponent;
  let fixture: ComponentFixture<AnalysisFirstComponent>;
  let mockAuthHttp: MockCustomAuthHttpService;
  let activatedRouteStub;
  let subject: AsyncSubject<{ firstData: AnalysisFirst, analysisUrl: string }>;
  let authServiceStub;

  beforeEach(async(() => {
    subject = new AsyncSubject<{ firstData: AnalysisFirst, analysisUrl: string }>();
    mockAuthHttp = new MockCustomAuthHttpService();
    authServiceStub = {
      userSubject: new AsyncSubject<User>()
    };

    activatedRouteStub = {
      data: subject
    };
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        AnalysisFirstComponent,
        AnalysisModalComponent,
        TypeaheadComponent
      ],
      providers: [
        SharedVarsService,
        AnalysisDataService,
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: AuthService,
          useValue: authServiceStub
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getItems', () => {
    subject.next({firstData: null, analysisUrl: 'pag'});
    subject.complete();
    fixture.detectChanges();
    mockAuthHttp.get.and.callFake((param) => {
      if (param === 'pag/partners?sort="name"&q=almafa') {
        param = 'partners';
      }
      return Observable.of(TestData.responses[param]);
    });
    component.getPartners('almafa');

    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag/partners?sort="name"&q=almafa');
    expect(component.partners.length).toBe(TestData.partnersResponse.data.length);
  });

  it('should unsubscribe', () => {
    subject.next({firstData: null, analysisUrl: 'pag'});
    subject.complete();
    fixture.detectChanges();
    const unsubscribe = jasmine.createSpy('unsubscribe');
    mockAuthHttp.get.and.callFake((param) => {
      if (param === 'pag/partners?sort="name"&q=almafa' || param === 'pag/partners?sort="name"&q=almafa2') {
        param = 'partners';
      }
      return new Observable(observer => {
          observer.next(TestData.responses[param]);
          return unsubscribe;
        }
      );
    });
    component.getPartners('almafa');
    component.getPartners('almafa2');
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag/partners?sort="name"&q=almafa');
    expect(mockAuthHttp.get).toHaveBeenCalledWith('pag/partners?sort="name"&q=almafa2');
  });

  it('should not getItems', () => {
    component.getPartners('');

    expect(mockAuthHttp.get).toHaveBeenCalledTimes(0);
  });

  it('should selectedChange', () => {
    component.selectPartner(component.partners[0]);
    expect(component.selectedPartner).toBe(component.partners[0]);
  });

  it('should add partner', () => {
    subject.next({firstData: null, analysisUrl: 'pag'});
    subject.complete();
    fixture.detectChanges();
    mockAuthHttp.get.and.callFake((param) => {
      switch (param) {
        case 'pag/partners/1':
          return Observable.of(TestData.detailsResponse);
        case 'pag/partners/199':
          return Observable.of(TestData.detailsResponse);
        case 'pag/partners/1/contacts':
          return Observable.of(TestData.contactsResponse);
        case 'pag/partners/199/contacts':
          return Observable.of(TestData.contactsResponse2);
        case 'pag/partners/1/payers':
          return Observable.of(TestData.payersResponse);
        case 'pag/partners/1/results':
          return Observable.of(TestData.payersResponse);
      }
    });
    spyOn(component.resetSubject, 'next');

    component.selectedPartner = new Partner(TestData.partnersResponse.data[6]);
    component.addPartner();

    expect(component.resetSubject.next).toHaveBeenCalledTimes(1);
    expect(component.partnerSelectVisible).toBe(false);
    expect(component.addedPartner).toEqual(new PartnerDetails(TestData.detailsResponse.data));
    expect(component.addedPartnerContact).toEqual(new Contact(TestData.contactsResponse.data[0]));
    expect(component.selectedPartner).toBeNull();
    expect(component.selectedResult).toEqual(new Payer(TestData.payersResponse.data[0]));
    expect(component.addedResult).toEqual(new PartnerDetails(TestData.detailsResponse.data));
    expect(component.selectedPayer).toEqual(new Payer(TestData.payersResponse.data[0]));
    expect(component.addedPayer).toEqual(new PartnerDetails(TestData.detailsResponse.data));
    expect(component.addedContacts.length).toBe(2);
  });

  it('should selectedChange result', () => {
    mockAuthHttp.get.and.returnValue(Observable.of(TestData.contactsResponse2));
    component.resultContacts = TestData.contactsResponse2.data.map(contact => new Contact(contact));
    component.addedPartner = new PartnerDetails(TestData.detailsResponse.data);
    component.tempContacts = [
      {
        contact: component.resultContacts[0],
        checked: false
      },
      {
        contact: new Contact(TestData.contactsResponse.data[0]),
        checked: false
      }
    ];
    const select = new Payer(TestData.payersResponse.data[0]);
    component.selectResult(select).subscribe(() => {
      expect(component.selectedResult).toBe(select);
      expect(component.tempContacts[0].checked).toBe(false);
      expect(component.tempContacts[1].checked).toBeTruthy();
    });
  });

  it('should add the same payer', () => {
    component.addedPartner = new PartnerDetails(TestData.detailsResponse.data);
    component.selectedPayer = new PartnerDetails(TestData.detailsResponse.data).ToPayer;

    component.addPayer();
    expect(component.addedPayer).toBe(component.addedPartner);
    expect(mockAuthHttp.get).toHaveBeenCalledTimes(0);
  });

  it('should save', () => {
    spyOn(Router.prototype, 'navigateByUrl');
    spyOn(SharedVarsService.prototype, 'setVar');
    mockAuthHttp.post.and.returnValue(Observable.of({
      data: {
        id: 1,
        full_identifier: 'Almafa'
      }
    }));

    subject.next({firstData: null, analysisUrl: 'pag'});
    subject.complete();
    fixture.detectChanges();

    component.addedPartner = <PartnerDetails>{id: 1};
    component.addedPartnerContact = <Contact>{id: 2};
    component.addedResult = <PartnerDetails>{id: 3};
    component.addedContacts = [<Contact>{id: 4}, <Contact>{id: 5}];
    component.addedPayer = <PartnerDetails>{id: 6};

    component.save();

    expect(mockAuthHttp.post).toHaveBeenCalledWith('pag/arrival1', {
      customerId: 1,
      customerContactId: 2,
      resultId: 3,
      resultEmailIds: [4, 5],
      payerId: 6
    });
    expect(Router.prototype.navigateByUrl).toHaveBeenCalledWith('/pag/analysis/1/arrival2');
  });

  it('should load data', () => {
    mockAuthHttp.get.and.callFake((param) => {
      switch (param) {
        case 'pag/partners/1':
          return Observable.of(TestData.detailsResponse);
        case 'pag/partners/199':
          return Observable.of(TestData.detailsResponse);
        case 'pag/partners/1/contacts':
          return Observable.of(TestData.contactsResponse);
        case 'pag/partners/199/contacts':
          return Observable.of(TestData.contactsResponse2);
        case 'pag/partners/1/payers':
          return Observable.of(TestData.payersResponse);
        case 'pag/partners/1/results':
          return Observable.of(TestData.payersResponse);
      }
    });

    subject.next({firstData: new AnalysisFirst(TestData.arrival1EditResponse.data), analysisUrl: 'pag'});
    subject.complete();
    fixture.detectChanges();

    expect(component.addedPartner).toEqual(new PartnerDetails(TestData.detailsResponse.data));
    expect(component.addedPartnerContact).toEqual(new Contact(TestData.contactsResponse.data[0]));
    expect(component.selectedPartner).toBeUndefined();
    expect(component.selectedResult).toEqual(new Payer(TestData.payersResponse.data[0]));
    expect(component.addedResult).toEqual(new PartnerDetails(TestData.detailsResponse.data));
    expect(component.selectedPayer).toEqual(new Payer(TestData.payersResponse.data[0]));
    expect(component.addedPayer).toEqual(new PartnerDetails(TestData.detailsResponse.data));
    expect(component.addedContacts.length).toBe(1);
  });
});
