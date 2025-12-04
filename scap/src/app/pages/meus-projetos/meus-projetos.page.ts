import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  documentTextOutline, 
  timeOutline, 
  checkmarkCircleOutline, 
  closeCircleOutline, 
  starOutline, 
  personOutline,
  businessOutline
} from 'ionicons/icons';

// Imports Standalone
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
  IonContent, IonList, IonCard, IonCardHeader, IonCardSubtitle, 
  IonCardTitle, IonCardContent, IonBadge, IonIcon, IonButton,
  IonProgressBar 
} from '@ionic/angular/standalone';

import { ScapDataService, Projeto } from '../../services/scap-data.service'; // Ajuste o caminho ../ se necessário
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meus-projetos',
  templateUrl: './meus-projetos.page.html',
  styleUrls: ['./meus-projetos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
    IonContent, IonList, IonCard, IonCardHeader, IonCardSubtitle, 
    IonCardTitle, IonCardContent, IonBadge, IonIcon, IonButton,
    IonProgressBar
  ]
})
export class MeusProjetosPage implements OnInit {
  private scapService = inject(ScapDataService);

  // Fluxo de dados em tempo real
  meusProjetos$!: Observable<Projeto[]>;

  constructor() {
    addIcons({ 
      documentTextOutline, timeOutline, checkmarkCircleOutline, 
      closeCircleOutline, starOutline, personOutline, businessOutline 
    });
  }

  ngOnInit() {
    // Conecta ao "Banco de Dados"
    // Nota: Em um app real com login, filtraríamos aqui: .filter(p => p.autor === 'Meu Usuario')
    this.meusProjetos$ = this.scapService.projetos$;
  }

  // Define a cor do Badge baseado no status
  getCorStatus(status: string): string {
    switch (status) {
      case 'Avaliado': return 'success';      // Verde
      case 'Recusado': return 'danger';       // Vermelho
      case 'Em Avaliação': return 'primary';  // Azul
      case 'Pendente': return 'warning';      // Amarelo
      default: return 'medium';               // Cinza
    }
  }

  // Define o ícone baseado no status
  getIconeStatus(status: string): string {
    switch (status) {
      case 'Avaliado': return 'checkmark-circle-outline';
      case 'Recusado': return 'close-circle-outline';
      case 'Em Avaliação': return 'time-outline';
      default: return 'document-text-outline';
    }
  }
}