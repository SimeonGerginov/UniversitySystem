import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms/';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    AuthenticationRoutingModule
  ],
  declarations: [RegisterComponent]
})
export class AuthenticationModule { }
