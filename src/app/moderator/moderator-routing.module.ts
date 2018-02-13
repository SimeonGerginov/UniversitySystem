import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AddStudentComponent } from './add-student/add-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { ModeratorGuardService } from '../shared/guards/moderator-guard.service';
import { AddLecturerComponent } from './add-lecturer/add-lecturer.component';
import { AllLecturersComponent } from './all-lecturers/all-lecturers.component';
import { AddCourseComponent } from './add-course/add-course.component';

const routes: Routes = [
  { path: '', redirectTo: 'students/all', pathMatch: 'full' },
  { path: 'students/add', component: AddStudentComponent, canActivate: [ ModeratorGuardService ] },
  { path: 'students/all', component: AllStudentsComponent, canActivate: [ ModeratorGuardService ] },
  { path: 'lecturers/add', component: AddLecturerComponent, canActivate: [ ModeratorGuardService ]},
  { path: 'lecturers/all', component: AllLecturersComponent, canActivate: [ ModeratorGuardService ]},
  { path: 'courses/add', component: AddCourseComponent, canActivate: [ ModeratorGuardService ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ModeratorRoutingModule { }
