import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AddModeratorComponent } from './add-moderator/add-moderator.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ModeratorDetailsComponent } from './moderator-details/moderator-details.component';
import { AllModeratorsComponent } from './all-moderators/all-moderators.component';
import { EditModeratorComponent } from './edit-moderator/edit-moderator.component';
import { DeleteModeratorComponent } from './delete-moderator/delete-moderator.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
    NgxPaginationModule
  ],
  declarations: [AddModeratorComponent, ModeratorDetailsComponent, AllModeratorsComponent, EditModeratorComponent, DeleteModeratorComponent]
})
export class AdminModule { }
