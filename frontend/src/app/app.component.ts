import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Gestion Ordres Fabrication</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/ordres" routerLinkActive="active">Ordres de Fabrication</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/produits" routerLinkActive="active">Produits</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/machines" routerLinkActive="active">Machines</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/employes" routerLinkActive="active">Employés</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .navbar { margin-bottom: 20px; }
  `]
})
export class AppComponent {
  title = 'Gestion Ordres Fabrication';
}
