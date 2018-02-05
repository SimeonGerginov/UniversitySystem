import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule
  ],
  declarations: [NavigationComponent],
  exports: [
    NavigationComponent,
    NgbModule,
    CommonModule
  ]
})
export class SharedModule { }
