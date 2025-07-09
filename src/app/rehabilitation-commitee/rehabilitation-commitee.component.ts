import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddActivitiesComponent } from "./add-activities/add-activities.component";
import { RhbService } from '../rhb.service';
import { CitationComponent } from './citation/citation.component';
import { PatientService } from '../patient.service';
import { NoCitationComponent } from './no-citation/no-citation.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TaskComponent } from './task/task.component';

declare var $: any;

@Component({
  selector: 'app-rehabilitation-commitee',
  imports: [ReactiveFormsModule, CommonModule, AddActivitiesComponent, CitationComponent, NoCitationComponent, TaskComponent],
  templateUrl: './rehabilitation-commitee.component.html',
  styleUrl: './rehabilitation-commitee.component.css'
})
export class RehabilitationCommiteeComponent  implements OnInit{
  rhbForm: FormGroup;
  voyForm: FormGroup;
  obsForm: FormGroup;
  patientsForm: FormGroup;
  patientData: any;
  citations: any[] = [];
  activities: any[] = [];
  rhbFormValue: any[] =[];
  isEditMode = false;
  actRhb: any[] = [];
  codeAct: any;
  rhbCode: any;
  imagenes: { [key: string]: File } = {};
  isEditVoyMode: boolean = false;
  maritalStatuses: any[] = [];
  selectedRecommendationId: any;
  rhbTasks: any[] = [];
  task : boolean = false;

  helpsList = [
    { name: 'Bastón', value: 'cane' },
    { name: 'Muletas', value: 'crutches' },
    { name: 'Caminador', value: 'walker' },
    { name: 'Prótesis', value: 'prosthesis' },
    { name: 'Audífono', value: 'hearing_aid' },
    { name: 'Gafas', value: 'glasses' },
    { name: 'Bastón guía', value: 'guide_cane' },
    { name: 'Otros', value: 'others' }
  ];
  selectedCitationId: any;
  

