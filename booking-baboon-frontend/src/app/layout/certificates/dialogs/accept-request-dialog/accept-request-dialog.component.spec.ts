import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRequestDialogComponent } from './accept-request-dialog.component';

describe('AcceptRequestDialogComponent', () => {
  let component: AcceptRequestDialogComponent;
  let fixture: ComponentFixture<AcceptRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptRequestDialogComponent]
    });
    fixture = TestBed.createComponent(AcceptRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
