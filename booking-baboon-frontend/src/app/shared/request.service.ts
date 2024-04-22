import { Injectable } from '@angular/core';
import {environment} from "../env/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CertificateRequest} from "../layout/certificates/models/certificate-request.model";
import {CreateRequest} from "../layout/users/models/create-request.model";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requestControllerRoute: string = environment.pkiHost + 'requests';

  constructor(private httpClient: HttpClient) { }

  getCertificateRequests(): Observable<CertificateRequest[]> {
    return this.httpClient.get<CertificateRequest[]>(this.requestControllerRoute);
  }

  createRequest(createRequest: CreateRequest): Observable<CreateRequest> {
    return this.httpClient.post<CreateRequest>(this.requestControllerRoute, createRequest);
  }

  rejectCertificateRequest(id: number): Observable<CertificateRequest> {
    return this.httpClient.put<CertificateRequest>(`${this.requestControllerRoute}/reject/${id}`, null);
  }
}
