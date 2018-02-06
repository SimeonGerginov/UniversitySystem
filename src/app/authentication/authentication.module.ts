import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AuthenticationRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent, LogoutComponent]
})
export class AuthenticationModule { }
