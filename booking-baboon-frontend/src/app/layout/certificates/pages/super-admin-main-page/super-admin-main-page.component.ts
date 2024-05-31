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

  protected caAliases: string[] | undefined;

  constructor(private certificateService: CertificateService, private sharedService: SharedService,
              private requestService: RequestService) { }

  getCertificateRequests(): void {
    this.requestService.getCertificateRequests().subscribe({
      next: (certificateRequests: CertificateRequest[]): CertificateRequest[] =>
        this.certificateRequests = [...certificateRequests],
      error: (): void => this.sharedService.openSnack('Error reaching the server.'),
    })
  }

  private getCaAliases(certificateTree: CertificateNode[] | undefined): void {
    certificateTree?.forEach((certificateNode: CertificateNode) => {
      if (certificateNode.isTerminal())
        this.caAliases?.push(certificateNode.alias());

      this.getCaAliases(certificateNode.children);
    });
  }

  getCertificateTree(): void {
    this.certificateService.getCertificateTree().subscribe({
      next: (certificateTree: ICertificateNode): void => {
        this.certificateTree = [new CertificateNode(certificateTree)];
        this.caAliases = [];
        this.getCaAliases(this.certificateTree);
      },
      error: (): void => this.sharedService.openSnack('Error reaching the server.')
    });
  }

  ngOnInit(): void {
    this.getCertificateRequests();

    this.getCertificateTree();
  }

  protected add(): void { }
}
