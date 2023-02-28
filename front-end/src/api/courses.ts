import { instance } from "./axios-instance";

export interface Course {
  id?: string;
  title: string;
  workload: number;
  teacher: string;
}

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await instance.get<Course[]>(`courses`);
  return response.data;
};

export const fetchCourse = async (courseId: string): Promise<Course> => {
  const response = await instance.get<Course>(`courses/${courseId}`);
  return response.data;
};

export const addCourse = async (formData: Course): Promise<Course> => {
  const response = await instance.post<Course>(`courses`, formData);
  return response.data;
};

export const updateCourse = async (formData: Course): Promise<Course> => {
  const { id: courseId } = formData;
  const response = await instance.put<Course>(
    `courses/${courseId}`,
    formData
  );
  return response.data;
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  await instance.delete(`courses/${courseId}`);
};
