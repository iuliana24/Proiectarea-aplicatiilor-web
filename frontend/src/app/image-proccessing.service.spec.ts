import { TestBed } from '@angular/core/testing';

import { ImageProccessingService } from './image-proccessing.service';

describe('ImageProccessingService', () => {
  let service: ImageProccessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProccessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
