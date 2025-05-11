import { Routes } from '@angular/router';
import { OrdreListComponent } from './ordre-list/ordre-list.component';
import { OrdreFormComponent } from './ordre-form/ordre-form.component';

export const ORDRE_ROUTES: Routes = [
  { path: '', component: OrdreListComponent },
  { path: 'new', component: OrdreFormComponent },
  { path: 'edit/:id', component: OrdreFormComponent }
];