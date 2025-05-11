import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ message }}
      <button type="button" class="btn-close" (click)="clearError()" aria-label="Close"></button>
    </div>
  `,
  styles: [`
    .alert {
      margin-bottom: 1rem;
    }
  `]
})
export class ErrorComponent {
  @Input() message: string = '';

  clearError(): void {
    this.message = '';
  }
}