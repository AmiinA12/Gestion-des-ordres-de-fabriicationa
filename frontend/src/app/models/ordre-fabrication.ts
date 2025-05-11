import { Employe } from './employe';
import { Machine } from './machine';
import { Produit } from './produit';

export interface OrdreFabrication {
    id?: number;
    projet: string;
    quantite: number;
    date: Date;
    etat: string;
    produit: Produit;
    machine: Machine;
    employe?: Employe;
}