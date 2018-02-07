import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LogoutGuardService } from '../shared/guards/logout-guard.service';

const routes: Routes = [
  { path: 'edit', component: EditProfileComponent, canActivate: [LogoutGuardService] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { }
