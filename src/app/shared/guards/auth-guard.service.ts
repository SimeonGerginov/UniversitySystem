import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserStorageService } from '../services/user-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private userStorageService: UserStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserLogged = this.userStorageService.isUserLoggedIn();

    if (isUserLogged) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
