import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular'; // Services mantêm aqui
import { addIcons } from 'ionicons';
import { saveOutline, locationOutline, textOutline, calendarNumberOutline, arrowForwardOutline } from 'ionicons/icons';

// IMPORTAÇÕES EXPLÍCITAS
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
  IonList, IonItem, IonIcon, IonLabel, IonInput, IonModal, IonDatetime,
  IonTextarea, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.page.html',
  styleUrls: ['./criar-evento.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
    IonList, IonItem, IonIcon, IonLabel, IonInput, IonModal, IonDatetime,
    IonTextarea, IonButton
  ]
})
export class CriarEventoPage implements OnInit {

  evento = {
    titulo: '',
    local: '',
    data: '',
    descricao: ''
  };

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    addIcons({ saveOutline, locationOutline, textOutline, calendarNumberOutline, arrowForwardOutline });
  }

  ngOnInit() {
  }

  async criar() {
    console.log('Dados do Evento:', this.evento);
    const toast = await this.toastCtrl.create({
      message: 'Evento criado com sucesso! (Simulação)',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
    this.navCtrl.navigateBack('/dashboard');
  }
}