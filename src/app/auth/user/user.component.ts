import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  userTable: boolean = true;
  userDetail: boolean = false;
  userForm: FormGroup;
  users: any[] = [];
  companies: any[] = [];

  constructor (private fb: FormBuilder, private apiService: AuthService, private patientService: PatientService) {
    this.userForm = this.fb.group({
      name: [''],
      document: [''],
      email: [''],
      company: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.variables();
  }

  variables() {
    this.apiService.allUsers().subscribe(resdata => {
      this.users = resdata;
    });
    this.patientService.getCompany().subscribe(resdata => {
      this.companies = resdata;
    });
  }

  onSubmit(){
    this.apiService.register(this.userForm.value).subscribe();
    this.variables();
  }

  resetForm() {
    this.userForm.reset();
    this.userDetail = false;
    this.userTable = true;
  }

  onCreate(): void {
    this.userDetail = true;
    this.userTable = false;
  }
}