  constructor(private rhbService: RhbService, private fb: FormBuilder, private patientService: PatientService, private router: Router) {

    this.voyForm = this.fb.group({
      empirical: [''],
      primary_school:[''],
      high_school:[''],
      high_school_mod:[''],
      technical:[''],
      professional:[''],
      skills_experience:[''],
      clinical_diagnosis_by_event:[''],
      non_work_related_event:[''],
      eps_ips:[''],
      afp:[''],
      total_disability_time:[''],
      job_linkage:[''],
      type_of_linkage:[''],
      company_start_date:[''],
      company_contact_position:[''],
      email:[''],
      company_phone:[''],
      purpose: [''],
      tasks_operations:[''],
      job_integration_method:[''],
      execution_time:[''],
      performance_component:[''],
      rehabilitation_treatment_received:[''],
      pcl_rating:[''],
      family_core_composition:[''],
      birth_dates_of_family:[''],
      household_provider:[''],
      averag_household_income:[''],
      current_living_arrangement:[''],
      washing:[''],
      washing_comment:[''],
      body_care:[''],
      body_care_comment:[''],
      hygiene:[''],
      hygiene_comment:[''],
      dressing:[''],
      dressing_comment:[''],
      undressing:[''],
      undressing_comment:[''],
      shoes:[''],
      shoes_comment:[''],
      eating:[''],
      eating_comment:[''],
      drinking:[''],
      drinking_comment:[''],
      health_care:[''],
      health_care_comment:[''],
      diet_control:[''],
      diet_control_comment:[''],
      verbal_message_reception:[''],
      verbal_message_reception_comment:[''],
      nonverbal_message_reception:[''],
      nonverbal_message_reception_comment:[''],
      sign_language_reception:[''],
      sign_language_reception_comment:[''],
      written_message_reception:[''],
      written_message_reception_comment:[''],
      speech:[''],
      speech_comment:[''],
      nonverbal_message_production:[''],
      nonverbal_message_production_comment:[''],
      written_message_production:[''],
      written_message_production_comment:[''],
      conversation:[''],
      conversation_comment:[''],
      discussion:[''],
      discussion_comment:[''],
      communication_devices_usage:[''],
      communication_devices_usage_comment:[''],
      changing_body_posture:[''],
      changing_body_posture_comment:[''],
      maintaining_body_position:[''],
      maintaining_body_position_comment:[''],
      lifting_and_carrying:[''],
      lifting_and_carrying_comment:[''],
      fine_hand_use:[''],
      fine_hand_use_comment:[''],
      hand_and_arm_use:[''],
      hand_and_arm_use_comment:[''],
      walking_and_moving:[''],
      walking_and_moving_comment:[''],
      moving_around_different_places:[''],
      moving_around_different_places_comment:[''],
      moving_with_equipment:[''],
      moving_with_equipment_comment:[''],
      using_transport_as_passenger:[''],
      using_transport_as_passenger_comment:[''],
      driving:[''],
      driving_comment:[''],
      see:[''],
      see_comment:[''],
      hear:[''],
      hear_comment:[''],
      learn_lwc:[''],
      learn_lwc_comment:[''],
      learn_calc:[''],
      learn_calc_comment:[''],
      think:[''],
      think_comment:[''],
      read:[''],
      read_comment:[''],
      write:[''],
      write_comment:[''],
      calculate:[''],
      calculate_comment:[''],
      problem_solving:[''],
      problem_solving_comment:[''],
      acquisition_living_place:[''],
      acquisition_living_place_comment:[''],
      acquisition_goods_services:[''],
      acquisition_goods_services_comment:[''],
      preparing_meals:[''],
      preparing_meals_comment:[''],
      doing_housework:[''],
      doing_housework_comment:[''],
      cleaning_home:[''],
      cleaning_home_comment:[''],
      caring_house_objects:[''],
      caring_house_objects_comment:[''],
      helping_others:[''],
      helping_others_comment:[''],
      maintaining_assistive_devices:[''],
      maintaining_assistive_devices_comment:[''],
      caring_animals:[''],
      caring_animals_comment:[''],
      occupational_concept:[''],
      occupational_guidance:[''],
      helps:this.fb.array([]),
      average_household_income:[''],
      currentLiving_arrangement:['']
    });

    this.rhbForm = this.fb.group({
      physiatrist_assessment: ['', Validators.required],
      physical_therapy_assessment: ['', Validators.required],
      occupational_therapy_assessment: ['', Validators.required],
      diagnosis: ['', Validators.required],
      conclusions: ['', Validators.required],
      functional_prognosis: ['', Validators.required],
      operational_prognosis: ['', Validators.required],
      pre_committee_procedures: ['', Validators.required],
      integral_readaptation_plan: ['', Validators.required],
      obs_rhb: ['', Validators.required]
    });

    this.obsForm = this.fb.group({
      observation: [''],
      imagen1: [''],
      imagen2: [''],
      imagen3: [''],
      time: [''],
      injured_segment: [''],
      recommendation_duration: [''],
      is_disabled: [''],
      return_to_work: [''],
      concept: ['']
    });

    this.patientsForm = this.fb.group({
      date_incapacity: [''],
      date_rhi: [''],
      marital_status_id: [''],
      children: [''],
      address: [''],
      phone: [''],
      companion_name: [''],
      dominance: [''],
      position_id: [''],
      nit: [''],
      address_company: ['']
    })
  }

  ngOnInit() {
    this.data();
  }

  data() {
    this.rhbService.currentPatient.subscribe(patient => {
      this.patientData = patient;
      this.patientsForm.patchValue({
        date_incapacity: this.patientData.date_incapacity,
        date_rhi: this.patientData.date_rhi,
        marital_status_id: this.patientData.marital_status_id,
        children: this.patientData.children,
        address: this.patientData.address,
        phone: this.patientData.phone,
        companion_name: this.patientData.companion_name,
        dominance: this.patientData.dominancem,
        nit: this.patientData.nit,
        position_id: this.patientData.position_id,
        address_company: this.patientData.address_company
      })
      this.rhbUpdate(); // Obtener el paciente actualizado
    });

    this.patientService.getMaritalStatues().subscribe(resdata => {
      this.maritalStatuses = resdata;
  });
  }  

  onUpdate(){
    const formData = {
      ...this.patientsForm.value
    }
    this.patientService.putPatients(formData, this.patientData.id).subscribe(response => {
      Swal.fire({
        toast: true,
        position: 'top-end',  // 🔥 Se muestra arriba a la derecha
        icon: 'success',
        title: 'Archivo subido correctamente',
        showConfirmButton: false,
        timer: 3000  // ⏳ Se cierra automáticamente en 3 segundos
      });
    }, error => {
      Swal.fire({
        toast: true,
        position: 'top-end',  // 🔥 Se muestra arriba a la derecha
        icon: 'error',
        title: 'Archivo subido correctamente',
        showConfirmButton: false,
        timer: 3000  // ⏳ Se cierra automáticamente en 3 segundos
      });
    });
  }

