import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {BoxBase} from '../../../models/box-base';
import {PaginatedResponse} from '../../../models/paginated-response';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-summarized-list',
  templateUrl: './summarized-list.component.html',
  styleUrls: ['./summarized-list.component.scss']
})
export class SummarizedListComponent implements OnInit {
  subscription: Subscription;
  partnerNumberSearchControl = new FormControl();
  partnerSearchString = '';
  response: PaginatedResponse<BoxBase>;
  page = 1;

  constructor(private route: ActivatedRoute, private authHttp: CustomAuthHttpService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { response: PaginatedResponse<BoxBase> }) => {
      this.response = data.response;
    });

    this.partnerNumberSearchControl.valueChanges.debounceTime(500).subscribe(value => {
      this.searchPartner(value);
    });
  }

  private searchPartner(str: string) {
    this.partnerSearchString = str;
    this.page = 1;
    this.getList();
  }

  getList() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    let url = 'boxes/summary?page=' + this.page;
    if (this.partnerSearchString.length) {
      url += '&qpartner=' + this.partnerSearchString;
    }
    this.subscription = this.authHttp.get(url)
      .map(list => new PaginatedResponse<BoxBase>(list, BoxBase))
      .subscribe(response => {
        this.response = response;
      });
  }
}
