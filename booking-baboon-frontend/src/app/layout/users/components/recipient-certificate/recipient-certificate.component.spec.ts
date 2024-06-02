import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientCertificateComponent } from './recipient-certificate.component';

describe('RecipientCertificateComponent', () => {
  let component: RecipientCertificateComponent;
  let fixture: ComponentFixture<RecipientCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipientCertificateComponent]
    });
    fixture = TestBed.createComponent(RecipientCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
