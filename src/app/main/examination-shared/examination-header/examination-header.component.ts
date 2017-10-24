import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AnalysisData} from '../../../models/analysis-data';
import {AnalysisDataService} from '../analysis-data.service';
import {Subscription} from 'rxjs/Subscription';

enum States {
  arrival1,
  arrival2,
  results,
  report,
  'report-send',
  billing
}

@Component({
  selector: 'app-examination-header',
  templateUrl: './examination-header.component.html',
  styleUrls: ['./examination-header.component.scss']
})
export class ExaminationHeaderComponent implements OnInit {
  root: string;
  current: States;
  hasId: boolean;
  private analysis = new AnalysisData({});
  private subscription: Subscription;

  constructor(private router: Router, private analysisDataService: AnalysisDataService) {
  }

  ngOnInit() {
    this.buildUrl();
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      this.buildUrl();
    });
    this.subscribe();
  }

  private buildUrl() {
    const segments = this.router.url.split('/');
    if (segments[0] === '') {
      segments.splice(0, 1);
    }
    if (segments[2] === 'arrival1') {
      this.root = '/' + segments[0] + '/analysis';
      this.current = 0;
      this.hasId = false;
      this.analysis = <AnalysisData>{};
    } else {
      this.root = '';
      for (let i = 0; i < segments.length - 1; i++) {
        this.root += '/' + segments[i];
      }
      this.current = States[segments[segments.length - 1]];
      this.hasId = true;
    }
  }

  private subscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.subscription = this.analysisDataService.subject.subscribe((data) => {
        this.analysis = data;
      },
      () => {
      },
      () => {
        setTimeout(() => {
          this.subscribe();
        }, 500);
      }
    );
  }

  isDone(state: string) {
    return !this.isDisabled(state) && !this.isActive(state);
  }

  isActive(state: string) {
    return this.router.url === this.root + '/' + state;
  }

  isDisabled(state: string): boolean {
    switch (state) {
      case 'arrival2':
        if (this.current === 0 && this.hasId) {
          return false;
        }
        break;
      case 'results':
        if (this.current < States.results && this.analysis && this.analysis.arrival_closed) {
          return false;
        }
        break;
      case 'report':
        if (this.current < States.report && this.analysis && this.analysis.report_generated) {
          return false;
        }
        break;
      case 'report-send':
        if (this.analysis && this.analysis.central) {
          return true;
        }
        if (this.current < States['report-send'] && this.analysis && this.analysis.report_approved) {
          return false;
        }
        break;
      case 'billing':
        if (this.analysis && this.analysis.central) {
          return true;
        }
        if (this.current < States.billing && this.analysis && this.analysis.report_sent) {
          return false;
        }
        break;
      default:
        return States[state] > this.current;
    }
    return States[state] > this.current;
  }

  routerLink(state: string) {
    if (this.router.url === '/pag/analysis/arrival1' && state !== 'arrival1') {
      return null;
    }
    return this.root + '/' + state;
  }
}
