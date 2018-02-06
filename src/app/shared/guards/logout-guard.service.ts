import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { UserStorageService } from '../services/user-storage.service';

@Injectable()
export class LogoutGuardService {

  constructor(private router: Router,
    private userStorageService: UserStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserLogged = this.userStorageService.isUserLoggedIn();

    if (!isUserLogged) {
       this.router.navigate(['/']);
       return false;
    }

    return true;
  }
}
