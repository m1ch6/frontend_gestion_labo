import api from '../../../services/api';
import { LoginRequest, AuthResponse, User } from '../../../types';

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/login', data);
  return res.data;
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get<User>('/auth/me');
  return res.data;
}
