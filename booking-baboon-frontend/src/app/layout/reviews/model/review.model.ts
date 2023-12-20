import {User} from "../../users/models/user.model";


export interface Review {
  id?: number;
  reviewer?: User;
  createdOn?: string;
  rating?: number;
  comment?: string;
}
