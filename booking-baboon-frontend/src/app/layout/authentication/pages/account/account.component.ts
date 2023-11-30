import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  userType: string = 'guest';
  editModes: { [key: string]: boolean } = {
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    address: true,
    currentPassword: true,
    newPassword: true,
    confirmPassword: true,
  };

  isReadOnly(key: string): boolean {
    return this.editModes[key];
  }

  toggleEditMode(key : string) {
    this.editModes[key] = !this.editModes[key];
  }

  user?: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    console.log(this.user)
    this.route.params.subscribe((params) => {
      const id = +params['userId']

      this.userService.getUser(id).subscribe({
        next: (data: User) => { this.user = data
        console.log(this.user)},
        error: (_) => {console.log("Error!")}
      })
    })
  }
}
