import { Component, inject, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ScapDataService, Projeto } from '../../services/scap-data.service';

// --- IMPORTS STANDALONE CORRETOS ---
import { 
  IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, 
  IonContent, IonList, IonItem, IonLabel, IonIcon, IonModal,
  IonRange, IonTextarea, IonBackButton 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  personCircleOutline, 
  chevronForwardOutline, 
  checkmarkDoneCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
  standalone: true,
  imports: [
    // REMOVI O IonicModule PARA EVITAR O CONFLITO NG0300
    CommonModule, 
    FormsModule,
    // Apenas os componentes individuais:
    IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, 
    IonContent, IonList, IonItem, IonLabel, IonIcon, IonModal,
    IonRange, IonTextarea, IonBackButton
  ]
})
export class AvaliarPage implements OnInit {
  private scapService = inject(ScapDataService);
  private toastCtrl = inject(ToastController);
  private router = inject(Router); 
  private ngZone = inject(NgZone); 

  projetosPendentes: Projeto[] = [];
  isModalOpen = false;

  avaliacaoAtual: any = {
    id: '',
    titulo: '',
    notas: { originalidade: 0, relevancia: 0, metodologia: 0, apresentacao: 0 },
    comentario: ''
  };

  constructor() {
    addIcons({ personCircleOutline, chevronForwardOutline, checkmarkDoneCircleOutline });
  }

  ngOnInit() {
    this.scapService.projetos$.subscribe(projetos => {
      this.projetosPendentes = projetos.filter(p => p.status === 'Em Avaliação');
    });
  }

  abrirAvaliacao(projeto: Projeto) {
    this.avaliacaoAtual = {
      id: projeto.id,
      titulo: projeto.titulo,
      notas: { originalidade: 5, relevancia: 5, metodologia: 5, apresentacao: 5 },
      comentario: ''
    };
    this.isModalOpen = true;
  }

  cancelar() {
    this.isModalOpen = false;
  }

  get mediaAtual(): number {
    const n = this.avaliacaoAtual.notas;
    if (!n) return 0;
    return (n.originalidade + n.relevancia + n.metodologia + n.apresentacao) / 4;
  }

  async confirmar() {
    this.scapService.avaliarProjeto(
      this.avaliacaoAtual.id,
      this.avaliacaoAtual.notas,
      this.avaliacaoAtual.comentario
    );

    this.isModalOpen = false; 

    // Navegação Forçada para o Dashboard
    this.ngZone.run(() => {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
    });

    this.mostrarToast('Avaliação registrada com sucesso!');
  }

  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'success',
      icon: 'checkmark-done-circle-outline',
      position: 'top'
    });
    toast.present();
  }
}