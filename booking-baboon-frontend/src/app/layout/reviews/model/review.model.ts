import {User} from "../../users/models/user.model";
import {ReviewStatus} from "./review-status";


export interface Review {
  id?: number;
  reviewer?: User;
  createdOn?: string;
  rating?: number;
  comment?: string;
  status?: ReviewStatus;
}
