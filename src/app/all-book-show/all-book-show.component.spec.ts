import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookShowComponent } from './all-book-show.component';

describe('AllBookShowComponent', () => {
  let component: AllBookShowComponent;
  let fixture: ComponentFixture<AllBookShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBookShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBookShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
