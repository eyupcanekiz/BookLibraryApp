import { TestBed } from '@angular/core/testing';

import { ReadoutBookService } from './readoutbook.service';

describe('ReadoutbookService', () => {
  let service: ReadoutBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadoutBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
