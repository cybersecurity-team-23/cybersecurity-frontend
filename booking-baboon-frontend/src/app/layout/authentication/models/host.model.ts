import {User} from "./user.model";
import {NotificationType} from "./NotificationType.module";

export interface Guest extends User{
  ignoredNotifications: NotificationType[]
}
