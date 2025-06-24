// Use case interface for Gestion des Besoins Estudiantins system

export type GDBRole = 'Étudiant' | 'Enseignant' | 'Administrateur' | 'Système';

export interface GDBUseCase {
  role: GDBRole;
  actions: string[];
}

export const gdbUseCases: GDBUseCase[] = [
  {
    role: 'Étudiant',
    actions: [
      'Soumettre miniprojet',
      'Consulter état miniprojet',
      'Déposer mémoire',
      'Versionner mémoire',
      'Consulter dashboard personnel',
    ],
  },
  {
    role: 'Enseignant',
    actions: [
      'Valider miniprojet',
      'Attribuer encadrant',
      'Évaluer miniprojet',
      'Valider mémoire',
      'Noter mémoire',
      'Programmer soutenance',
    ],
  },
  {
    role: 'Administrateur',
    actions: [
      'Gérer notifications',
      'Gérer utilisateurs',
      'Configurer deadlines',
      'Générer statistiques',
      'Exporter rapports',
    ],
  },
  {
    role: 'Système',
    actions: [
      'Configurer deadlines',
    ],
  },
];