  rhbUpdate() {

    this.rhbService.getRhbRecommendation(this.patientData.id).subscribe(obsData => {
      if (obsData) {
        this.patchObsForm(obsData);
        console.log("Esto es de Recommendation" + obsData)
        this.task = true
      }
      if (obsData.task) {
        this.rhbTasks = obsData.task || [];
      }
    });

    this.rhbService.getRhbVoy(this.patientData.id).subscribe(voyData => {
      if (voyData) this.patchVoyForm(voyData);
    });

    this.rhbService.getCitation(this.patientData.id).subscribe(data => {
      this.citations = data;    
    });

    this.rhbService.getRhb(this.patientData.id).subscribe(rhbData => {
      if (rhbData && Object.keys(rhbData).length > 0) {
        this.isEditMode = true;
        this.rhbFormValue = rhbData;
        this.rhbCode = rhbData.code;
        this.patchRhbForm(rhbData);
        this.actUpdate(rhbData.code);
      } else {
        this.isEditMode = false;
      }
    });
  }

  patchRhbForm(data: any) {
    this.rhbForm.patchValue({
      physiatrist_assessment: data.physiatrist_assessment || '',
      physical_therapy_assessment: data.physical_therapy_assessment || '',
      occupational_therapy_assessment: data.occupational_therapy_assessment || '',
      diagnosis: data.diagnosis || '',
      conclusions: data.conclusions || '',
      functional_prognosis: data.functional_prognosis || '',
      operational_prognosis: data.operational_prognosis || '',
      pre_committee_procedures: data.pre_committee_procedures || '',
      integral_readaptation_plan: data.integral_readaptation_plan || '',
      obs_rhb: data.obs_rhb || ''
    });
  }
  
  patchObsForm(data: any) {
    this.obsForm.patchValue({
      observation: data.observation || '',
      time: data.time || '',
      injured_segment: data.injured_segment || '',
      recommendation_duration: data.recommendation_duration || '',
      is_disabled: data.is_disabled || '',
      return_to_work: data.return_to_work || '',
      concept: data.concept || ''
    });
    this.selectedRecommendationId = data.id;
  }
  
  patchVoyForm(data: any) {
    this.isEditVoyMode = true;
    this.voyForm.patchValue({
      ...data
    });
    const helps = data.helps || [];

    const helpsFormArray = this.voyForm.get('helps') as FormArray;
    helps.forEach((value: string) => {
      helpsFormArray.push(new FormControl(value));
    });
  }
  

  actUpdate(id: any) {
    this.codeAct = id;
    this.rhbService.getAct(id).subscribe(resdata => {
      this.actRhb = resdata;
      console.log(this.actRhb);
    })
  }

  onActSave(){
    const formData = {
      patient_id: this.patientData.id,
      code: this.codeAct
    }
    this.rhbService.getActSave(formData).subscribe();
  }

  onSubmit() {
    if(this.isEditMode){
      if (this.rhbForm.valid) {
        const formData = {
          patient_id: this.patientData.id,
          physiatrist_assessment: this.rhbForm.value.physiatrist_assessment,
          physical_therapy_assessment: this.rhbForm.value.physical_therapy_assessment,
          occupational_therapy_assessment: this.rhbForm.value.occupational_therapy_assessment,
          diagnosis: this.rhbForm.value.diagnosis,
          conclusions: this.rhbForm.value.conclusions,
          functional_prognosis: this.rhbForm.value.functional_prognosis,
          operational_prognosis: this.rhbForm.value.operational_prognosis,
          pre_committee_procedures: this.rhbForm.value.pre_committee_procedures,
          integral_readaptation_plan: this.rhbForm.value.integral_readaptation_plan,
          obs_rhb: this.rhbForm.value.obs_rhb
        };
        console.log('Formulario enviado', formData);
        this.rhbService.putRhb(formData, this.patientData.id).subscribe(resdata => {
          this.rhbUpdate();
        });
      } else {
        console.log('El formulario tiene errores.');
      }
    }else{
      if (this.rhbForm.valid) {
        const formData = {
          patient_id: this.patientData.id,
          physiatrist_assessment: this.rhbForm.value.physiatrist_assessment,
          physical_therapy_assessment: this.rhbForm.value.physical_therapy_assessment,
          occupational_therapy_assessment: this.rhbForm.value.occupational_therapy_assessment,
          diagnosis: this.rhbForm.value.diagnosis,
          conclusions: this.rhbForm.value.conclusions,
          functional_prognosis: this.rhbForm.value.functional_prognosis,
          operational_prognosis: this.rhbForm.value.operational_prognosis,
          pre_committee_procedures: this.rhbForm.value.pre_committee_procedures,
          integral_readaptation_plan: this.rhbForm.value.integral_readaptation_plan,
          obs_rhb: this.rhbForm.value.obs_rhb
        };
        console.log('Formulario enviado', formData);
        this.rhbService.postRhb(formData).subscribe();
      } else {
        console.log('El formulario tiene errores.');
      }
    }
  }

