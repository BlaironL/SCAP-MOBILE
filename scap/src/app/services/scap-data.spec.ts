import { TestBed } from '@angular/core/testing';

import { ScapData } from './scap-data';

describe('ScapData', () => {
  let service: ScapData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScapData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
