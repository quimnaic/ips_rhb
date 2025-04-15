import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  imports: [],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {
  
  constructor( private router: Router){}
}
