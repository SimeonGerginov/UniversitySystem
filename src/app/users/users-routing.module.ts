import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LogoutGuardService } from '../shared/guards/logout-guard.service';
import { UsersAllComponent } from './users-all/users-all.component';
import { AllRequiredCoursesComponent } from './all-required-courses/all-required-courses.component';

const routes: Routes = [
  { path: 'edit', component: EditProfileComponent, canActivate: [ LogoutGuardService ] },
  { path: 'all', component: UsersAllComponent },
  { path: 'courses/required', component: AllRequiredCoursesComponent, canActivate: [ LogoutGuardService ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { }
