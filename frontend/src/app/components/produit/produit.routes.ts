import { Routes } from '@angular/router';
import { ProduitListComponent } from './produit-list/produit-list.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';

export const PRODUIT_ROUTES: Routes = [
  { path: '', component: ProduitListComponent },
  { path: 'new', component: ProduitFormComponent },
  { path: 'edit/:id', component: ProduitFormComponent }
];