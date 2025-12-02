import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular'; // Import MenuController
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, logInOutline, personAddOutline } from 'ionicons/icons';
import { 
  IonContent, IonCard, IonInput, IonButton, IonIcon, IonText, IonSpinner 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonCard, IonInput, IonButton, IonIcon, IonText, IonSpinner
  ]
})
export class LoginPage implements OnInit {

  credentials = { email: '', password: '' };
  isLoading = false;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController // Injetar o controlador do menu
  ) {
    addIcons({ mailOutline, lockClosedOutline, logInOutline, personAddOutline });
  }

  ngOnInit() {}

  // 1. Quando entrar na página, DESATIVA o menu lateral
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async login() {
    this.isLoading = true;

    // Simula delay de rede
    setTimeout(async () => {
      this.isLoading = false;
      console.log('Login mockado com:', this.credentials);
      
      // 2. Antes de sair, ATIVA o menu lateral novamente para o Dashboard
      await this.menuCtrl.enable(true);

      // Navega para o Dashboard (Root para não ter botão de voltar)
      this.navCtrl.navigateRoot('/dashboard');
    }, 1500);
  }
}