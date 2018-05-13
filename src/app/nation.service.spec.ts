import { TestBed, inject } from '@angular/core/testing';

import { NationService } from './nation.service';

describe('NationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NationService]
    });
  });

  it('should be created', inject([NationService], (service: NationService) => {
    expect(service).toBeTruthy();
  }));
});
