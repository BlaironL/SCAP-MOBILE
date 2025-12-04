import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // <--- 1. IMPORTE ISSO
import { ScapDataService, Evento, Projeto, Notificacao } from '../../services/scap-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { addIcons } from 'ionicons'; 
import { 
  notificationsOutline, 
  calendarOutline, 
  documentTextOutline, 
  timeOutline, 
  arrowForwardOutline, 
  locationOutline, 
  checkmark, 
  close, 
  settingsOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    RouterModule // <--- 2. ADICIONE AQUI NA LISTA
  ]
})
export class DashboardPage implements OnInit {
  // ... (O resto do seu código continua igual)
  private scapService = inject(ScapDataService);

  eventos$!: Observable<Evento[]>;
  meusProjetos$!: Observable<Projeto[]>;
  notificacoes$!: Observable<Notificacao[]>;
  totalEventosAtivos$!: Observable<number>;
  totalPendencias$!: Observable<number>;
  isModalOpen = false;

  constructor() {
    addIcons({ 
      notificationsOutline, 
      calendarOutline, 
      documentTextOutline, 
      timeOutline, 
      arrowForwardOutline, 
      locationOutline, 
      checkmark, 
      close,
      settingsOutline 
    });
  }

  ngOnInit() {
    this.eventos$ = this.scapService.eventos$;
    this.notificacoes$ = this.scapService.notificacoes$;
    this.meusProjetos$ = this.scapService.projetos$;

    this.totalEventosAtivos$ = this.eventos$.pipe(
      map(lista => lista.filter(e => e.status === 'Aberto').length)
    );

    this.totalPendencias$ = this.notificacoes$.pipe(
      map(lista => lista.filter(n => !n.lida).length)
    );
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  aceitarProjeto(notificacao: Notificacao) {
    this.scapService.responderSolicitacao(notificacao, true);
    this.fecharSeVazio();
  }

  recusarProjeto(notificacao: Notificacao) {
    this.scapService.responderSolicitacao(notificacao, false);
    this.fecharSeVazio();
  }

  private fecharSeVazio() {
    setTimeout(() => {
      const atuais = this.scapService['_notificacoes'].value;
      if (atuais.length === 0) {
        this.isModalOpen = false;
      }
    }, 500);
  }
}