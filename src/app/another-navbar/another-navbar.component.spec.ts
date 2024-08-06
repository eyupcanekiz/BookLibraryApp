import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherNavbarComponent } from './another-navbar.component';

describe('AnotherNavbarComponent', () => {
  let component: AnotherNavbarComponent;
  let fixture: ComponentFixture<AnotherNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnotherNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
