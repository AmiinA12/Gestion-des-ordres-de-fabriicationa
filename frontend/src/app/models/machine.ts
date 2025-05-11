export interface Machine {
    id?: number;
    nom: string;
    etat: string;
    derniereMaintenance?: Date;
}