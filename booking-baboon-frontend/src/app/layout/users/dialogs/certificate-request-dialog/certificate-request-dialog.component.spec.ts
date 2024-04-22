import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateRequestDialogComponent } from './certificate-request-dialog.component';

describe('CertificateRequestDialogComponent', () => {
  let component: CertificateRequestDialogComponent;
  let fixture: ComponentFixture<CertificateRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateRequestDialogComponent]
    });
    fixture = TestBed.createComponent(CertificateRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
