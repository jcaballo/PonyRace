import { TestBed } from '@angular/core/testing';

import { RaceService } from './race.service';

describe('RaceService', () => {

  let service: RaceService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => service = TestBed.get(RaceService));

  it('should list races', () => {
    const races = service.list();
    expect(races.length).toBe(2, 'The service should return two races for the `list()` method');
  });

});
