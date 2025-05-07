import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-topnav',
  imports: [],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {
  
  constructor( private router: Router, private apiService: AuthService){}

  onLogout(){
    this.apiService.logout();
    this.router.navigate(['login']);
  }
}
