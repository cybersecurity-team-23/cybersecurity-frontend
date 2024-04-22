import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminMainPageComponent } from './super-admin-main-page.component';

describe('SuperAdminMainPageComponent', () => {
  let component: SuperAdminMainPageComponent;
  let fixture: ComponentFixture<SuperAdminMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminMainPageComponent]
    });
    fixture = TestBed.createComponent(SuperAdminMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
