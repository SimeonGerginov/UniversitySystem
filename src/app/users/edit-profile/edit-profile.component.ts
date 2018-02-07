import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/models/user.model';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { UsersService } from '../../shared/services/users.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, AfterContentInit, OnDestroy {
  public user: User;
  public profilePictureUrl: string;
  private subscriptions: Subscription[];

  constructor(private router: Router,
              private userStorageService: UserStorageService,
              private userService: UsersService,
              private notificationService: NotificationService) {
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
