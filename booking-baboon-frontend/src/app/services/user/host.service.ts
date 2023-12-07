import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {Host} from "../../layout/authentication/models/host.model";

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Host[]> {
    return this.httpClient.get<Host[]>(environment.apiHost + 'hosts')
  }

  get(id: number): Observable<Host> {
    return this.httpClient.get<Host>(environment.apiHost + 'hosts/' + id)
  }
  getByEmail(email: string): Observable<Host> {
    return this.httpClient.get<Host>(environment.apiHost + 'hosts/email/' + email)
  }

  getProfile(email: string): Observable<Host> {
    return this.httpClient.get<Host>(environment.apiHost + 'hosts/profile/' + email)
  }

  delete(id: number | undefined): Observable<Host> {
    return this.httpClient.delete(environment.apiHost + 'hosts/' + id)
  }

  update(host: Host) {
    return this.httpClient.put<Host>(environment.apiHost + 'hosts/', host)
      .subscribe();
  }


  // add(host.model: Host): Observable<Host> {
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers if needed
//     }
  //   return this.httpClient.post<Host>(environment.apiHost + 'host.models', host.model)
  // }


}
