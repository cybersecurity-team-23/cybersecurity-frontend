import {Component, Input} from '@angular/core';
import {CertificateDistribution} from "../../../../shared/models/certificate-distribution.model";

@Component({
  selector: 'app-recipient-certificate',
  templateUrl: './recipient-certificate.component.html',
  styleUrls: ['./recipient-certificate.component.css']
})
export class RecipientCertificateComponent {
  @Input() certificateDistribution: CertificateDistribution | undefined;
  @Input() index: number | undefined;

  downloadSignerPublicKey(): void {
    let element: HTMLAnchorElement = document.createElement('a');
    element
      .setAttribute(
        'href',
        'data:text/plain;charset=UTF-8,' + encodeURIComponent(
          this.certificateDistribution?.signerPublicKey ?? ''
        )
      );
    element.setAttribute('download', `publicKey${this.index}.pem`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  downloadCertificateSignature(): void {
    let element: HTMLAnchorElement = document.createElement('a');
    element
      .setAttribute(
        'href',
        'data:text/plain;charset=UTF-8,' + encodeURIComponent(
          this.certificateDistribution?.certificateSignature ?? ''
        )
      );
    element.setAttribute('download', `certificateSignature${this.index}.txt`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  downloadCertificate(): void {
    let element: HTMLAnchorElement = document.createElement('a');
    element
      .setAttribute(
        'href',
        'data:text/plain;charset=UTF-8,' + encodeURIComponent(
          this.certificateDistribution?.base64EncodedCertificate ?? ''
        )
      );
    element.setAttribute('download', `certificate${this.index}.crt`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
