import { Component, Output, EventEmitter, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-add-activities',
  imports: [ReactiveFormsModule],
  templateUrl: './add-activities.component.html',
  styleUrl: './add-activities.component.css'
})
export class AddActivitiesComponent  {
  actForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.actForm = this.fb.group({
      plan: ['']
    })
  }

  @Output() updateParent = new EventEmitter<void>();

  closeModal() {
    $('#rehabModal').modal('hide');
  }

  onSubmit() {
    this.updateParent.emit(this.actForm.value.plan);
    $('#rehabModal').modal('hide');
  }
}
