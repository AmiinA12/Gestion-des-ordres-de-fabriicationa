import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe';
import { EmployeResponseDto } from '../models/dto/employe-response.dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8081/api/employes';

  constructor(private http: HttpClient) { }

  getAllEmployes(): Observable<EmployeResponseDto[]> {
    return this.http.get<EmployeResponseDto[]>(this.apiUrl);
  }

  getEmployeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/${id}`);
  }

  createEmploye(employe: Employe): Observable<EmployeResponseDto> {
    return this.http.post<EmployeResponseDto>(this.apiUrl, employe);
  }

  updateEmploye(id: number, employe: Employe): Observable<EmployeResponseDto> {
    return this.http.put<EmployeResponseDto>(`${this.apiUrl}/${id}`, employe);
  }

  deleteEmploye(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEmployesByPoste(poste: string): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.apiUrl}/poste/${poste}`);
  }

  assignerMachine(employeId: number, machineId: number): Observable<Employe> {
    return this.http.post<Employe>(`${this.apiUrl}/${employeId}/assigner`, machineId);
  }
}