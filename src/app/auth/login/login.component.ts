import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      document: [''],
      password: ['']
    })
  }

  onLogin() {
    const formData = {
      document: this.loginForm.value.document,
      password: this.loginForm.value.password
    };
  
    console.log("Estes es el body", formData);

    this.authService.login(formData).subscribe(
      () => {
        console.log("Usuario autenticado, redirigiendo...");
        this.router.navigate(['/patients']); // Redirigir al dashboard
      },
      (error) => {         
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'El usuario o contraseña son incorrectos.',
          confirmButtonText: 'Aceptar'
        });
      }
    );    
  }
}
