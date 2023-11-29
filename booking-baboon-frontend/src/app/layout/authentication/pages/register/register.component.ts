import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userType: string = 'unauthorized';

  registerPersonalForm: FormGroup = this.formBuilder.group({
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
  },{validators: this.matchValidator('password','passwordConfirmation')})
  hide: boolean = true;
  passwordMatch: boolean = false;
  isEditable: boolean = true;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

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

  register() {
    this.isEditable = false;
  }
}
