import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/models/user.model';
import { AdminService } from '../../shared/services/admin.service';
import { NotificationService } from '../../shared/services/notification.service';
import { FileUploaderService } from '../../shared/services/file-uploader.service';

const DEFAULT_SERVER_PATH = 'http://localhost:3000';

@Component({
  selector: 'app-edit-moderator',
  templateUrl: './edit-moderator.component.html',
  styleUrls: ['./edit-moderator.component.css']
})
export class EditModeratorComponent implements OnInit, AfterContentInit, OnDestroy {
  private id: string;
  private subscriptions: Subscription[];
  public moderator: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService,
              private notificationService: NotificationService,
              private fileUploader: FileUploaderService) {
                this.subscriptions = [];
              }

  ngOnInit() {
    this.moderator = new User();

    this.id = this.route.snapshot.paramMap.get('id');
    const subscription = this.adminService.getModerator(this.id)
        .map((r) => r.json())
        .subscribe((responseModerator) => {
          this.moderator = responseModerator;
        }, (err) => {
          this.notificationService.showError(err);
        });

    this.subscriptions.push(subscription);
  }

  ngAfterContentInit(): void {
    this.notificationService.showInfo(`Please fill out all the fields in order to update the profile of the moderator.`);
  }

  onSubmit(): void {
    const id = this.moderator.id;
    const sub = this.adminService.updateModerator(id, this.moderator)
       .map((r) => r.json())
       .subscribe((response: any) => {
         this.notificationService.showSuccess('Moderator profile has been updated.');
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
         this.moderator.profilePictureUrl = DEFAULT_SERVER_PATH + filesUrls[0];
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
