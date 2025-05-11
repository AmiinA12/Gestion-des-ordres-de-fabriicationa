export interface OrdreResponseDto {
    id: number;
    projet: string;
    quantite: number;
    date: Date;
    etat: string;
    produitNom: string;
    machineNom: string;
    employeNom?: string;
}