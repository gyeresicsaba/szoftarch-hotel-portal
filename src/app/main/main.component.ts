import {Component, OnInit} from '@angular/core';
import {CustomAuthHttpService} from '../services/custom-auth-http.service';
const {version: appVersion} = require('../../../package.json');

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  appVersion: string;
  apiVersion: string;

  constructor(private authHttp: CustomAuthHttpService) {
  }

  ngOnInit() {
    this.appVersion = appVersion;
    this.authHttp.get('version').subscribe(resp => {
      this.apiVersion = resp.version;
    });
    this.apiVersion = '0.8.0';
  }

}
