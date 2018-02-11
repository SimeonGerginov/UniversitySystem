import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AddModeratorComponent } from './add-moderator/add-moderator.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [AddModeratorComponent]
})
export class AdminModule { }
