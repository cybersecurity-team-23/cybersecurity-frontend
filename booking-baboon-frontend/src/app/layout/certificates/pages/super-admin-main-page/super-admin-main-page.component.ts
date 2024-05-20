import {Component, OnInit} from '@angular/core';
import {CertificateRequest} from "../../models/certificate-request.model";
import {CertificateNode, ICertificateNode} from "../../models/certificate-node.model";
import {CertificateService} from "../../services/certificate.service";
import {SharedService} from "../../../../shared/shared.service";
import {RequestService} from "../../../../shared/request.service";

@Component({
  selector: 'app-super-admin-main-page',
  templateUrl: './super-admin-main-page.component.html',
  styleUrls: ['./super-admin-main-page.component.css']
})
export class SuperAdminMainPageComponent implements OnInit {
  protected certificateRequests: CertificateRequest[] | undefined;
  protected certificateTree: CertificateNode[] | undefined;

  constructor(private certificateService: CertificateService, private sharedService: SharedService,
              private requestService: RequestService) { }

  getCertificateRequests(): void {
    this.requestService.getCertificateRequests().subscribe({
      next: (certificateRequests: CertificateRequest[]): CertificateRequest[] =>
        this.certificateRequests = [...certificateRequests],
      error: (): void => this.sharedService.openSnack('Error reaching the server.'),
    })
  }

  formCertificateTree(iCertificateNode: ICertificateNode): CertificateNode {
    let certificateTree: CertificateNode = new CertificateNode(iCertificateNode);
    if (certificateTree.isTerminal())
      return certificateTree;

    for (let childNode of iCertificateNode.children) {
      certificateTree.children?.push(this.formCertificateTree(childNode));
    }

    return certificateTree;
  }

  ngOnInit(): void {
    this.getCertificateRequests();

    this.certificateService.getCertificateTree().subscribe({
      next: (certificateTree: ICertificateNode): CertificateNode[] =>
        this.certificateTree = [this.formCertificateTree(certificateTree)],
      error: (): void => this.sharedService.openSnack('Error reaching the server.')
    });
  }

  protected add(): void { }
}
