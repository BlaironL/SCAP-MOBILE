import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ScapDataService, Notificacao } from '../../services/scap-data.service';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, closeCircleOutline, notificationsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-notificacoes-modal',
  templateUrl: './notificacoes-modal.component.html',
  styleUrls: ['./notificacoes-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NotificacoesModalComponent implements OnInit {

  notificacoes: Notificacao[] = [];

  constructor(
    private modalCtrl: ModalController,
    private scapService: ScapDataService
  ) {
    addIcons({ checkmarkCircleOutline, closeCircleOutline, notificationsOutline });
  }

  ngOnInit() {
    // 2. CORREÇÃO: Tipagem explícita (n: Notificacao[]) para resolver o erro "implicitly has an 'any' type"
    this.scapService.notificacoes$.subscribe((n: Notificacao[]) => {
      this.notificacoes = n;
    });
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

  responder(notificacao: Notificacao, aceitar: boolean) {
    this.scapService.responderSolicitacao(notificacao, aceitar);
  }
}