import { Injectable } from '@angular/core';
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CertificateRequest} from "../models/certificate-request.model";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requestControllerRoute: string = environment.pkiHost + 'requests';

  constructor(private httpClient: HttpClient) { }

  getCertificateRequests(): Observable<CertificateRequest[]> {
    return this.httpClient.get<CertificateRequest[]>(this.requestControllerRoute);
  }
}
