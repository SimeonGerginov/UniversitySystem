export class Course {
  id?: string;
  name: string;
  students: [{}];
  lecturers: [{}];
  credits: number;
  maxPlacesInCourse: number;
  availablePlacesInCourse: number;
  isRequired: boolean;
  homeworks: [{}];
  marks: [{}];
  comments: [{}];
}
