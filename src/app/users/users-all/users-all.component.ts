import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { UserStorageService } from '../../shared/services/user-storage.service';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.css']
})
export class UsersAllComponent implements OnInit, OnDestroy {
  public users: User[];

  private subscriptions: Subscription[];

  constructor(private userStorageService: UserStorageService,
              private userService: UsersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subscriptions = [];
    this.users = [];
  }

  ngOnDestroy() {

  }
}
