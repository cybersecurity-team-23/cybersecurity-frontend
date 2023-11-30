import {User} from "./user.model";
import {NotificationType} from "./NotificationType.module";
import {Accommodation} from "../../accommodations/model/accommodation.model";

export interface Guest extends User{
  ignoredNotifications?: NotificationType[]
  favorites?: Accommodation[]
}
