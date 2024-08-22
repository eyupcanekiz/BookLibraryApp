import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';
import { AdminGuard } from './admin.guard'; // Import AdminGuard

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGuard); // Create an instance of AdminGuard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Test if the guard is created
  });
});