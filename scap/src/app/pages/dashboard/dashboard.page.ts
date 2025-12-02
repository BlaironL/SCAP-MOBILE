import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  calendarOutline, documentTextOutline, peopleOutline, 
  timeOutline, arrowForwardOutline, notificationsOutline 
} from 'ionicons/icons';

// IMPORTAÇÕES EXPLÍCITAS (ESSENCIAL PARA ANDROID)
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonGrid, IonRow, IonCol, IonIcon, IonButton, 
  IonList, IonItem, IonLabel, IonBadge, IonCard 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  // ADICIONAMOS TODOS OS COMPONENTES AQUI
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
    IonContent, IonGrid, IonRow, IonCol, IonIcon, IonButton,
    IonList, IonItem, IonLabel, IonBadge, IonCard
  ]
})
export class DashboardPage implements OnInit {

  stats = {
    eventosAtivos: 3,
    meusProjetos: 1,
    avaliacoesPendentes: 2
  };

  proximosEventos = [
    {
      id: 1,
      titulo: 'Semana de Tecnologia 2025',
      data: '20/11/2025',
      local: 'Auditório Principal',
      status: 'Aberto'
    },
    {
      id: 2,
      titulo: 'Congresso de Medicina',
      data: '05/12/2025',
      local: 'Campus Saúde',
      status: 'Em Andamento'
    },
    {
      id: 3,
      titulo: 'Feira de Ciências Agrárias',
      data: '15/01/2026',
      local: 'Pavilhão B',
      status: 'Aberto'
    }
  ];

  constructor() {
    addIcons({ calendarOutline, documentTextOutline, peopleOutline, timeOutline, arrowForwardOutline, notificationsOutline });
  }

  ngOnInit() {
  }
}