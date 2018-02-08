import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsersAllComponent } from './users-all/users-all.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [EditProfileComponent, UsersAllComponent]
})
export class UsersModule { }
