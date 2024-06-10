import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyCertificateDialogComponent } from './create-company-certificate-dialog.component';

describe('CreateCompanyCertificateDialogComponent', () => {
  let component: CreateCompanyCertificateDialogComponent;
  let fixture: ComponentFixture<CreateCompanyCertificateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyCertificateDialogComponent]
    });
    fixture = TestBed.createComponent(CreateCompanyCertificateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
