import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms/';

import { NavigationComponent } from './navigation/navigation.component';
import { UsersService } from './services/users.service';
import { UserStorageService } from './services/user-storage.service';
import { HttpRequesterService } from './services/http-requester.service';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [NavigationComponent],
  exports: [
    NavigationComponent,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    UsersService,
    UserStorageService,
    HttpRequesterService
  ]
})
export class SharedModule { }
