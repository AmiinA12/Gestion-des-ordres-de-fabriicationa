import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="d-flex justify-content-center align-items-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <span *ngIf="message" class="ms-2">{{ message }}</span>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
}