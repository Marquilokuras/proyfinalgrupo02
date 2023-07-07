import { TestBed } from '@angular/core/testing';

import { GooService } from './goo.service';

describe('GooService', () => {
  let service: GooService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
