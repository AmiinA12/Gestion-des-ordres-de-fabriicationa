export interface OrdreRequestDto {
    projet: string;
    quantite: number;
    date: Date;
    etat: string;
    produitId: number;
    machineId: number;
    employeId?: number;
}