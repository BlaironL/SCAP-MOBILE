import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importado aqui
import { RouterLink, RouterLinkActive } from '@angular/router';
import { 
  IonApp, 
  IonSplitPane, 
  IonMenu, 
  IonContent, 
  IonList, 
  IonListHeader, 
  IonNote, 
  IonMenuToggle, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet, 
  IonAvatar 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  addCircleOutline, 
  documentTextOutline, 
  checkmarkDoneCircleOutline, 
  logOutOutline, 
  personCircleOutline,
  notificationsOutline, // Adicionei este pois usaremos no dashboard
  calendarOutline,      // Ícones do dashboard
  peopleOutline,
  timeOutline,
  arrowForwardOutline,
  textOutline,          // Ícones do form
  locationOutline,
  calendarNumberOutline,
  saveOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // <--- AQUI ESTAVA FALTANDO! (Essencial para *ngFor)
    RouterLink, 
    RouterLinkActive, 
    IonApp, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonList, 
    IonListHeader, 
    IonNote, 
    IonMenuToggle, 
    IonItem, 
    IonIcon, 
    IonLabel, 
    IonRouterOutlet, 
    IonAvatar
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home-outline' },
    { title: 'Criar Evento', url: '/criar-evento', icon: 'add-circle-outline' },
    { title: 'Meus Projetos', url: '/meus-projetos', icon: 'document-text-outline' },
    { title: 'Avaliar Projetos', url: '/avaliar', icon: 'checkmark-done-circle-outline' },
  ];
  
  constructor() {
    // Registrando todos os ícones que usamos no app para evitar erros futuros
    addIcons({ 
      homeOutline, 
      addCircleOutline, 
      documentTextOutline, 
      checkmarkDoneCircleOutline, 
      logOutOutline, 
      personCircleOutline,
      notificationsOutline,
      calendarOutline,
      peopleOutline,
      timeOutline,
      arrowForwardOutline,
      textOutline,
      locationOutline,
      calendarNumberOutline,
      saveOutline
    });
  }
}