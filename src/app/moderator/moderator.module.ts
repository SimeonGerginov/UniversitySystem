import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModeratorRoutingModule } from './moderator-routing.module';
import { AddStudentComponent } from './add-student/add-student.component';

@NgModule({
  imports: [
    SharedModule,
    ModeratorRoutingModule
  ],
  declarations: [AddStudentComponent]
})
export class ModeratorModule { }
