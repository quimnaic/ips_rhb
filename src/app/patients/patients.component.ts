import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { RhbService } from '../rhb.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-patients',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxPaginationModule],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
    patientForm: FormGroup;

    documentTypes: any[] = [];
    genders: any[] = [];
    companies: any[] = [];
    positions: any[] = [];
    patients: any[] = [];
    search: string = ''; 
    filteredPatients: any[] = []; 
    page: number = 1; 
    pageSize: number = 10;  
    patientTable = true;
    patientDetail = false;

    constructor(private fb: FormBuilder, private patientService: PatientService, private rhbService: RhbService,  private router: Router) {
        this.patientForm = this.fb.group({
            siniestro: [''], // Add Validators if needed
            date_siniestro: [''],
            first_name: [''],
            last_name: [''],
            document_type_id: [''], 
            document_number: [''],
            birth_date: [''],
            age: [''],
            gender_id: [''],
            marital_status_id: [''],
            children: [''], // Or Validators.pattern if you expect a number
            address: [''],
            phone: [''],
            companion_name: [''],
            company_id: [''],
            address_company: [''],
            phone_company: [''],
            dominance: [''],
            date_incapacity: [''],
            date_rhi: [''],
            position_id: ['']
        })
    }

    ngOnInit(): void {

        this.patientsAll();

        this.variables();
    }

    private variables() {
        this.patientService.getCompany().subscribe(resdata => {
            this.companies = resdata;
        });

        this.patientService.getPosition().subscribe(resdata => {
            this.positions = resdata;
        });

        this.patientService.getGender().subscribe(resdata => {
            this.genders = resdata;
        });

        this.patientService.getDocumentType().subscribe(resdata => {
            this.documentTypes = resdata;
        });


    }

    private patientsAll() {
        this.patientService.getPatients().subscribe(resdata => {
            this.patients = resdata;
            this.filteredPatients = this.patients;
        });
    }

    onCreate(): void {
        this.patientDetail = true;
        this.patientTable = false;
    }

    onSubmit(): void {
        if(this.patientForm.valid){
            const formData = {
                siniestro: this.patientForm.value.siniestro,
                date_siniestro: this.patientForm.value.date_siniestro,
                first_name: this.patientForm.value.first_name,
                last_name: this.patientForm.value.last_name,
                document_type_id: this.patientForm.value.document_type_id,
                document_number: this.patientForm.value.document_number,
                birth_date: this.patientForm.value.birth_date,
                age: this.patientForm.value.age,
                gender_id: this.patientForm.value.gender_id,
                marital_status_id: this.patientForm.value.marital_status_id,
                children: this.patientForm.value.children,
                address: this.patientForm.value.address,
                phone: this.patientForm.value.phone,
                companion_name: this.patientForm.value.companion_name,
                company_id: this.patientForm.value.company_id,
                address_company: this.patientForm.value.address_company,
                phone_company: this.patientForm.value.phone_company,
                dominance: this.patientForm.value.dominance,
                date_incapacity: this.patientForm.value.date_incapacity,
                date_rhi: this.patientForm.value.date_rhi,
                position_id: this.patientForm.value.position_id
            }
            this.patientService.storePatient(formData).subscribe(resdata => {
                this.resetForm();
                this.patientsAll();
                Swal.fire({
                    toast: true,
                    position: 'top-end',  // 🔥 Se muestra arriba a la derecha
                    icon: 'success',
                    title: 'Archivo subido correctamente',
                    showConfirmButton: false,
                    timer: 3000  // ⏳ Se cierra automáticamente en 3 segundos
                });
            }, error => {
                console.error('Error al subir el archivo', error);
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  icon: 'error',
                  title: 'Error al subir el archivo',
                  showConfirmButton: false,
                  timer: 3000
                });
              });
        }
    }

    resetForm() {
        this.patientForm.reset();
        this.patientDetail = false;
        this.patientTable = true;
    };

    onHistory(patient: any) {
        this.rhbService.setPatient(patient); 
        this.router.navigate(['/rhb']);
    }

    filterCustomers() {
        this.filteredPatients = this.patients.filter(patient =>
          patient.siniestro.toLowerCase().includes(this.search.toLowerCase())
        );
        this.page = 1; // Resetear la página al filtrar
      }
}
