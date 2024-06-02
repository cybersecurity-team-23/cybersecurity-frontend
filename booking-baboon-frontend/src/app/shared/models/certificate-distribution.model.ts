export interface CertificateDistribution {
  issuerEmail: string,
  certificateSerialNumber: string,
  base64EncodedCertificate: string,
  certificateSignature: string,
  signatureAlgorithm: string,
  signerPublicKey: string,
}
