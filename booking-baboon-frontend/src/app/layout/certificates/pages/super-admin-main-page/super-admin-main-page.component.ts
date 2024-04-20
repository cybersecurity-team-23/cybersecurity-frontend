import { Component } from '@angular/core';
import {CertificateRequest} from "../../models/certificate-request.model";
import {CertificateNode} from "../../models/certificate-node.model";

@Component({
  selector: 'app-super-admin-main-page',
  templateUrl: './super-admin-main-page.component.html',
  styleUrls: ['./super-admin-main-page.component.css']
})
export class SuperAdminMainPageComponent {
  protected certificateRequests: CertificateRequest[] | undefined = [
    {'someProperty': 'balls'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'},
    {'someProperty': 'egg'}
  ];
  protected certificateNodes: CertificateNode[] | undefined = [
    new CertificateNode('asd', false, []),
    new CertificateNode('asd', false, [
      new CertificateNode('bsd', false, [
        new CertificateNode('csd', false, [])
      ]),
      new CertificateNode('dsd', true, [])
    ]),
    new CertificateNode('asd', false, [
      new CertificateNode('bsd', true, [])
    ]),
    new CertificateNode('asd', false, [
      new CertificateNode('bsd', false, []),
      new CertificateNode('csd', false, [])
    ]),
    new CertificateNode('asd', false, [
      new CertificateNode('bsd', false, [
        new CertificateNode('csd', false, [])
      ]),
      new CertificateNode('dsd', false, []),
      new CertificateNode('asd', false, [
        new CertificateNode('bsd', false, [
          new CertificateNode('csd', false, [])
        ]),
        new CertificateNode('dsd', false, [])
      ])
    ]),
    new CertificateNode('asiodhasdhoi', true, [])
  ];

  protected add(): void { }
}
