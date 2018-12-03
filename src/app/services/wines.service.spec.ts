import { TestBed } from '@angular/core/testing';

import { WinesService } from './wines.service';

describe('WinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WinesService = TestBed.get(WinesService);
    expect(service).toBeTruthy();
  });
});
