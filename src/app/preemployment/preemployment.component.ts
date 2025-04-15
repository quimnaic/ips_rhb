import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preemployment-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './preemployment.component.html',
  styleUrls: ['./preemployment.component.css']
})
export class PreemploymentComponent implements OnInit {
  preEmploymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.preEmploymentForm = this.fb.group({
      patient_id: [''],
      patient_name: [''],
      fit_for_position: [null],
      emphasis_concept: [''],
      complementary_exams: [''],
      general_recommendations: [''],
      preventive_occupational_recommendations: [''],
      worker_specific_recommendations: [''],
      company_specific_recommendations: [''],
      epidemiological_surveillance_system: ['']
    });
  }

  ngOnInit(): void {}

  onSearchPatient(): void {
  }
}