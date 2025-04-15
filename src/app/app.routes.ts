import { Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { PreemploymentComponent } from './preemployment/preemployment.component';
import { RehabilitationCommiteeComponent } from './rehabilitation-commitee/rehabilitation-commitee.component';

export const routes: Routes = [
    {path: 'patients', component: PatientsComponent},
    {path: 'employment', component: PreemploymentComponent},
    {path: 'rhb', component: RehabilitationCommiteeComponent},
    { path: '', redirectTo: '/patients', pathMatch: 'full' },
    { path: '**', redirectTo: '/patients', pathMatch: 'full' },
];
