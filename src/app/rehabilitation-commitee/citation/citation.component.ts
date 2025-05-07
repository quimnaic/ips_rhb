import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RhbService } from '../../rhb.service';

declare var $: any;

@Component({
  selector: 'app-citation',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './citation.component.html',
  styleUrl: './citation.component.css'
})
export class CitationComponent {

  @Input() patient!: { first_name: any, last_name: any, phone: any, document_number:any,  id: any};

  citationForm: FormGroup;

  constructor(private http: HttpClient, private fb:FormBuilder, private rhbService: RhbService) {
    this.citationForm = this.fb.group({
      day: [''],
      hour: [''],
      site: [''],
      phone: ['']
    })
  }

  @Output() updateMethod = new EventEmitter<void>();

  closeModal() {
    $('#citModal').modal('hide');
  }

  onSubmit() {
    const formData = {
      day: this.citationForm.value.day,
      hour: this.citationForm.value.hour,
      site: this.citationForm.value.site,
      phone: this.citationForm.value.phone,
      patient_id: Number(this.patient.id),
      first_name: this.patient.first_name,
      last_name: this.patient.last_name,
      phonePatient: this.patient.phone,
      document_number: this.patient.document_number
    }
    this.rhbService.generatePdf(formData).subscribe((response: Blob) => {
      $('#citModal').modal('hide');
      this.updateMethod.emit();
    });
  }
}
