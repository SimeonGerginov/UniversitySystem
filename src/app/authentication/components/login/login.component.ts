import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public user: User;

  constructor(private userService: UserService, private router: Router) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      });
   }

  ngOnInit() {
    this.user = new User();
  }

  onSubmit() {
    this.userService.login(this.user)
        .subscribe(() => {
          this.router.navigateByUrl(`home`);
        });
  }
}
