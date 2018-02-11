import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms/';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { NavigationComponent } from './navigation/navigation.component';
import { UsersService } from './services/users.service';
import { UserStorageService } from './services/user-storage.service';
import { HttpRequesterService } from './services/http-requester.service';
import { NotificationService } from './services/notification.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { LogoutGuardService } from './guards/logout-guard.service';
import { FileUploaderService } from './services/file-uploader.service';
import { AdminService } from './services/admin.service';
import { AdminGuardService } from './guards/admin-guard.service';
import { FullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    CommonModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [NavigationComponent, FullNamePipe],
  exports: [
    HttpModule,
    NavigationComponent,
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
    NotificationService,
    AuthGuardService,
    LogoutGuardService,
    AdminGuardService,
    FileUploaderService,
    AdminService
  ]
})
export class SharedModule { }
