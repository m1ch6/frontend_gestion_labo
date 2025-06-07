import api from '../../../services/api';
import {
  MiniprojectResponseDTO,
  MiniprojectSummaryResponse,
  MiniprojectCreateDTO,
  MiniprojectUpdateDTO,
  EvaluationDTO,
  ProjectStatus,
} from '../../../types';

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export async function getMiniprojects(params: {
  page?: number;
  size?: number;
  status?: ProjectStatus;
}): Promise<PageResponse<MiniprojectSummaryResponse>> {
  const { data } = await api.get('/miniprojects', { params });
  return data;
}

export async function getMiniprojectById(id: number): Promise<MiniprojectResponseDTO> {
  const { data } = await api.get(`/miniprojects/${id}`);
  return data;
}

export async function createMiniproject(
  dto: MiniprojectCreateDTO
): Promise<MiniprojectResponseDTO> {
  const { data } = await api.post('/miniprojects', dto);
  return data;
}

export async function updateMiniproject(
  id: number,
  dto: MiniprojectUpdateDTO
): Promise<MiniprojectResponseDTO> {
  const { data } = await api.put(`/miniprojects/${id}`, dto);
  return data;
}

export async function deleteMiniproject(id: number): Promise<void> {
  await api.delete(`/miniprojects/${id}`);
}

export async function uploadDocument(
  miniprojectId: number,
  file: File
): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  
  await api.post(`/miniprojects/${miniprojectId}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export async function validateMiniproject(id: number): Promise<void> {
  await api.put(`/miniprojects/${id}/validate`);
}

export async function assignSupervisor(
  miniprojectId: number,
  teacherId: number
): Promise<void> {
  await api.put(`/miniprojects/${miniprojectId}/assign-supervisor`, null, {
    params: { teacherId },
  });
}

export async function evaluateMiniproject(
  id: number,
  evaluation: EvaluationDTO
): Promise<void> {
  await api.put(`/miniprojects/${id}/evaluate`, evaluation);
}
