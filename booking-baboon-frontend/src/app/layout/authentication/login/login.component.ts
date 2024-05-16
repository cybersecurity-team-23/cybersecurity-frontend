import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {User} from "../../users/models/user.model";
import {Login} from "../../../infrastructure/auth/model/login.model";
import {AuthResponse} from "../../../infrastructure/auth/model/auth-response.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {SocketService} from "../../../shared/notifications/socket.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private socketService: SocketService) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  hide: boolean = true;
  loginFailed: boolean = false;

  recaptchaResponse: string | null = null;

  resolved(captchaResponse: string | null) {
    this.recaptchaResponse = captchaResponse;
  }

  login(): void {

    if(this.loginForm.valid) {
      if (!this.recaptchaResponse) {
        alert('Please resolve the captcha bro');
        return;
      }
      const login: Login = {
        email: this.loginForm.value.username || "",
        password: this.loginForm.value.password || "",
        recaptchaToken: this.recaptchaResponse
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.jwt);
          this.authService.setUser()
          if (this.authService.getRole() !== 'SUPERADMIN') {
            this.initializeWebSocket();
            this.router.navigate(['accommodations'])
          }
          else {
            this.router.navigate(['super-admin']).then();
          }
        },error:() => {
          this.loginFailed = true;
        }
      })
    }
  }

  initializeWebSocket(){
    this.socketService.initializeWebSocketConnection();
    // this.socketService.openSocket()
  }

}
