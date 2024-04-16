import { TestBed } from '@angular/core/testing';

import { LogradouroService } from './logradouro.service';

describe('LogradouroService', () => {
  let service: LogradouroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogradouroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
