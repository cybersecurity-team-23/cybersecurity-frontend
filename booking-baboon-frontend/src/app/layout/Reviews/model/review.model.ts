import {User} from "../../authentication/models/user.model";


export interface Review {
  id?: number;
  reviewer?: User;
  createdOn?: Date;
  rating?: number;
  comment?: string;
}
