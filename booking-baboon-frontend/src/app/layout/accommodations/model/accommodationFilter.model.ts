import {AccommodationType} from "./accommodation-type.model";

export interface AccommodationFilter{
  city?: String;
  checkin?: String;
  checkout?: String;
  guestNum?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: String[];
  type?: AccommodationType;
  minRating?: number;
}
