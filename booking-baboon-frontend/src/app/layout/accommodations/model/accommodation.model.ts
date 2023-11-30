import {Location} from "./location.model";
import {Amenity} from "./amenity.model";
import {AvailablePeriod} from "./available-period.model";

enum AccommodationType {
  Hotel,
  Hostel,
  BedAndBreakfast,
  Resort,
  Motel,
  Apartment,
  House,
  Room,
  Tent
}

export interface Accommodation {
  id?: number;
  name?: string;
  description?: string;
  // host:  Host;
  location?: Location;
  amenities?: Amenity[];
  availablePeriods?: AvailablePeriod[];
  minGuests?: number;
  maxGuests?: number;
  isPricingPerPerson?: boolean;
  type?: AccommodationType;
  isAutomaticallyAccepted?: boolean;

}
