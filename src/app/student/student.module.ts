import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddHomeworkToCourseComponent } from './add-homework-to-course/add-homework-to-course.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [AddHomeworkToCourseComponent]
})
export class StudentModule { }
