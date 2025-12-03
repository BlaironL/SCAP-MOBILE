import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificacoesModalComponent } from './notificacoes-modal.component';

describe('NotificacoesModalComponent', () => {
  let component: NotificacoesModalComponent;
  let fixture: ComponentFixture<NotificacoesModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NotificacoesModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacoesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
