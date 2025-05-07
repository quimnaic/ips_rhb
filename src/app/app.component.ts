import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent, SidenavComponent, TopnavComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ips';
  isLoggedIn = false; // Estado de autenticación

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Cargar estado desde localStorage
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Suscribirse a cambios en la autenticación
    this.authService.isAuthenticated$.subscribe(status => {
      console.log("Estado de autenticación cambiado:", status);
      this.isLoggedIn = status;
    });
  }
}