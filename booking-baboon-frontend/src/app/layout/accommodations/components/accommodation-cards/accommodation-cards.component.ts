import {Component, Input} from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  @Input() accommodations!: Accommodation[];
  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {
  }

}
