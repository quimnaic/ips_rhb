import { Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { PreemploymentComponent } from './preemployment/preemployment.component';
import { RehabilitationCommiteeComponent } from './rehabilitation-commitee/rehabilitation-commitee.component';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './auth/user/user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path: 'patients', component: PatientsComponent},
    {path: 'employment', component: PreemploymentComponent},
    {path: 'rhb', component: RehabilitationCommiteeComponent},
    { path: 'users', component: UserComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
