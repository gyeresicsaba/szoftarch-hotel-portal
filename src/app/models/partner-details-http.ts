/**
 * Created by ekemate on 2017. 03. 01..
 */
import {PartnerDetails} from './partner-details';
import {Contact} from './contact';
import {Payer} from './payer';
import {Contract} from './contract';

export class PartnerDetailsHttp {
  partnerDetails: PartnerDetails;
  contacts: Contact[];
  payers: Payer[];
  results: Payer[];
  contracts: Contract[];

  constructor(partnerDetails: PartnerDetails, contacts: Contact[], payers: Payer[], results: Payer[], contracts: Contract[]) {
    this.partnerDetails = partnerDetails;
    this.contacts = contacts;
    this.payers = payers;
    this.results = results;
    this.contracts = contracts;
  }
}
