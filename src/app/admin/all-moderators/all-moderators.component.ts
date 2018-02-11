import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { User } from '../../shared/models/user.model';
import { AdminService } from '../../shared/services/admin.service';
import { NotificationService } from '../../shared/services/notification.service';

const PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-all-moderators',
  templateUrl: './all-moderators.component.html',
  styleUrls: ['./all-moderators.component.css']
})
export class AllModeratorsComponent implements OnInit {
  public moderators: User[];
  public pageSize: number;
  public currentPageNumber: number;

  constructor(private adminService: AdminService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.pageSize = PAGE_SIZE;
    this.currentPageNumber = DEFAULT_PAGE_NUMBER;
    this.adminService.getAllModerators()
        .map((r) => r.json())
        .subscribe((responseModerators) => {
          console.log(responseModerators);
          this.moderators = responseModerators;
          this.notificationService.showInfo('Current Moderators available.');
        });
  }

}
