import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvkkComponent } from './kvkk.component';

describe('KvkkComponent', () => {
  let component: KvkkComponent;
  let fixture: ComponentFixture<KvkkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KvkkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KvkkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
