import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AddStudentComponent } from './add-student/add-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { ModeratorGuardService } from '../shared/guards/moderator-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'students/all', pathMatch: 'full' },
  { path: 'students/add', component: AddStudentComponent, canActivate: [ ModeratorGuardService ] },
  { path: 'students/all', component: AllStudentsComponent, canActivate: [ ModeratorGuardService ] },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ModeratorRoutingModule { }
