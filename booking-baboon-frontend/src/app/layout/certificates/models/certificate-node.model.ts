import {X500Name} from "./x-500-name.model";

export interface ICertificateNode {
  serialNumber: string,
  signatureAlgorithm: string,
  issuer: X500Name,
  validFrom: Date,
  validTo: Date,
  subject: X500Name,
  extensions: string[],
  endEntity: boolean,
  root: boolean,
  children: ICertificateNode[],
}

export class CertificateNode {
  private readonly _serialNumber: string;
  private readonly _signatureAlgorithm: string;
  private readonly _issuer: X500Name;
  private readonly _validFrom: Date;
  private readonly _validTo: Date;
  private readonly _subject: X500Name;
  private readonly _extensions: string[];
  private readonly _endEntity: boolean;
  private readonly _root: boolean;
  private readonly _children: CertificateNode[];

  constructor(iCertificateNode: ICertificateNode) {
    this._serialNumber = iCertificateNode.serialNumber;
    this._signatureAlgorithm = iCertificateNode.signatureAlgorithm;
    this._issuer = iCertificateNode.issuer;
    this._validFrom = iCertificateNode.validFrom;
    this._validTo = iCertificateNode.validTo;
    this._subject = iCertificateNode.subject;
    this._extensions = iCertificateNode.extensions;
    this._endEntity = iCertificateNode.endEntity;
    this._root = iCertificateNode.root;
    this._children = iCertificateNode.children.map(child => new CertificateNode(child));
  }

  get serialNumber(): string {
    return this._serialNumber;
  }

  get signatureAlgorithm(): string {
    return this._signatureAlgorithm;
  }

  get issuer(): X500Name {
    return this._issuer;
  }

  get validFrom(): Date {
    return this._validFrom
  }

  get validTo(): Date {
    return this._validTo
  }

  get subject(): X500Name {
    return this._subject
  }

  get extensions(): string[] {
    return this._extensions;
  }

  get endEntity(): boolean {
    return this._endEntity;
  }

  get root(): boolean {
    return this._root;
  }

  get children(): CertificateNode[] | undefined {
    return this._children;
  }

  alias(): string {
    return `${this.issuer.email}|${this.serialNumber}`
  }

  isTerminal(): boolean {
    return this.children?.length === 0;
  }
}
