import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { AddStudentComponent } from './add-student/add-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AddLecturerComponent } from './add-lecturer/add-lecturer.component';
import { AllLecturersComponent } from './all-lecturers/all-lecturers.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    ModeratorRoutingModule,
    NgxPaginationModule
  ],
  declarations: [AddStudentComponent, AllStudentsComponent, AddLecturerComponent, AllLecturersComponent]
})
export class ModeratorModule { }
