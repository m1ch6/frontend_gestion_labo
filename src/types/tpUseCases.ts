// Use case interface for Gestion des TP system

export type TPRole =
  | 'Administrateur'
  | 'Technicien'
  | 'ResponsableLabo'
  | 'Enseignant'
  | 'Etudiant';

export interface TPUseCase {
  role: TPRole;
  actions: string[];
}

export const tpUseCases: TPUseCase[] = [
  {
    role: 'Administrateur',
    actions: [
      'Gérer les laboratoires',
      'Gérer les utilisateurs',
      'Générer des rapports globaux',
    ],
  },
  {
    role: 'Technicien',
    actions: [
      'Gérer les alertes (pannes)',
      'Gérer le catalogue matériel',
      'Gérer le calendrier',
    ],
  },
  {
    role: 'ResponsableLabo',
    actions: [
      'Attribuer des groupes',
      'Planifier les séances de TP',
      'Gérer le catalogue matériel',
      'Évaluer les rapports',
    ],
  },
  {
    role: 'Enseignant',
    actions: [
      'Utiliser le forum de discussion',
      'Consulter les résultats',
      'Consulter les notifications',
      'Évaluer les rapports',
    ],
  },
  {
    role: 'Etudiant',
    actions: [
      'Consulter les notifications',
      'Soumettre un rapport',
      'Participer à un TP',
    ],
  },
];

// For advanced use, you can add more structure to actions (e.g., parameters, permissions, etc.)
