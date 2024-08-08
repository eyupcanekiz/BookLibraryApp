import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEditComponent } from './profil-edit.component';

describe('ProfilEditComponent', () => {
  let component: ProfilEditComponent;
  let fixture: ComponentFixture<ProfilEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
