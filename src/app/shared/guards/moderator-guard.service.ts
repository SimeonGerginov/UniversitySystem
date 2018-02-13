import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ModeratorService } from '../services/moderator.service';

@Injectable()
export class ModeratorGuardService implements CanActivate {

  constructor(private router: Router,
              private moderatorService: ModeratorService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     const isUserModerator = this.moderatorService.isUserModerator();

     if (!isUserModerator) {
          this.router.navigate(['/']);
          return false;
     }

     return true;
  }
}
