import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModeratorComponent } from './add-moderator/add-moderator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [AddModeratorComponent]
})
export class AdminModule { }
