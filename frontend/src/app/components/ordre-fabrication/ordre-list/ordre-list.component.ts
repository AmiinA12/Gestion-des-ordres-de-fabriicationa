import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdreFabricationService } from '../../../services/ordre-fabrication.service';
import { OrdreResponseDto } from '../../../models/dto/ordre-response.dto';
import { ErrorComponent } from '../../shared/error/error.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-ordre-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorComponent, LoadingSpinnerComponent],
  templateUrl: './ordre-list.component.html',
  styleUrls: ['./ordre-list.component.scss']
})
export class OrdreListComponent implements OnInit {
  ordres: OrdreResponseDto[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private ordreService: OrdreFabricationService) {}

  ngOnInit(): void {
    this.loadOrdres();
  }

  loadOrdres(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.ordreService.getAllOrdres().subscribe({
      next: (data) => {
        this.ordres = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des ordres: ' + error.message;
        this.isLoading = false;
        console.error('Erreur lors du chargement des ordres:', error);
      }
    });
  }

  deleteOrdre(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet ordre de fabrication ?')) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.ordreService.deleteOrdre(id).subscribe({
        next: () => {
          this.loadOrdres();
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression: ' + error.message;
          this.isLoading = false;
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
}