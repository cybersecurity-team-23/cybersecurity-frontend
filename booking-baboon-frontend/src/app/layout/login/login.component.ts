import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userType: string = 'unauthorized';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  hide: boolean = true;
  loginFailed: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

  logIn(): void {
    if(this.loginForm.value.username === "guest"){
      this.router.navigate(['/guest']);
    }else if(this.loginForm.value.username === "host"){
      this.router.navigate(['/host']);
    }else if(this.loginForm.value.username === "admin"){
      this.router.navigate(['/admin']);
    }else{
      this.loginFailed = true;
    }
  }

}
