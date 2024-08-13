import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadoutBookComponent } from './readoutbook.component';

describe('ReadoutbookComponent', () => {
  let component: ReadoutBookComponent;
  let fixture: ComponentFixture<ReadoutBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadoutBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadoutBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
