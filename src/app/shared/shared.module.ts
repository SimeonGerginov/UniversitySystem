import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    DashboardComponent,
    HeaderComponent
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
