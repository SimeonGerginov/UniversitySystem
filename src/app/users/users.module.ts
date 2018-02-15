import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsersAllComponent } from './users-all/users-all.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AllRequiredCoursesComponent } from './all-required-courses/all-required-courses.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    NgxPaginationModule
  ],
  declarations: [EditProfileComponent, UsersAllComponent, UserDetailComponent, AllRequiredCoursesComponent]
})
export class UsersModule { }
