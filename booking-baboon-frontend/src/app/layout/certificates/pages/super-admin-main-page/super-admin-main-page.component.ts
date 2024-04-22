import {Component, OnInit} from '@angular/core';
import {CertificateRequest} from "../../models/certificate-request.model";
import {CertificateNode, ICertificateNode} from "../../models/certificate-node.model";
import {CertificateService} from "../../services/certificate.service";
import {SharedService} from "../../../../shared/shared.service";

@Component({
  selector: 'app-super-admin-main-page',
  templateUrl: './super-admin-main-page.component.html',
  styleUrls: ['./super-admin-main-page.component.css']
})
export class SuperAdminMainPageComponent implements OnInit {
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
  protected certificateTree: CertificateNode[] = [];

  constructor(private certificateService: CertificateService, private sharedService: SharedService) { }

  formCertificateTree(iCertificateNode: ICertificateNode): CertificateNode {
    let certificateTree: CertificateNode =
      new CertificateNode(iCertificateNode.someData, iCertificateNode.isEndEntity, true);
    if (certificateTree.isTerminal())
      return certificateTree;

    for (let childNode of iCertificateNode.children) {
      certificateTree.children?.push(this.formCertificateTree(childNode));
    }

    return certificateTree;
  }

  ngOnInit(): void {
    this.certificateService.getCertificateTree().subscribe({
      next: (certificateTree: ICertificateNode): number =>
        this.certificateTree.push(this.formCertificateTree(certificateTree)),
      error: (): void => this.sharedService.openSnack('Error reaching the server.')
    });
  }

  protected add(): void { }
}
