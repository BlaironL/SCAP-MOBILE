import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
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
  IonAvatar,
  AlertController, 
  MenuController,
  ModalController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
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
  saveOutline,
  cloudUploadOutline,
  searchOutline,
  businessOutline,
  closeCircleOutline,
  starOutline,
  closeOutline,
  chatbubbleOutline,
  sendOutline,
  heart,
  heartOutline,
  linkOutline,
  shareSocialOutline
} from 'ionicons/icons';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { MinhaContaModalComponent } from './components/minha-conta-modal/minha-conta-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
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
    { title: 'Enviar Projeto', url: '/enviar-projeto', icon: 'cloud-upload-outline' } 
  ];
  
  constructor(
    private platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController,
    private modalController: ModalController
  ) {
    this.initializeApp();
    
    // REGISTRO GERAL DE ÍCONES (Para evitar erros em qualquer lugar)
    addIcons({ 
      homeOutline, addCircleOutline, documentTextOutline, checkmarkDoneCircleOutline, 
      logOutOutline, personCircleOutline, notificationsOutline, calendarOutline, 
      peopleOutline, timeOutline, arrowForwardOutline, textOutline, locationOutline, 
      calendarNumberOutline, saveOutline, cloudUploadOutline, searchOutline, 
      businessOutline, closeCircleOutline, starOutline, closeOutline,
      chatbubbleOutline, sendOutline, heart, heartOutline, linkOutline, shareSocialOutline
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

  async irParaInicio() {
    this.router.navigate(['/dashboard']);
    await this.menuController.close();
  }

  async abrirMinhaConta() {
    await this.menuController.close();
    const modal = await this.modalController.create({
      component: MinhaContaModalComponent,
      cssClass: 'meu-modal-profissional'
    });
    await modal.present();
  }

  async sair() {
    await this.menuController.close();
    
    const alert = await this.alertController.create({
      header: 'Sair',
      message: 'Tem certeza que deseja sair do seu perfil?',
      buttons: [
        { text: 'Não', role: 'cancel' },
        {
          text: 'Sim, Sair',
          cssClass: 'danger-button',
          handler: () => {
            console.log('Usuário saiu');
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}