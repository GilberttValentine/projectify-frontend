import { TestBed } from '@angular/core/testing';

import { SessionAuthService } from './session-auth.service';

describe('SessionAuthService', () => {
  let service: SessionAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
