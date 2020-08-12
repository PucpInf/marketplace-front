import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' ,styleUrls:['app.component.scss']})
export class AppComponent {
  currentUser: User;
  opened = true;
  events = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private translate: TranslateService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang('en');
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
