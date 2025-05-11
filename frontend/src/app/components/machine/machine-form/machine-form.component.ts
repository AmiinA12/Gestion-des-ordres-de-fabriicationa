import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from '../../../services/machine.service';
import { Machine } from '../../../models/machine';

@Component({
  selector: 'app-machine-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
    templateUrl: './machine-form.component.html',
    styleUrls: ['./machine-form.component.scss'],
})
export class MachineFormComponent implements OnInit {
  machine: Machine = {
    nom: '',
    etat: 'Disponible',
    derniereMaintenance: new Date()
  };
  isEditMode = false;

  constructor(
    private machineService: MachineService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadMachine(+id);
    }
  }

  loadMachine(id: number): void {
    this.machineService.getMachineById(id).subscribe({
      next: (data) => {
        this.machine = {
          ...data,
          derniereMaintenance: data.derniereMaintenance ? new Date(data.derniereMaintenance) : new Date()
        };
      },
      error: (error) => console.error('Erreur lors du chargement de la machine:', error)
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      const id = this.route.snapshot.params['id'];
      this.machineService.updateMachine(id, this.machine).subscribe({
        next: () => this.router.navigate(['/machines']),
        error: (error) => console.error('Erreur lors de la mise à jour:', error)
      });
    } else {
      this.machineService.createMachine(this.machine).subscribe({
        next: () => this.router.navigate(['/machines']),
        error: (error) => console.error('Erreur lors de la création:', error)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/machines']);
  }
}