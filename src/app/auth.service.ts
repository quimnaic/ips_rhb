import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from './models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(this.checkAuth());
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient) {}

  urlLogin =  "http://186.117.135.117:8700/ips/public/api/login";
  urlRegister =   "http://186.117.135.117:8700/ips/public/api/register";
  urlLogout = "http://186.117.135.117:8700/ips/public/api/logout";
  urlAllUsers = 'http://186.117.135.117:8700/ips/public/api/users';

  private checkAuth(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getToken(){
    return 'Bearer ' + localStorage.getItem('token');
  }

  login(formData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.urlLogin, formData).pipe(
      tap((res: AuthResponse) => {
        console.log("Login exitoso, guardando token...");
        localStorage.setItem('token', res.access_token); // Guardar token en LocalStorage
        localStorage.setItem('email', res.user.email); // Guardar token en LocalStorage
        localStorage.setItem('isLoggedIn', 'true'); // Marcar sesión activa
        localStorage.setItem('company', res.user.company);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.isAuthenticated.next(true); // Emitir estado de autenticación
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); // Eliminar el token
    localStorage.removeItem('isLoggedIn'); // Eliminar estado de autenticación
    localStorage.removeItem('document'); // Eliminar estado de autenticación
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    this.isAuthenticated.next(false); // Emitir estado de autenticación como falso
    const headers = new HttpHeaders({
      Authorization: this.getToken()
    });
    return this.http.post<any>(this.urlLogout, { headers } )
  }

  register(formData: any): Observable<any>{
    return this.http.post<any>(this.urlRegister, formData);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  allUsers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.getToken()
    });
  
    return this.http.get(this.urlAllUsers, { headers });
  }
  
}
