import { TestBed } from '@angular/core/testing';

import { GetUpdatedUserService } from './get-updated-user.service';

describe('GetUpdatedUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUpdatedUserService = TestBed.get(GetUpdatedUserService);
    expect(service).toBeTruthy();
  });
});
