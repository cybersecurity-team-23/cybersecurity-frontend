export interface CertificateRequest {
  id: number,
  commonName: string,
  surname: string,
  givenName: string,
  organisation: string,
  organisationalUnit: string,
  country: string,
  email: string,
  uid: number,
  status: string,
}
