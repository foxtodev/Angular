import { TestBed } from '@angular/core/testing';

import { DataexchangeService } from './dataexchange.service';

describe('DataexchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataexchangeService = TestBed.get(DataexchangeService);
    expect(service).toBeTruthy();
  });
});
