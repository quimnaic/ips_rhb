import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RhbService } from '../../rhb.service';

declare var $: any;

@Component({
  selector: 'app-no-citation',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './no-citation.component.html',
  styleUrl: './no-citation.component.css'
})
export class NoCitationComponent {

  noCitationForm: FormGroup;

  @Input() citationId!: any;
  @Output() updateMethod = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private apiService: RhbService) {
    this.noCitationForm = this.fb.group({
      terapia: [''],
      cancelation: ['']
    })
  }

  onSubmit(){
    const formData = {
      id: this.citationId,
      ...this.noCitationForm.value
    }

    this.apiService.createNoCitation(formData).subscribe( resdata => {
      if(resdata){
        $('#noCitiModal').modal('hide');
        this.updateMethod.emit();
      }
    })
  }

  onClose(){
    $('#noCitiModal').modal('hide');
    this.updateMethod.emit();
  }
}
