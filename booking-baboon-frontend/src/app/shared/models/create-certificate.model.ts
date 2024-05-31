import {X500Name} from "../../layout/certificates/models/x-500-name.model";

export interface CreateCertificate {
  certificateType: string,
  caAlias: string,
  subject: X500Name,
  domain: string | null
}
