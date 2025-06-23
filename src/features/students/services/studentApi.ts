import api from '../../../services/api';

// Define the Student type (adjust fields as needed)
export interface Student {
  id?: number;
  name: string;
  email: string;
  // Add other fields as per your backend model
}

export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get('/students');
  return response.data;
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const createStudent = async (student: Student): Promise<Student> => {
  const response = await api.post('/students', student);
  return response.data;
};

export const updateStudent = async (id: number, student: Student): Promise<Student> => {
  const response = await api.put(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await api.delete(`/students/${id}`);
};
