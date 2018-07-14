import { TestBed, inject } from '@angular/core/testing';

import { ModalSpawnerService } from './modal-spawner.service';

describe('ModalSpawnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalSpawnerService]
    });
  });

  it('should be created', inject([ModalSpawnerService], (service: ModalSpawnerService) => {
    expect(service).toBeTruthy();
  }));
});
