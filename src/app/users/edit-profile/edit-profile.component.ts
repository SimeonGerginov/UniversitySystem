import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/models/user.model';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { UsersService } from '../../shared/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';
import { FileUploaderService } from '../../shared/services/file-uploader.service';

const DEFAULT_SERVER_PATH = 'http://localhost:3000';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, AfterContentInit, OnDestroy {
  private subscriptions: Subscription[];
  public user: User;

  constructor(private router: Router,
              private userStorageService: UserStorageService,
              private userService: UsersService,
              private notificationService: NotificationService,
              private fileUploader: FileUploaderService) {
        this.subscriptions = [];
  }

  ngOnInit() {
    this.user = new User();

    const subscription = this.userService.getLoggedUserInfo()
       .map((r) => r.json())
       .subscribe((response: any) => {
         this.user = response.user;
       }, (err) => {
         this.notificationService.showError(err);
       });

    this.subscriptions.push(subscription);
  }

  ngAfterContentInit(): void {
    this.notificationService.showInfo('Please fill out all the fields in order to update your profile.');
  }

  onSubmit(): void {
    const sub = this.userService.updateUserInfo(this.user)
       .map((r) => r.json())
       .subscribe((response: any) => {
         this.userStorageService.setUserInfo(this.user);
         this.notificationService.showSuccess('Your profile has been updated.');
         this.router.navigateByUrl('/home');
       }, (err) => {
         this.notificationService.showError(err);
       });

     this.subscriptions.push(sub);
  }

  onChange(files: File[]): void {
    const sub = this.fileUploader.uploadFile(files)
       .map((r) => r.json())
       .subscribe((response: any) => {
         const { filesUrls } = response;
         this.user.profilePictureUrl = DEFAULT_SERVER_PATH + filesUrls[0];
         this.notificationService.showInfo('Click on save changes in order to save your work.');
       }, (err) => {
         this.notificationService.showError(err);
       });

     this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
