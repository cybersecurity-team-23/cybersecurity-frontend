import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericYesNoDialogComponent } from './generic-yes-no-dialog.component';

describe('GenericYesNoDialogComponent', () => {
  let component: GenericYesNoDialogComponent;
  let fixture: ComponentFixture<GenericYesNoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericYesNoDialogComponent]
    });
    fixture = TestBed.createComponent(GenericYesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
