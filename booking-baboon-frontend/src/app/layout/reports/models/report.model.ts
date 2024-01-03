import {User} from "../../users/models/user.model";

export interface Report{
  message?: string;
  reportee?: User;
  status?: ReportStatus;
  createdOn?: string;
}

export enum ReportStatus{
  Pending,
  Approved,
  Denied
}
