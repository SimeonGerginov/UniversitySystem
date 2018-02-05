import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    CookieService
  ],
  declarations: [NavigationComponent],
  exports: [
    NavigationComponent,
    NgbModule,
    CommonModule,
    CookieService
  ]
})
export class SharedModule { }
