import { TestBed } from '@angular/core/testing';

import { BorrowbookService } from './borrowbook.service';

describe('BorrowbookService', () => {
  let service: BorrowbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
