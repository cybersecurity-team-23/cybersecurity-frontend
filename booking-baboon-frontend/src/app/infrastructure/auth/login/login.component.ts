import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Accommodation} from "../../../layout/accommodations/model/accommodation.model";
import {User} from "../../../layout/authentication/models/user.model";
import {Login} from "../model/login.model";
import {AuthResponse} from "../model/auth-response.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  hide: boolean = true;
  loginFailed: boolean = false;

  login(): void {

    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.jwt);
          this.authService.setUser()
          this.router.navigate(['accommodations'])
        },error:() => {
          this.loginFailed = true;
        }
      })
    }
  }

}
