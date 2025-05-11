import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeService } from '../../../services/employe.service';
import { MachineService } from '../../../services/machine.service';
import { Machine } from '../../../models/machine';

@Component({
  selector: 'app-employe-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
    templateUrl: './employe-form.component.html',   
    styleUrls: ['./employe-form.component.scss'],
})
export class EmployeFormComponent implements OnInit {
  employe = {
    nom: '',
    poste: '',
    machineId: null as number | null
  };
  machines: Machine[] = [];
  isEditMode = false;

  constructor(
    private employeService: EmployeService,
    private machineService: MachineService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMachines();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadEmploye(+id);
    }
  }

  loadMachines(): void {
    this.machineService.getAllMachines().subscribe({
      next: (data) => this.machines = data,
      error: (error) => console.error('Erreur lors du chargement des machines:', error)
    });
  }

  loadEmploye(id: number): void {
    this.employeService.getEmployeById(id).subscribe({
      next: (data) => {
        this.employe = {
          nom: data.nom,
          poste: data.poste,
          machineId: data.machineAssignee?.id || null
        };
      },
      error: (error) => console.error('Erreur lors du chargement de l\'employé:', error)
    });
  }

  onSubmit(): void {
    const employeData = {
      nom: this.employe.nom,
      poste: this.employe.poste,
      machineId: this.employe.machineId
    };

    if (this.isEditMode) {
      const id = this.route.snapshot.params['id'];
      this.employeService.updateEmploye(id, employeData).subscribe({
        next: () => this.router.navigate(['/employes']),
        error: (error) => console.error('Erreur lors de la mise à jour:', error)
      });
    } else {
      this.employeService.createEmploye(employeData).subscribe({
        next: () => this.router.navigate(['/employes']),
        error: (error) => console.error('Erreur lors de la création:', error)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employes']);
  }
}