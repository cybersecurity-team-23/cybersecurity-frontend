import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../models/user.model";
import {Observable, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserEditRequest} from "../../models/userEditRequest";
import {Guest} from "../../models/guest.model";
import {Host} from "../../models/host.model";
import {HostService} from "../../../../services/user/host.service";
import {GuestService} from "../../../../services/user/guest.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
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
  guest?: Guest;
  host?: Host;

  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;

  wrongPassword?: boolean = false;
  errorLabel?: string = ""

  constructor(private route: ActivatedRoute, private userService: UserService, private hostService: HostService, private guestService: GuestService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userEmail = params['userEmail'];
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";

      // Now you can use the userEmail to fetch the user details
      this.userService.getProfile(userEmail)
        .pipe(
          tap((user: User) => {
            this.user = user;
            // Additional logic if needed
          })
        )
        .subscribe();

      if (decodedToken.role[0].authority === "HOST") {
        this.hostService.getProfile(userEmail)
          .pipe(
            tap((host: Host) => {
              this.host = host;
              // Additional logic if needed
            })
          )
          .subscribe();
      }

      if (decodedToken.role[0].authority === "GUEST") {
        this.guestService.getProfile(userEmail)
          .pipe(
            tap((guest: Guest) => {
              this.guest = guest;
              console.log(guest);
              // Additional logic if needed
            })
          )
          .subscribe();
      }

    });

  }

  saveChanges(): void {
    if (this.user != undefined) {

      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);
      if (decodedToken.role[0].authority === "HOST" && this.host != undefined) {

          this.host.id = this.user.id;
          this.host.firstName = this.user.firstName;
          this.host.lastName = this.user.lastName;
          this.host.phoneNumber = this.user.phoneNumber;
          this.host.address = this.user.address;
          this.host.email = this.user.email;
          // this.host.jwt = accessToken;
          this.hostService.update(this.host);
      }
      else if (decodedToken.role[0].authority === "GUEST" && this.guest != undefined) {

          this.guest.id = this.user.id;
          this.guest.firstName = this.user.firstName;
          this.guest.lastName = this.user.lastName;
          this.guest.phoneNumber = this.user.phoneNumber;
          this.guest.address = this.user.address;
          this.guest.email = this.user.email;
          this.guestService.update(this.guest);
      }

      if (this.currentPassword !== "") {
        if (this.newPassword === this.confirmPassword && this.user !== undefined) {
          this.errorLabel = "";
          this.userService.changePassword(this.user.id, this.currentPassword, this.newPassword)
            .subscribe(
              (response) => {
                // Handle success case here
                this.errorLabel = "";
              },
              (error) => {
                // Handle error case here
                this.errorLabel = "Wrong current password";
              }
            );
        } else {
          this.errorLabel = "Passwords don't match!";
        }
      }

    }
  }
}
