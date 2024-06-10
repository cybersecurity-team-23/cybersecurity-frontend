import { Injectable } from '@angular/core';
import {environment} from "../env/env";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ICertificateNode} from "../layout/certificates/models/certificate-node.model";
import {Observable} from "rxjs";
import {CertificateValidity} from "../layout/certificates/models/certificate-validity.model";
import {CreateCertificate} from "./models/create-certificate.model";
import {CertificateDistribution} from "./models/certificate-distribution.model";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  certificateControllerRoute: string = environment.pkiHost + 'certificates';

  constructor(private httpClient: HttpClient) { }

  getCertificateTree(): Observable<ICertificateNode> {
    return this.httpClient.get<ICertificateNode>(this.certificateControllerRoute);
  }

  getCertificatesForRecipient(recipientEmail: string): Observable<CertificateDistribution[]> {
    let params: HttpParams = new HttpParams().set('recipient_email', recipientEmail);
    return this.httpClient.get<CertificateDistribution[]>(
      `${this.certificateControllerRoute}/distribute`,
      { params: params }
    );
  }

  isValid(alias: string): Observable<CertificateValidity> {
    let params: HttpParams = new HttpParams().set('alias', alias)
    return this.httpClient.get<CertificateValidity>(
      `${this.certificateControllerRoute}/valid`,
      { params: params }
    );
  }

  create(certificate: CreateCertificate): Observable<CreateCertificate> {
    return this.httpClient.post<CreateCertificate>(this.certificateControllerRoute, certificate);
  }

  delete(alias: string): Observable<void> {
    let params: HttpParams = new HttpParams().set('alias', alias)
    return this.httpClient.delete<void>(this.certificateControllerRoute, { params: params });
  }
}
