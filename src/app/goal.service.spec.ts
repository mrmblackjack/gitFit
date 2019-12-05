/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoalService } from './goal.service';

describe('Service: Goal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalService]
    });
  });

  it('should ...', inject([GoalService], (service: GoalService) => {
    expect(service).toBeTruthy();
  }));
});
