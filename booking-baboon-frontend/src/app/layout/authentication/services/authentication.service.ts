import {Host, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../../env/env";
import {Admin} from "../models/admin.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userType: string = 'unauthorized';
  private user!: User;
  constructor(private httpClient: HttpClient) { }

  login(userType: string) {
    this.userType = userType;
  }

  validateUser(username: string, password: string):Observable<User>{
    return this.httpClient.get<User>(environment.apiHost+'users/login')
  }

  getAdmin(id: number):Observable<Admin>{
    return this.httpClient.get<Admin>(environment.apiHost+'admin/'+id.toString())
  }

  getHost(id: number):Observable<Host>{
    return this.httpClient.get<Host>(environment.apiHost+'hosts/'+id.toString())
  }

  checkUserType(id: number):string{
    if(this.getAdmin(id).subscribe()!==null){
      return 'admin';
    }
    if(this.getHost(id).subscribe()!==null){
      return 'host';
    }
    return 'guest';
  }

  logout() {
    this.userType = 'unauthorized';
  }
  getUserType(): string {
    return this.userType;
  }



  // getUserType(): Observable<string> {
  //   return this.http.get<string>('/api/user-type');
  // }
}