  openModalCitation(): void{
    this.patientData;
    $('#citModal').modal('show');
  }

  openModal(): void{
    this.patientData;
    $('#rehabModal').modal('show');
  }

  onFileSelected(event: any, key: string) {
    this.imagenes[key] = event.target.files[0];
  }

  openRecommendation(){
    const formData = new FormData();

    Object.keys(this.patientData).forEach(key => {
      formData.append(key, this.patientData[key]);
    });
    
    formData.append('observation', this.obsForm.value.observation);
    formData.append('time', this.obsForm.value.time);
    formData.append('injured_segment', this.obsForm.value.injured_segment);
    formData.append('recommendation_duration', this.obsForm.value.recommendation_duration);
    formData.append('is_disabled', this.obsForm.value.is_disabled);
    formData.append('return_to_work', this.obsForm.value.return_to_work);
    formData.append('concept', this.obsForm.value.concept);
    
    Object.keys(this.imagenes).forEach(key => {
      console.log(`Agregando imagen: ${this.imagenes[key].name}`);
      formData.append('imagenes[]', this.imagenes[key]); // Ojo con 'imagenes[]' si son múltiples archivos
    });
    this.rhbService.getRecommendation(formData).subscribe( resdata => {
      Swal.fire({
        toast: true,
        position: 'top-end',  // 🔥 Se muestra arriba a la derecha
        icon: 'success',
        title: 'Se actualizo correctamente las recomendaciones',
        showConfirmButton: false,
        timer: 3000  // ⏳ Se cierra automáticamente en 3 segundos
      });
      this.rhbUpdate();
    });
  }

  openVoy(){
    this.rhbService.getVoyPdf().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  onHelpChange(event: any) {
    const helpsArray = this.voyForm.get('helps') as FormArray;
    const value = event.target.value;
  
    if (event.target.checked) {
      helpsArray.push(new FormControl(value));
    } else {
      const index = helpsArray.controls.findIndex(x => x.value === value);
      if (index >= 0) {
        helpsArray.removeAt(index);
      }
    }
  }

  isChecked(value: string): boolean {
    const helpsArray = this.voyForm.get('helps') as FormArray;
    return helpsArray.value.includes(value);
  }  

  createVoy(){
    const formData = {
      ...this.voyForm.value,
      patient_id: this.patientData.id
    }

    if(this.isEditMode == true){
      this.rhbService.postRhbVoy(formData).subscribe();
      this.data();
    }else{
      this.rhbService.createVoy(formData).subscribe();
      this.data();
    }


  }

  onDownload(id: any){
    const formData ={
      id: id
    }
    this.rhbService.getCitationPdf(formData).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  onDownloadNo(id: any, patient_id: any){ 
    const formData ={
      id: id,
      patientId: patient_id
    }
    this.rhbService.getNoCitationPdf(formData).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  onNoCitation(id: any){
    this.selectedCitationId = id;
    $('#noCitiModal').modal('show');
  }

  onRhb() {
    const company = localStorage.getItem('company');
    const data = {
      ...this.rhbFormValue,
      ...this.patientData,
      ...this.actRhb[0],
      company
    }
    this.rhbService.getRhbPdf(data).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      Swal.fire({
        toast: true,
        position: 'top-end',  // 🔥 Se muestra arriba a la derecha
        icon: 'success',
        title: 'Archivo subido correctamente',
        showConfirmButton: false,
        timer: 3000  // ⏳ Se cierra automáticamente en 3 segundos
      });
      window.open(url);
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

  onRecommendationPdf(){
    this.rhbService.getRecommendationPdf(this.patientData.id).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  resetForm(){
    this.router.navigate(['/patients']);
  }

  addTask(): void {
    this.patientData;
    $('#taskModal').modal('show');
  }

  openImg(filePath: string): void {
    const url = 'http://186.117.135.117:8700/ips/public/' + filePath;
    window.open(url, '_blank');
  }

  deleteTask(id: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tarea permanentemente.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rhbService.deleteTask(id).subscribe(resdata => {
          if(resdata) this.rhbUpdate();
        });
      }
    });
  }

}
