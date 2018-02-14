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
import { ModeratorService } from './services/moderator.service';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { ModeratorGuardService } from './guards/moderator-guard.service';
import { LecturerDetailComponent } from './components/lecturer-detail/lecturer-detail.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { StudentService } from './services/student.service';
import { ChatService } from './services/chat.service';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    RouterModule,
    CommonModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [NavigationComponent, FullNamePipe, StudentDetailComponent, LecturerDetailComponent, CourseDetailComponent],
  exports: [
    HttpModule,
    NavigationComponent,
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullNamePipe,
    StudentDetailComponent,
    LecturerDetailComponent,
    CourseDetailComponent
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
    ModeratorGuardService,
    FileUploaderService,
    AdminService,
    ModeratorService,
    StudentService,
    ChatService
  ]
})
export class SharedModule { }
