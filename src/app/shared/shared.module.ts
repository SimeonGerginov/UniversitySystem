import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms/';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { NavigationComponent } from './navigation/navigation.component';
import { UsersService } from './services/users.service';
import { UserStorageService } from './services/user-storage.service';
import { HttpRequesterService } from './services/http-requester.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [NavigationComponent],
  exports: [
    NavigationComponent,
    NgbModule,
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    UsersService,
    UserStorageService,
    HttpRequesterService,
    NotificationService
  ]
})
export class SharedModule { }
