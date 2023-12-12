import {Component, Input} from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";
import {AccommodationModification} from "../../model/accommodation-modification.model";
import {
  AccommodationModificationService
} from "../../../../services/accommodation/accommodation-modification.service.service";

@Component({
  selector: 'app-accommodation-modification-cards',
  templateUrl: './accommodation-modification-cards.component.html',
  styleUrls: ['./accommodation-modification-cards.component.css']
})
export class AccommodationModificationCardsComponent {
  @Input() accommodationModifications!: AccommodationModification[];
  constructor(private service: AccommodationModificationService) {
  }
}
