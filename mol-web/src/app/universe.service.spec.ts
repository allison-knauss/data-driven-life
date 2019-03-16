import { TestBed } from '@angular/core/testing';

import { UniverseService } from './universe.service';

describe('UniverseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniverseService = TestBed.get(UniverseService);
    expect(service).toBeTruthy();
  });
});
