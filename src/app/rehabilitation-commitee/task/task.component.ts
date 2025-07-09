import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RhbService } from '../../rhb.service';

declare var $: any;

@Component({
  selector: 'app-task',
  imports: [ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  taskForm: FormGroup;
  selectedFile: File | null = null;

  @Input() patientRecommendationId!: any;

  @Output() updateMethod = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private apiService: RhbService) {
    this.taskForm = this.fb.group({
      file: [''],
      description: ['']
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(){
    if (this.taskForm.invalid || !this.selectedFile) {
      alert('Formulario inválido o imagen no seleccionada.');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.taskForm.get('description')?.value);
    formData.append('file', this.selectedFile);
    formData.append('patient_recommendation_id',this.patientRecommendationId);

    this.apiService.createTask(formData).subscribe( response => {
      $('#taskModal').modal('hide');
      this.updateMethod.emit();
    })
  }

  closeModal() {
    $('#taskModal').modal('hide');
  }

}
