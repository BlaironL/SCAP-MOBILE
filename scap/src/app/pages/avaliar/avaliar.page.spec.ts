import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliarPage } from './avaliar.page';

describe('AvaliarPage', () => {
  let component: AvaliarPage;
  let fixture: ComponentFixture<AvaliarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
