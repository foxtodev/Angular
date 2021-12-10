import { TestBed } from '@angular/core/testing';

import { JackpotService } from './jackpot.service';

describe('JackpotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JackpotService = TestBed.get(JackpotService);
    expect(service).toBeTruthy();
  });
});
