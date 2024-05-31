export interface CertificateRequest {
  id: number,
  email: string,
  commonName: string,
  organisationalUnit: string,
  organisation: string,
  location: string,
  state: string,
  country: string,
  status: string,
}
