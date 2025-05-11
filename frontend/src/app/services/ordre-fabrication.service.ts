import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdreRequestDto } from '../models/dto/ordre-request.dto';
import { OrdreResponseDto } from '../models/dto/ordre-response.dto';

@Injectable({
  providedIn: 'root'
})
export class OrdreFabricationService {
  private apiUrl = 'http://localhost:8081/api/ordres';

  constructor(private http: HttpClient) { }

  getAllOrdres(): Observable<OrdreResponseDto[]> {
    return this.http.get<OrdreResponseDto[]>(this.apiUrl);
  }

  getOrdreById(id: number): Observable<OrdreResponseDto> {
    return this.http.get<OrdreResponseDto>(`${this.apiUrl}/${id}`);
  }

  createOrdre(ordre: OrdreRequestDto): Observable<OrdreResponseDto> {
    return this.http.post<OrdreResponseDto>(this.apiUrl, ordre);
  }

  updateOrdre(id: number, ordre: OrdreRequestDto): Observable<OrdreResponseDto> {
    return this.http.put<OrdreResponseDto>(`${this.apiUrl}/${id}`, ordre);
  }

  deleteOrdre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOrdresByEtat(etat: string): Observable<OrdreResponseDto[]> {
    return this.http.get<OrdreResponseDto[]>(`${this.apiUrl}/etat/${etat}`);
  }
}