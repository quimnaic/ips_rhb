import { TestBed } from '@angular/core/testing';

import { RhbService } from './rhb.service';

describe('RhbService', () => {
  let service: RhbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RhbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
