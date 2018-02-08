import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.css']
})
export class UsersAllComponent implements OnInit {
  public users: User[];
  public pageSize: number;
  public currentPageNumber: number;

  constructor( private userService: UsersService ) { }

  ngOnInit() {
     this.pageSize = 5;
     this.currentPageNumber = 1;
     this.userService.getAllUsers()
       .map((r) => r.json())
       .subscribe((responseUsers) => {
         this.users = responseUsers;
       });
  }
}
