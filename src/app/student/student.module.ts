import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddHomeworkToCourseComponent } from './add-homework-to-course/add-homework-to-course.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [
    SharedModule,
    StudentRoutingModule
  ],
  declarations: [AddHomeworkToCourseComponent]
})
export class StudentModule { }
