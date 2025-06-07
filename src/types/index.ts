// src/types/index.ts

// Enums
export enum ProjectStatus {
    SUBMITTED = 'SUBMITTED',
    VALIDATED = 'VALIDATED',
    ASSIGNED = 'ASSIGNED',
    EVALUATED = 'EVALUATED',
    REJECTED = 'REJECTED'
  }
  
  export enum ThesisStatus {
    DRAFT = 'DRAFT',
    SUBMITTED = 'SUBMITTED',
    VALIDATED = 'VALIDATED',
    DEFENSE_SCHEDULED = 'DEFENSE_SCHEDULED',
    DEFENDED = 'DEFENDED',
    REJECTED = 'REJECTED'
  }
  
  // Summary Response Types
  export interface StudentSummaryResponse {
    id: number;
    matricule: string;
    fullName: string;
    promotion: string;
    speciality: string;
  }
  
  export interface TeacherSummaryResponse {
    id: number;
    fullName: string;
    grade: string;
    department: string;
  }
  
  export interface DocumentResponse {
    id: number;
    fileName: string;
    contentType: string;
    size: number;
    uploadDate: string;
  }
  
  // Miniproject Types
  export interface MiniprojectCreateDTO {
    title: string;
    description: string;
  }
  
  export interface MiniprojectUpdateDTO {
    title?: string;
    description?: string;
  }
  
  export interface MiniprojectResponseDTO {
    id: number;
    title: string;
    description: string;
    status: ProjectStatus;
    grade?: number;
    feedback?: string;
    createdAt: string;
    updatedAt: string;
    student: StudentSummaryResponse;
    supervisor?: TeacherSummaryResponse;
    documents: DocumentResponse[];
  }
  
  export interface MiniprojectSummaryResponse {
    id: number;
    title: string;
    status: ProjectStatus;
    grade?: number;
    studentName: string;
  }
  
  export interface EvaluationDTO {
    grade: number;
    feedback?: string;
  }
  
  // Thesis Types
  export interface ThesisCreateDTO {
    title: string;
    summary: string;
    keywords: string[];
  }
  
  export interface DefenseResponse {
    id: number;
    defenseDate: string;
    location: string;
    jury: TeacherSummaryResponse[];
    grade?: number;
    observations?: string;
  }
  
  export interface ThesisResponseDTO {
    id: number;
    title: string;
    summary: string;
    keywords: string[];
    status: ThesisStatus;
    statusDisplay: string;
    version: number;
    submissionDate?: string;
    validationDate?: string;
    finalGrade?: number;
    student: StudentSummaryResponse;
    supervisor?: TeacherSummaryResponse;
    defense?: DefenseResponse;
    documents: DocumentResponse[];
  }
  
  export interface ThesisSummaryResponse {
    id: number;
    title: string;
    status: ThesisStatus;
    validationDate?: string;
    studentName: string;
    supervisorName?: string;
  }
  
  export interface DefenseScheduleDTO {
    defenseDate: string;
    location: string;
    juryIds: number[];
  }
  
  export interface DefenseResultDTO {
    grade: number;
    feedback?: string;
  }
  
  // File Types
  export interface FileDTO {
    fileName: string;
    contentType: string;
    bytes: Uint8Array;
  }
  
  // User Types
  export interface User {
    id: number;
    username: string;
    email: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
    firstName: string;
    lastName: string;
  }
  
  // Auth Types
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
    expiresIn: number;
  }
  