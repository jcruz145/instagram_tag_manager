import { TestBed, inject } from '@angular/core/testing';

import { TagDatabaseService } from './tag-database.service';

describe('TagDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagDatabaseService]
    });
  });

  it('should be created', inject([TagDatabaseService], (service: TagDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
