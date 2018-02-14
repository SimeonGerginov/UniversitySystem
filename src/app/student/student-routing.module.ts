import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AddHomeworkToCourseComponent } from './add-homework-to-course/add-homework-to-course.component';
import { AuthGuardService } from '../shared/guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'homeworks/:courseId', pathMatch: 'full' },
  { path: 'homeworks/:courseId', component: AddHomeworkToCourseComponent, canActivate: [ AuthGuardService ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class StudentRoutingModule { }
