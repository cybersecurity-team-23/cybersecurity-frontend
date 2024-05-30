import { Injectable } from '@angular/core';
import {environment} from "../../../env/env";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ICertificateNode} from "../models/certificate-node.model";
import {Observable} from "rxjs";
import {CertificateValidity} from "../models/certificate-validity.model";
import {CreateCertificate} from "../models/create-certificate.model";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  certificateControllerRoute: string = environment.pkiHost + 'certificates';

  constructor(private httpClient: HttpClient) { }

  getCertificateTree(): Observable<ICertificateNode> {
    return this.httpClient.get<ICertificateNode>(this.certificateControllerRoute);
  }

  isValid(alias: string): Observable<CertificateValidity> {
    let params = new HttpParams().set('alias', alias)
    return this.httpClient.get<CertificateValidity>(
      `${this.certificateControllerRoute}/valid`,
      { params: params}
    );
  }

  create(certificate: CreateCertificate): Observable<CreateCertificate> {
    return this.httpClient.post<CreateCertificate>(this.certificateControllerRoute, certificate);
  }
}
