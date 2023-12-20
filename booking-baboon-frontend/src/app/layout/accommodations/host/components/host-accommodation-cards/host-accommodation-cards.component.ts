import {Component, Input} from '@angular/core';
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AccommodationService} from "../../../shared/services/accommodation.service";

@Component({
  selector: 'app-host-accommodation-cards',
  templateUrl: './host-accommodation-cards.component.html',
  styleUrls: ['./host-accommodation-cards.component.css']
})
export class HostAccommodationCardsComponent {
  @Input() accommodations!: Accommodation[];
  constructor(private service: AccommodationService) {
  }
}
