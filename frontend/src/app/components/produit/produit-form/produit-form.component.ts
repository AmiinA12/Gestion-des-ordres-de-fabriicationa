import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from '../../../services/produit.service';
import { Produit } from '../../../models/produit';

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss'],


})
export class ProduitFormComponent implements OnInit {
  produit: Produit = {
    nom: '',
    type: '',
    stock: 0,
    fournisseur: ''
  };
  isEditMode = false;

  constructor(
    private produitService: ProduitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadProduit(+id);
    }
  }

  loadProduit(id: number): void {
    this.produitService.getProduitById(id).subscribe({
      next: (data) => this.produit = {...data},
      error: (error) => console.error('Erreur lors du chargement du produit:', error)
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      const id = this.route.snapshot.params['id'];
      this.produitService.updateProduit(id, this.produit).subscribe({
        next: () => this.router.navigate(['/produits']),
        error: (error) => console.error('Erreur lors de la mise à jour:', error)
      });
    } else {
      this.produitService.createProduit(this.produit).subscribe({
        next: () => this.router.navigate(['/produits']),
        error: (error) => console.error('Erreur lors de la création:', error)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/produits']);
  }
}