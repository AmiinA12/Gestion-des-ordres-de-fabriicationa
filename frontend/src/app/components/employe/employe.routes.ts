import { Routes } from '@angular/router';
import { EmployeListComponent } from './employe-list/employe-list.component';
import { EmployeFormComponent } from './employe-form/employe-form.component';

export const EMPLOYE_ROUTES: Routes = [
  { path: '', component: EmployeListComponent },
  { path: 'new', component: EmployeFormComponent },
  { path: 'edit/:id', component: EmployeFormComponent }
];