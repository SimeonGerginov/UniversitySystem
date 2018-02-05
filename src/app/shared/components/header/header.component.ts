import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isLoggedIn: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  logout() {
    this.router.navigateByUrl('home');
    this.userService.logout();
    this.isLoggedIn = false;
  }
}
