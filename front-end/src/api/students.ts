import { instance } from "./axios-instance";

export interface Student {
  id?: string;
  name: string;
  email: string;
  courseId: string;
}

export const fetchStudents = async (): Promise<Student[]> => {
  const response = await instance.get<Student[]>('students');
  return response.data;
};

export const addStudent = async (formData: Student): Promise<Student> => {
  const response = await instance.post<Student>(
    `students`,
    formData
  );
  return response.data;
};

export const updateStudent = async (formData: Student): Promise<Student> => {
  const { id: studentId } = formData;
  const response = await instance.put<Student>(
    `students/${studentId}`,
    formData
  );
  return response.data;
};

export const deleteStudent = async (studentId: string): Promise<void> => {
  await instance.delete(`students/${studentId}`);
};
