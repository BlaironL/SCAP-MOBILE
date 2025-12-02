import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusProjetosPage } from './meus-projetos.page';

describe('MeusProjetosPage', () => {
  let component: MeusProjetosPage;
  let fixture: ComponentFixture<MeusProjetosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusProjetosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
