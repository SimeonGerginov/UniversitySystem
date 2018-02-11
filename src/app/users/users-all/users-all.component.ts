import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { NotificationService } from '../../shared/services/notification.service';

const PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.css']
})
export class UsersAllComponent implements OnInit {
  public users: User[];
  public pageSize: number;
  public currentPageNumber: number;

  constructor( private userService: UsersService,
               private notificationService: NotificationService ) { }

  ngOnInit() {
     this.pageSize = PAGE_SIZE;
     this.currentPageNumber = DEFAULT_PAGE_NUMBER;
     this.userService.getAllUsers()
       .map((r) => r.json())
       .subscribe((responseUsers) => {
         this.users = responseUsers;
         this.notificationService.showInfo('All users are delivered.');
       });
  }
}
