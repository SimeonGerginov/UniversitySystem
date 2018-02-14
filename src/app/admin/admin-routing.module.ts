import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AddModeratorComponent } from './add-moderator/add-moderator.component';
import { AdminGuardService } from '../shared/guards/admin-guard.service';
import { AllModeratorsComponent } from './all-moderators/all-moderators.component';
import { EditModeratorComponent } from './edit-moderator/edit-moderator.component';
import { DeleteModeratorComponent } from './delete-moderator/delete-moderator.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'add', component: AddModeratorComponent, canActivate: [ AdminGuardService ] },
  { path: 'all', component: AllModeratorsComponent, canActivate: [ AdminGuardService ] },
  { path: 'edit/:id', component: EditModeratorComponent, canActivate: [ AdminGuardService ] },
  { path: 'delete/:id', component: DeleteModeratorComponent, canActivate: [ AdminGuardService ] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
