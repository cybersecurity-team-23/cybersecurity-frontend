import { Component } from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  accommodations!: Accommodation[];
  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {
    this.accommodations = this.service.getAll();
    // this.service.getAll().subscribe({
    //   next: (data: Accommodation[]) => {
    //     this.accommodations = data
    //   },
    //   error: (_) => {console.log("Greska!")}
    // })
  }
}
