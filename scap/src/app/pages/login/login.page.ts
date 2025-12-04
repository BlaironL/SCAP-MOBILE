import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router'; // <--- 1. IMPORT NECESSÁRIO
import { addIcons } from 'ionicons'; 
import { schoolOutline, personOutline, lockClosedOutline, logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule // <--- 2. ADICIONE AQUI NA LISTA DE IMPORTS
  ]
})
export class LoginPage {
  private authService = inject(AuthService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private fb = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    addIcons({ schoolOutline, personOutline, lockClosedOutline, logInOutline });

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async fazerLogin() {
    if (this.form.invalid) return;

    const loading = await this.loadingCtrl.create({ 
      message: 'Autenticando...',
      spinner: 'crescent' 
    });
    await loading.present();

    const { username, password } = this.form.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        loading.dismiss();
        this.navCtrl.navigateRoot('/dashboard');
      },
      error: async (err) => {
        loading.dismiss();
        console.error(err);
        
        const msg = err.status === 401 
          ? 'Usuário ou senha incorretos.' 
          : 'Erro ao conectar com o servidor.';
          
        const toast = await this.toastCtrl.create({
          message: msg,
          duration: 3000,
          color: 'danger',
          position: 'top',
          icon: 'alert-circle-outline'
        });
        toast.present();
      }
    });
  }
}