import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

// Define a URL base dependendo de onde o app está rodando
const isAndroid = Capacitor.getPlatform() === 'android';
// Emulador Android usa 10.0.2.2, Navegador usa localhost
const API_URL = isAndroid ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  // Guarda o estado do login (se tem token ou não)
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  
  constructor() {
    this.carregarTokenInicial();
  }

  get isAuthenticated$() {
    return this._isAuthenticated.asObservable();
  }

  // --- 1. LOGIN ---
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/login/`, { username, password }).pipe(
      tap(async (res: any) => {
        if (res.access) {
          // Salva o token no armazenamento seguro do celular/navegador
          await this.salvarToken(res.access, res.refresh);
          this._isAuthenticated.next(true);
        }
      })
    );
  }

  // --- 2. REGISTRO ---
  register(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/auth/register/`, userData);
  }

  // --- 3. LOGOUT ---
  async logout() {
    await Preferences.remove({ key: 'token_access' });
    await Preferences.remove({ key: 'token_refresh' });
    this._isAuthenticated.next(false);
  }

  // --- UTILITÁRIOS ---
  
  private async salvarToken(access: string, refresh: string) {
    await Preferences.set({ key: 'token_access', value: access });
    await Preferences.set({ key: 'token_refresh', value: refresh });
  }

  private async carregarTokenInicial() {
    const token = await Preferences.get({ key: 'token_access' });
    if (token.value) {
      this._isAuthenticated.next(true);
    }
  }

  async getToken() {
    const token = await Preferences.get({ key: 'token_access' });
    return token.value;
  }
}