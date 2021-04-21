import { TestBed } from '@angular/core/testing';

import { Orderservice } from './orderservice.service';

describe('OrderserviceService', () => {
  let service: Orderservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orderservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
