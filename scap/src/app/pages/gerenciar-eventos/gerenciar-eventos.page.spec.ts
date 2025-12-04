import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenciarEventosPage } from './gerenciar-eventos.page';

describe('GerenciarEventosPage', () => {
  let component: GerenciarEventosPage;
  let fixture: ComponentFixture<GerenciarEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
