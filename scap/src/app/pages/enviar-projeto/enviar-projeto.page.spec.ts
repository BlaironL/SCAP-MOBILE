import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviarProjetoPage } from './enviar-projeto.page';

describe('EnviarProjetoPage', () => {
  let component: EnviarProjetoPage;
  let fixture: ComponentFixture<EnviarProjetoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarProjetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
