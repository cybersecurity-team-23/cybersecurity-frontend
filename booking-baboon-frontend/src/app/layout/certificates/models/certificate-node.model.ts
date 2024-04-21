export class CertificateNode {
  private readonly _someData: string;
  private readonly _isEndEntity: boolean;
  private readonly _children: CertificateNode[];

  constructor(someData: string, isEndEntity: boolean, children: CertificateNode[]) {
    this._someData = someData;
    this._isEndEntity = isEndEntity;
    this._children = children;
  }

  get someData(): string {
    return this._someData;
  }

  get isEndEntity(): boolean {
    return this._isEndEntity;
  }

  get children(): CertificateNode[] | undefined {
    return this._children;
  }

  isTerminal(): boolean {
    return this.children?.length === 0;
  }
}
