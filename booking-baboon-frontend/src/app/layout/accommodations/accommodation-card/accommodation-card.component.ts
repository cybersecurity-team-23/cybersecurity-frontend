import {Component, Input} from '@angular/core';
import {Accommodation} from "../model/accommodation.model";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  @Input()
  accommodation!: Accommodation;
}
