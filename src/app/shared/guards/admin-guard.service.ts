import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AdminService } from '../services/admin.service';


@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private router: Router,
              private adminService: AdminService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     const isUserAdmin = this.adminService.isUserAdmin();

    if (!isUserAdmin) {
      this.router.navigate(['/']);
      return false;
    }

      return true;
  }

}
