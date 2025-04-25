import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { RhbService } from '../rhb.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-patients',
    imports: [CommonModule,ReactiveFormsModule],
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

    patientTable = true;
    patientDetail = false;

    constructor(private fb: FormBuilder, private patientService: PatientService, private rhbService: RhbService,  private router: Router) {
        this.patientForm = this.fb.group({
            siniestro: ['', Validators.required], // Add Validators if needed
            date_siniestro: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            document_type_id: [''],
            document_number: ['', Validators.required],
            birth_date: ['', Validators.required],
            age: ['', Validators.required],
            gender_id: ['', Validators.required],
            marital_status_id: ['', Validators.required],
            children: [''], // Or Validators.pattern if you expect a number
            address: ['', Validators.required],
            phone: ['', Validators.required],
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
}
