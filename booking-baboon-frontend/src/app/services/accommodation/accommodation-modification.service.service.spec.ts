import { TestBed } from '@angular/core/testing';

import { AccommodationModificationServiceService } from './accommodation-modification.service.service';

describe('AccommodationModificationServiceService', () => {
  let service: AccommodationModificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationModificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
