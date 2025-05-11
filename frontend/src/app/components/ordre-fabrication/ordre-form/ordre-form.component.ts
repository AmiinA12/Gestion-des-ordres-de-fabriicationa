import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdreFabricationService } from '../../../services/ordre-fabrication.service';
import { ProduitService } from '../../../services/produit.service';
import { MachineService } from '../../../services/machine.service';
import { EmployeService } from '../../../services/employe.service';
import { OrdreRequestDto } from '../../../models/dto/ordre-request.dto';
import { Produit } from '../../../models/produit';
import { Machine } from '../../../models/machine';
import { EmployeResponseDto } from '../../../models/dto/employe-response.dto';
import { ErrorComponent } from '../../shared/error/error.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-ordre-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorComponent, LoadingSpinnerComponent],

templateUrl: './ordre-form.component.html',
    styleUrls: ['./ordre-form.component.scss'],

})
export class OrdreFormComponent implements OnInit {
  ordre: OrdreRequestDto = {
    projet: '',
    quantite: 0,
    date: new Date(),
    etat: 'En attente',
    produitId: 0,
    machineId: 0
  };

  produits: Produit[] = [];
  machines: Machine[] = [];
  employes: EmployeResponseDto[] = [];
  isEditMode = false;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  loadingMessage = '';

  constructor(
    private ordreService: OrdreFabricationService,
    private produitService: ProduitService,
    private machineService: MachineService,
    private employeService: EmployeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadOrdre(id);
    }
  }

  loadData(): void {
    this.isLoading = true;
    this.loadingMessage = 'Chargement des données...';
    this.errorMessage = '';

    Promise.all([
      this.loadProduits(),
      this.loadMachines(),
      this.loadEmployes()
    ]).finally(() => {
      this.isLoading = false;
      this.loadingMessage = '';
    });
  }

  loadProduits(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.produitService.getAllProduits().subscribe({
        next: (data) => {
          this.produits = data;
          resolve();
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors du chargement des produits: ' + error.message;
          console.error('Erreur lors du chargement des produits:', error);
          reject(error);
        }
      });
    });
  }

  loadMachines(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.machineService.getAllMachines().subscribe({
        next: (data) => {
          this.machines = data;
          resolve();
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors du chargement des machines: ' + error.message;
          console.error('Erreur lors du chargement des machines:', error);
          reject(error);
        }
      });
    });
  }

  loadEmployes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.employeService.getAllEmployes().subscribe({
        next: (data) => {
          this.employes = data;
          resolve();
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors du chargement des employés: ' + error.message;
          console.error('Erreur lors du chargement des employés:', error);
          reject(error);
        }
      });
    });
  }

  loadOrdre(id: number): void {
    this.isLoading = true;
    this.loadingMessage = 'Chargement de l\'ordre...';
    this.errorMessage = '';

    this.ordreService.getOrdreById(id).subscribe({
      next: (data) => {
        this.ordre = {
          projet: data.projet,
          quantite: data.quantite,
          date: new Date(data.date),
          etat: data.etat,
          produitId: this.produits.find(p => p.nom === data.produitNom)?.id || 0,
          machineId: this.machines.find(m => m.nom === data.machineNom)?.id || 0,
          employeId: this.employes.find(e => e.nom === data.employeNom)?.id
        };
        this.isLoading = false;
        this.loadingMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement de l\'ordre: ' + error.message;
        console.error('Erreur lors du chargement de l\'ordre:', error);
        this.isLoading = false;
        this.loadingMessage = '';
      }
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    const action = this.isEditMode
      ? this.ordreService.updateOrdre(this.route.snapshot.params['id'], this.ordre)
      : this.ordreService.createOrdre(this.ordre);

    action.subscribe({
      next: () => {
        this.router.navigate(['/ordres']);
      },
      error: (error) => {
        this.errorMessage = `Erreur lors de ${this.isEditMode ? 'la mise à jour' : 'la création'}: ` + error.message;
        console.error(`Erreur lors de ${this.isEditMode ? 'la mise à jour' : 'la création'}:`, error);
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/ordres']);
  }
}