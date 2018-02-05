import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms/';

import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    CookieService,
    ReactiveFormsModule
  ],
  declarations: [NavigationComponent],
  exports: [
    NavigationComponent,
    NgbModule,
    CommonModule,
    CookieService,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
