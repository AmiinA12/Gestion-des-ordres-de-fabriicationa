import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/ordres', pathMatch: 'full' },
  { 
    path: 'ordres',
    loadChildren: () => import('./components/ordre-fabrication/ordre-fabrication.routes').then(m => m.ORDRE_ROUTES)
  },
  { 
    path: 'produits',
    loadChildren: () => import('./components/produit/produit.routes').then(m => m.PRODUIT_ROUTES)
  },
  { 
    path: 'machines',
    loadChildren: () => import('./components/machine/machine.routes').then(m => m.MACHINE_ROUTES)
  },
  { 
    path: 'employes',
    loadChildren: () => import('./components/employe/employe.routes').then(m => m.EMPLOYE_ROUTES)
  }
];
