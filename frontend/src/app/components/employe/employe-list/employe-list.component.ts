import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeService } from '../../../services/employe.service';
import { EmployeResponseDto } from '../../../models/dto/employe-response.dto';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
    templateUrl: './employe-list.component.html',
    styleUrls: ['./employe-list.component.scss']
})
export class EmployeListComponent implements OnInit {
  employes: EmployeResponseDto[] = [];

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getAllEmployes().subscribe({
      next: (data) => this.employes = data,
      error: (error) => console.error('Erreur lors du chargement des employés:', error)
    });
  }

  deleteEmploye(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeService.deleteEmploye(id).subscribe({
        next: () => this.loadEmployes(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }
}