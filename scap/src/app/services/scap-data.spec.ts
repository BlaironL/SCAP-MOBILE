import { TestBed } from '@angular/core/testing';

// CORREÇÃO: Importar o nome correto da classe e do arquivo
import { ScapDataService } from './scap-data.service';

describe('ScapDataService', () => {
  let service: ScapDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScapDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});