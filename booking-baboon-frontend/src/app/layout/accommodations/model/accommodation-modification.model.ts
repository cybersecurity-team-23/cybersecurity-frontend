import {Location} from "./location.model";
import {Amenity} from "./amenity.model";
import {AvailablePeriod} from "./available-period.model";
import {AccommodationType} from "./accommodation-type.model";
import {ImageResponse} from "../../images/imageResponse.model";
import {Host} from "../../authentication/models/host.model";
import {Accommodation} from "./accommodation.model";
import {AccommodationModificationStatus} from "./accommodation-modification-status";
import {AccommodationModificationType} from "./accommodation-modification-type";


export interface AccommodationModification {
  id?: number;
  accommodation?: Accommodation;

  name?: string;
  description?: string;
  host?:  Host;
  location?: Location;
  amenities?: Amenity[];
  availablePeriods?: AvailablePeriod[];
  minGuests?: number;
  maxGuests?: number;
  isPricingPerPerson?: boolean;
  type?: AccommodationType;
  isAutomaticallyAccepted?: boolean;
  images?: ImageResponse[];
  requestDate?: Date;
  status?: AccommodationModificationStatus;
  requestType?: AccommodationModificationType;
}
