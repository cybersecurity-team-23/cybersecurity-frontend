import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {User} from "../../users/models/user.model";
import {Host} from "../../users/models/host.model";
import {Guest} from "../../users/models/guest.model";
import {Component} from "@angular/core";
import {NotificationType} from "../../users/models/NotificationType.module";
import {AuthService} from "../../../infrastructure/auth/auth.service";




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerPersonalForm: FormGroup = this.formBuilder.group({
    toggleHost: new FormControl('',),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required])
  })
  registerContactForm: FormGroup = this.formBuilder.group({
    email: new FormControl('',[Validators.email, Validators.required]),
    phone: new FormControl('',[Validators.pattern("^\\+(?:[0-9]●?){6,14}[0-9]$"),Validators.required])
  })

  registerPasswordForm: FormGroup = this.formBuilder.group({
    password: new FormControl('',[Validators.required]),
    passwordConfirmation: new FormControl('',[Validators.required])
  },{validators: [this.matchValidator('password','passwordConfirmation'), this.passwordValidator('password', 'passwordConfirmation')]})
  hide: boolean = true;
  passwordMatch: boolean = false;
  passwordValid: boolean = false;
  isEditable: boolean = true;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = {confirmedValidator: 'Passwords do not match.'};
        this.passwordMatch=false;
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        this.passwordMatch = true;
        return null;
      }
    }
  }

  isPasswordValid(password: string) : boolean {
    let upperCaseCount: number = 0;
    let lowerCaseCount: number = 0;
    let numberCount: number = 0;
    let nonAlphaCount: number = 0;
    for (let ch of password) {
      if (ch >= 'a' && ch <= 'z') lowerCaseCount += 1;
      else if (ch >= 'A' && ch <= 'Z') upperCaseCount += 1;
      else if (ch >= '0' && ch <= '9') numberCount += 1;
      else nonAlphaCount += 1;
    }

    let categoryCount: number = 0;
    if (upperCaseCount > 0) categoryCount += 1;
    if (lowerCaseCount > 0) categoryCount += 1;
    if (numberCount > 0) categoryCount += 1;
    if (nonAlphaCount > 0) categoryCount += 1;

    return categoryCount >= 3 && password.length >= 8 && password.length <= 64;
  }

  passwordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedPassword']) {
        return null;
      }

      if (!this.isPasswordValid(control!.value || "")) {
        const error = {confirmedPassword: 'Password is not valid'};
        this.passwordValid=false;
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        this.passwordValid = true;
        return null;
      }
    }
  }

  recaptchaResponse: string | null = null;

  resolved(captchaResponse: string | null) {
    this.recaptchaResponse = captchaResponse;
  }

  register() {
      if (!this.recaptchaResponse) {
        alert('Please resolve the captcha bro');
        return;
      }

    this.isEditable = false;
    if(this.registerPersonalForm.value.toggleHost){
      let user: Host = {
        address: this.registerPersonalForm.value.address,
        email: this.registerContactForm.value.email,
        firstName: this.registerPersonalForm.value.firstName,
        lastName: this.registerPersonalForm.value.lastName,
        password: this.registerPasswordForm.value.password,
        phoneNumber: this.registerContactForm.value.phone,
        role: 2,

        recaptchaToken: this.recaptchaResponse
      };

      this.authService.registerHost(user).subscribe();
    }else{
      let user: Guest = {
        address: this.registerPersonalForm.value.address,
        email: this.registerContactForm.value.email,
        firstName: this.registerPersonalForm.value.firstName,
        lastName: this.registerPersonalForm.value.lastName,
        password: this.registerPasswordForm.value.password,
        phoneNumber: this.registerContactForm.value.phone,
        role: 1,

        recaptchaToken: this.recaptchaResponse
      };

      console.log(user)
      this.authService.registerGuest(user).subscribe(data=>{
        next: console.log(data)
      });
    }
  }


}
