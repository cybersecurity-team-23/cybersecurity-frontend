import {Review} from "./review.model";
import {Accommodation} from "../../accommodations/model/accommodation.model";
import {Host} from "../../authentication/models/host.model";

export interface HostReview extends Review {
  reviewedHost?: Host;
}
