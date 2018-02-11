import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AddModeratorComponent } from './add-moderator/add-moderator.component';
import { AdminGuardService } from '../shared/guards/admin-guard.service';
import { AllModeratorsComponent } from './all-moderators/all-moderators.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'add', component: AddModeratorComponent, canActivate: [AdminGuardService] },
  { path: 'all', component: AllModeratorsComponent, canActivate: [AdminGuardService] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
