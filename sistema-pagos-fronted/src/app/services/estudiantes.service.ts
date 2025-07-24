import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante, Pago } from '../models/estudiantes.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(private http: HttpClient) { }

  public getAllPagos(): Observable<Array<Pago>> {
    return this.http.get<Array<Pago>>(`${environment.backenHost}/pagos`);
  }
  public getAllEstudiantes(): Observable<Array<Estudiante>> {
    return this.http.get<Array<Estudiante>>(`${environment.backenHost}/estudiantes`);
  }
  public getPagosDeEstudiante(codigo: string): Observable<Array<Pago>> {
    return this.http.get<Array<Pago>>(`${environment.backenHost}/estudiante/${codigo}/pagos`);
  }
  public guardarPago(formData: any): Observable<Pago> {
    return this.http.post<Pago>(`${environment.backenHost}/pagos`, formData);
  }
}
