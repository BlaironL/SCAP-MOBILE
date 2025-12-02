import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, MenuController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline, checkmarkCircleOutline, arrowBackOutline } from 'ionicons/icons';
import { 
  IonContent, IonInput, IonButton, IonIcon, IonSpinner, IonButtons, IonHeader, IonToolbar, IonTitle 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonInput, IonButton, IonIcon, IonSpinner, 
    IonButtons, IonHeader, IonToolbar, IonTitle
  ]
})
export class CadastroPage implements OnInit {

  form = { nome: '', email: '', senha: '', confSenha: '' };
  isLoading = false;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController
  ) {
    addIcons({ personOutline, mailOutline, lockClosedOutline, checkmarkCircleOutline, arrowBackOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false); // Garante que o menu esteja travado
  }

  async registrar() {
    if (this.form.senha !== this.form.confSenha) {
      const toast = await this.toastCtrl.create({ message: 'As senhas não coincidem!', duration: 2000, color: 'danger' });
      toast.present();
      return;
    }

    this.isLoading = true;

    // Simula registro
    setTimeout(async () => {
      this.isLoading = false;
      const toast = await this.toastCtrl.create({ message: 'Conta criada com sucesso!', duration: 2000, color: 'success' });
      toast.present();
      
      // Volta para o login
      this.navCtrl.navigateBack('/login');
    }, 1500);
  }
  
  voltar() {
    this.navCtrl.navigateBack('/login');
  }
}