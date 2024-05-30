import {X500Name} from "./x-500-name.model";

export interface CreateCertificate {
  certificateType: string,
  caAlias: string,
  subject: X500Name,
  domain: string | null
}
