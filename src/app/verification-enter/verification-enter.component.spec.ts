import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationEnterComponent } from './verification-enter.component';

describe('VerificationEnterComponent', () => {
  let component: VerificationEnterComponent;
  let fixture: ComponentFixture<VerificationEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationEnterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
