import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, Params, PRIMARY_OUTLET, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {SharedVarsService} from '../../services/shared-vars.service';
import {SpinnerService} from '../../services/spinner.service';
import {environment} from '../../../environments/environment';

export interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  breadcrumbs: IBreadcrumb[];
  isDemo = true;
  private body: HTMLElement;

  constructor(public authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router, private sharedVars: SharedVarsService, private spinner: SpinnerService) {
  }

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const ROUTE_DATA_BREADCRUMB_LABEL_VARIABLE_NAME = 'breadcrumbVar';

    this.body = document.getElementsByTagName('body')[0];

    // if (environment.apiPrefix === 'http://labor.atkft.hu/api/' || window.location.hostname === 'labor.atkft.hu') {
    //   this.isDemo = false;
    // }
    //
    // this.sub = this.router.events
    //   .filter(event => event instanceof NavigationEnd || event instanceof NavigationStart || event instanceof NavigationCancel)
    //   .subscribe((event) => {
    //     if (event instanceof NavigationStart) {
    //       this.spinner.incrementCounter('wrapper');
    //       return;
    //     }
    //     this.spinner.decrementCounter('wrapper');
    //     if (event instanceof NavigationCancel) {
    //       return;
    //     }
    //
    //     // reset breadcrumbs
    //     this.breadcrumbs = [];
    //
    //     // get the root route
    //     let currentRoute: ActivatedRoute = this.activatedRoute.root;
    //
    //     // set the url to an empty string
    //     let url = '';
    //
    //     // iterate from activated route to children
    //     while (currentRoute.children.length > 0) {
    //       const childrenRoutes: ActivatedRoute[] = currentRoute.children;
    //
    //       childrenRoutes.forEach(route => {
    //         // set currentRoute to this route
    //         currentRoute = route;
    //
    //         // verify this is the primary route
    //         if (route.outlet !== PRIMARY_OUTLET) {
    //           return;
    //         }
    //
    //         // verify the custom data property "breadcrumb" is specified on the route
    //         const hasLabelVariable = route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB_LABEL_VARIABLE_NAME);
    //         const hasBreadcrumb = route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB);
    //         if (!hasBreadcrumb && !hasLabelVariable) {
    //           return;
    //         }
    //
    //         // verify the custom data property "breadcrumb" is null on the route
    //         if (route.snapshot.data[ROUTE_DATA_BREADCRUMB] === null) {
    //           return;
    //         }
    //
    //         // get the route's URL segment
    //         const routeURL: string = route.snapshot.url.map(segment => segment.path).join('/');
    //
    //         // append route URL to URL
    //         url += `/${routeURL}`;
    //         let label = route.snapshot.data[ROUTE_DATA_BREADCRUMB] || 'Loading..';
    //         if (hasLabelVariable) {
    //           label = this.sharedVars.getVar<string>(route.snapshot.data[ROUTE_DATA_BREADCRUMB_LABEL_VARIABLE_NAME])
    //             || route.snapshot.data[ROUTE_DATA_BREADCRUMB];
    //         }
    //
    //         const isRoot = url === '/';
    //         // add breadcrumb
    //         const breadcrumb: IBreadcrumb = {
    //           label: label,
    //           params: isRoot ? null : route.snapshot.params,
    //           url: url
    //         };
    //         this.breadcrumbs.push(breadcrumb);
    //       });
    //     }
    //   });
  }

  activeRoute(route: string): boolean {
    return this.router.url === route;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleClass() {
    if (this.body.classList.contains('body-small')) {
      this.body.classList.remove('body-small');
    } else {
      this.body.classList.add('body-small');
    }
  }
}
