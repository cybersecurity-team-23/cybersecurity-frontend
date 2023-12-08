import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewsDialogComponent } from './accommodation-reviews-dialog.component';

describe('AccommodationReviewsDialogComponent', () => {
  let component: AccommodationReviewsDialogComponent;
  let fixture: ComponentFixture<AccommodationReviewsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationReviewsDialogComponent]
    });
    fixture = TestBed.createComponent(AccommodationReviewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
