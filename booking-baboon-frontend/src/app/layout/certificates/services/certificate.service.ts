import { Injectable } from '@angular/core';
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {ICertificateNode} from "../models/certificate-node.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  certificateControllerRoute: string = environment.pkiHost + 'certificates';

  constructor(private httpClient: HttpClient) { }

  getCertificateTree(): Observable<ICertificateNode> {
    return this.httpClient.get<ICertificateNode>(this.certificateControllerRoute);
  }
}
