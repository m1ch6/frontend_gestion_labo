// Types for TP backend entities

export interface Laboratoire {
  idLabo: number;
  nom: string;
  domaine: string;
  responsables?: ResponsableLabo[];
  seancesTP?: SeanceTP[];
  materiels?: Materiel[];
}

export interface Materiel {
  idMateriel: number;
  nom: string;
  quantite: number;
  localisation: string;
  etat: EtatMateriel;
  laboratoire: Laboratoire;
}

export enum EtatMateriel {
  DISPONIBLE = 'DISPONIBLE',
  RESERVE = 'RESERVE',
  EN_UTILISATION = 'EN_UTILISATION',
  EN_PANNE = 'EN_PANNE',
  EN_MAINTENANCE = 'EN_MAINTENANCE',
}

export interface SeanceTP {
  idSeance: number;
  sujet: string;
  dateHeureDebut: string;
  dateHeureFin: string;
  laboratoire: Laboratoire;
  reservations?: Reservation[];
  participants?: Etudiant[];
}

export interface Reservation {
  // Define fields as needed
}

export interface Etudiant {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  seancesTP?: SeanceTP[];
  rapportsSoumis?: Rapport[];
}

export interface Rapport {
  idRapport: number;
  cheminFichier: string;
  note?: number;
  commentaires?: string;
  dateSoumission: string;
  auteur: Etudiant;
  seanceTP: SeanceTP;
}

export interface ResponsableLabo {
  // Define fields as needed
}
