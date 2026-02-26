import { TestBed } from '@angular/core/testing';

import { TareaServicio } from './tarea-servicio';

describe('TareaServicio', () => {
  let service: TareaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
