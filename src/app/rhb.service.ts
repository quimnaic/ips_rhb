import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RhbService {

  pdfCitation = 'http://186.117.135.117:8700/ips/public/api/rhb/citation';
  citations = 'http://186.117.135.117:8700/ips/public/api/rhb/citation';
  pdfRecommendation = 'http://186.117.135.117:8700/ips/public/api/rhb/createRecommendation';
  pdfRecommendationPdf = 'http://186.117.135.117:8700/ips/public/api/rhb/createRecommendationPdf/';
  rhb = 'http://186.117.135.117:8700/ips/public/api/rhb';
  citationPdf = 'http://186.117.135.117:8700/ips/public/api/rhb/citationPdf';
  rhbPdf = 'http://186.117.135.117:8700/ips/public/api/rhb/pdfRhb';
  voyPdf = 'http://186.117.135.117:8700/ips/public/api/rhb/pdfVoy';
  rhbAct = 'http://186.117.135.117:8700/ips/public/api/rhb/act/';
  rhbActSave = 'http://186.117.135.117:8700/ips/public/api/rhb/actSave';
  rhbRecommendation = 'http://186.117.135.117:8700/ips/public/api/rhb/viewRecommendation/';
  rhbVoy = 'http://186.117.135.117:8700/ips/public/api/rhb/createVoy';
  rhbVoyView = 'http://186.117.135.117:8700/ips/public/api/rhb/viewVoy/';
  rhbVoyUpdate = 'http://186.117.135.117:8700/ips/public/api/rhb/updateVoy';

  private patientSource = new BehaviorSubject<any>(null); // Estado inicial vacío
  currentPatient = this.patientSource.asObservable(); // Observable para suscribirse

  setPatient(patient: any) {
    this.patientSource.next(patient); // Actualizar el paciente
  }

  constructor(private http: HttpClient) { }

  generatePdf(data: any): Observable<Blob> {
    return this.http.post(this.pdfCitation, data, { responseType: 'blob' });
  }

  getCitation(id: any): Observable<any> {
    return this.http.get<any>(this.citations + '/' + id);
  }

  getRecommendation(formData: any): Observable<Blob> {
    return this.http.post(this.pdfRecommendation, formData,{ responseType: 'blob' });
  }

  getRecommendationPdf(id: any): Observable<Blob> {
    return this.http.get(this.pdfRecommendationPdf + id,{ responseType: 'blob' });
  }

  postRhb(formData: any): Observable<any> {
    return this.http.post(this.rhb, formData);
  }

  putRhb(formData: any, id: number): Observable<any> {
    return this.http.put(this.rhb + '/' + id, formData);
  }

  getCitationPdf(formData: any): Observable<Blob> {
    return this.http.post(this.citationPdf, formData, { responseType: 'blob'});
  }

  getRhbPdf(formData: any): Observable<Blob> {
    return this.http.post(this.rhbPdf, formData,{ responseType: 'blob'});
  }

  getVoyPdf(): Observable<Blob> {
    return this.http.get(this.voyPdf + '/' + 5,  { responseType: 'blob'});
  }

  getRhb(id: any): Observable<any> {
    return this.http.get<any>(this.rhb + '/' + id);
  }

  getAct(id: any): Observable<any> {
    return this.http.get<any>(this.rhbAct + id);
  }

  getActSave(formData: any): Observable<any> {
    return this.http.post(this.rhbActSave, formData);
  }

  getRhbRecommendation(id: any): Observable<any> {
    return this.http.get(this.rhbRecommendation + id);
  }

  createVoy(formData: any): Observable<any> {
    return this.http.post(this.rhbVoy, formData);
  }

  getRhbVoy(id: any): Observable<any> {
    return this.http.get(this.rhbVoyView + id)
  }

  postRhbVoy(formData: any): Observable<any> {
    return this.http.post(this.rhbVoyUpdate, formData)
  }
}
