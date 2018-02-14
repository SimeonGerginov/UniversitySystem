import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },

  {
    path: 'user',
    loadChildren: './users/users.module#UsersModule'
  },

  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },

  {
    path: 'moderator',
    loadChildren: './moderator/moderator.module#ModeratorModule'
  },

  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
