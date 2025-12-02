import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  documentTextOutline, timeOutline, checkmarkCircleOutline, 
  cloudUploadOutline, eyeOutline, downloadOutline 
} from 'ionicons/icons';

// IMPORTAÇÕES EXPLÍCITAS
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon,
  IonContent, IonCard
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-meus-projetos',
  templateUrl: './meus-projetos.page.html',
  styleUrls: ['./meus-projetos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon,
    IonContent, IonCard
  ]
})
export class MeusProjetosPage implements OnInit {

  meusProjetos = [
    {
      id: 101,
      titulo: 'Uso de IA na Agricultura de Precisão',
      evento: 'Semana de Tecnologia 2025',
      dataSubmissao: '15/10/2025',
      status: 'Avaliado',
      nota: 9.5,
      feedback: 'Excelente trabalho, metodologia clara.'
    },
    {
      id: 102,
      titulo: 'Impactos do 5G na Telemedicina',
      evento: 'Congresso de Medicina',
      dataSubmissao: '01/11/2025',
      status: 'Em Avaliação',
      nota: null,
      feedback: null
    },
    {
      id: 103,
      titulo: 'Blockchain para Rastreabilidade',
      evento: 'Semana de Tecnologia 2025',
      dataSubmissao: '10/11/2025',
      status: 'Pendente',
      nota: null,
      feedback: null
    }
  ];

  constructor() {
    addIcons({ documentTextOutline, timeOutline, checkmarkCircleOutline, cloudUploadOutline, eyeOutline, downloadOutline });
  }

  ngOnInit() { }

  getStatusColor(status: string) {
    switch (status) {
      case 'Avaliado': return 'success';
      case 'Em Avaliação': return 'warning';
      default: return 'medium';
    }
  }
}