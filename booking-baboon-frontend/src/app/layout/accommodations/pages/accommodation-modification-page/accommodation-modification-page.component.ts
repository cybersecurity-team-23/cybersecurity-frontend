import { Component } from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";
import {HostService} from "../../../../services/user/host.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Host} from "../../../authentication/models/host.model";
import {AccommodationModification} from "../../model/accommodation-modification.model";
import {
  AccommodationModificationService
} from "../../../../services/accommodation/accommodation-modification.service";
import {SharedService} from "../../../../shared/shared.service";

@Component({
  selector: 'app-accommodation-modification-card-page',
  templateUrl: './accommodation-modification-page.component.html',
  styleUrls: ['./accommodation-modification-page.component.css']
})
export class AccommodationModificationPageComponent {
  accommodationModifications!: AccommodationModification[];

  constructor(private accommodationModificationService:AccommodationModificationService, private hostService:HostService,
              private sharedService: SharedService) {}
  onToggleChange(event: any) {
    this.sharedService.setShowAllRequests(event.checked);
  }

  showAllRequests: boolean = true;
  ngOnInit(): void {
    this.accommodationModificationService.getAll().subscribe({
      next: (data: AccommodationModification[]) => {
        this.accommodationModifications = data;
      },
      error: () => {
        console.log("Error!");
      }
    });
  }
}
