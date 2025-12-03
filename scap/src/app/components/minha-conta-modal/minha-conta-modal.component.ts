import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 1. Importar ModalController e os componentes Ionic
import { 
  ModalController, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonContent, 
  IonAvatar, 
  IonItem, 
  IonLabel 
} from '@ionic/angular/standalone';

// 2. Importar os ícones que vamos usar
import { addIcons } from 'ionicons';
import { closeCircleOutline, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-minha-conta-modal',
  templateUrl: './minha-conta-modal.component.html',
  styleUrls: ['./minha-conta-modal.component.scss'],
  standalone: true,
  
  // 3. Adicionar os imports dos componentes
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonContent, 
    IonAvatar, 
    IonItem, 
    IonLabel
  ]
})
export class MinhaContaModalComponent {

  constructor(private modalCtrl: ModalController) {
    // 4. Registrar ícones (Versão Limpa e Corrigida)
    // Removemos qualquer duplicata que estava causando o erro TS1117
    addIcons({ 
      'close-circle-outline': closeCircleOutline,
      'star-outline': starOutline
    });
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }

  assinarPremium() {
    console.log('Usuário clicou em Assinar Premium');
    this.modalCtrl.dismiss();
  }
}