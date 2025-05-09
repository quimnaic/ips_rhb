import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  listPatient = 'php artisan';

  //Arrays variables

  listGender = 'http://186.117.135.117:8700/ips/public/api/gender';
  listCompany = 'http://186.117.135.117:8700/ips/public/api/company';
  listPosition = 'http://186.117.135.117:8700/ips/public/api/position';
  listMaritalStatues = 'http://186.117.135.117:8700/ips/public/api/maritalStatues';
  listDocumentType = 'http://186.117.135.117:8700/ips/public/api/documentType';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<any> {
    return this.http.get<any>(this.listPatient);
  }

  storePatient(body: any): Observable<any> {
    return this.http.post<any>(this.listPatient, body)
  }

  putPatients(formData: any, id: any): Observable<any> {
    return this.http.put(this.listPatient + '/' + id, formData);
  }

  //Get variables 

  getGender(): Observable<any> {
    return this.http.get<any>(this.listGender);
  }

  getPosition(): Observable<any> {
    return this.http.get<any>(this.listPosition);
  }

  getCompany(): Observable<any> {
    return this.http.get<any>(this.listCompany);
  }

  getMaritalStatues(): Observable<any> {
    return this.http.get<any>(this.listMaritalStatues);
  }

  getDocumentType(): Observable<any> {
    return this.http.get<any>(this.listDocumentType);
  }
}
