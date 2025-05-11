import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MachineService } from '../../../services/machine.service';
import { Machine } from '../../../models/machine';

@Component({
  selector: 'app-machine-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit {
  machines: Machine[] = [];

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  loadMachines(): void {
    this.machineService.getAllMachines().subscribe({
      next: (data) => this.machines = data,
      error: (error) => console.error('Erreur lors du chargement des machines:', error)
    });
  }

  deleteMachine(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette machine ?')) {
      this.machineService.deleteMachine(id).subscribe({
        next: () => this.loadMachines(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }

  planifierMaintenance(id: number): void {
    const date = new Date();
    this.machineService.planifierMaintenance(id, date).subscribe({
      next: () => this.loadMachines(),
      error: (error) => console.error('Erreur lors de la planification de la maintenance:', error)
    });
  }
}