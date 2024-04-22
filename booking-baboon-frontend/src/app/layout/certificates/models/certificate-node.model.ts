export interface ICertificateNode {
  someData: string,
  isEndEntity: boolean,
  isRoot: boolean,
  children: ICertificateNode[]
}

export class CertificateNode {
  private readonly _someData: string;
  private readonly _isEndEntity: boolean;
  private readonly _isRoot: boolean;
  private readonly _children: CertificateNode[];

  constructor(someData: string, isEndEntity: boolean, isRoot: boolean) {
    this._someData = someData;
    this._isEndEntity = isEndEntity;
    this._isRoot = isRoot;
    this._children = [];
  }

  get someData(): string {
    return this._someData;
  }

  get isEndEntity(): boolean {
    return this._isEndEntity;
  }

  get isRoot(): boolean {
    return this._isRoot;
  }

  get children(): CertificateNode[] | undefined {
    return this._children;
  }

  isTerminal(): boolean {
    return this.children?.length === 0;
  }
}
