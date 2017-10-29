import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: User;
  analysisModules = [
    {path: 'milktoxin', name: 'Különminta'},
    {path: 'pag', name: 'PAG'},
    {path: 'feedtoxin', name: 'Takarmánytoxin'},
    {path: 'mastitis', name: 'Mastitis'},
    {path: 'tampon', name: 'Tampon'},
  ];

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    // this.authService.userSubject.subscribe(user => {
    //   this.user = user;
    // });
  }

  activeRoute(route: string, fullMatch = false): boolean {
    if (fullMatch) {
      return this.router.url === route;
    }
    return this.router.url.includes(route);
  }
}
