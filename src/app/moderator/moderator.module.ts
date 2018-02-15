import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { AddStudentComponent } from './add-student/add-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AddLecturerComponent } from './add-lecturer/add-lecturer.component';
import { AllLecturersComponent } from './all-lecturers/all-lecturers.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AllRequiredCoursesComponent } from './all-required-courses/all-required-courses.component';
import { AllOptionalCoursesComponent } from './all-optional-courses/all-optional-courses.component';
import { AddStudentToCourseComponent } from './add-student-to-course/add-student-to-course.component';
import { AddLecturerToCourseComponent } from './add-lecturer-to-course/add-lecturer-to-course.component';
import { AddMarkToStudentComponent } from './add-mark-to-student/add-mark-to-student.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    ModeratorRoutingModule,
    NgxPaginationModule
  ],
  declarations: [AddStudentComponent, AllStudentsComponent, AddLecturerComponent,
    AllLecturersComponent, AddCourseComponent, AllRequiredCoursesComponent,
    AllOptionalCoursesComponent, AddStudentToCourseComponent, AddLecturerToCourseComponent, AddMarkToStudentComponent, CourseDetailsComponent]
})
export class ModeratorModule { }
