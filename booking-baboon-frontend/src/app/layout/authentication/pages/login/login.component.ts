import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Accommodation} from "../../../accommodations/model/accommodation.model";
import {User} from "../../models/user.model";

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
  user!: User;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

  logIn(): void {
    if(this.authService.validateUser(this.loginForm.value.username,this.loginForm.value.password).subscribe({
      next: (data: User) => { this.user = data },
      error: (_) => {console.log("Error!")}
    })!==null){
      if (this.user.id != null) {
        this.authService.login(this.authService.checkUserType(this.user.id))
      }
    }else{
      this.loginFailed = true;
    }
  }

}
