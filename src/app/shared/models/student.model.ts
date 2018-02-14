export class Student {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  roles: [ string ];
  requiredCourses: [ {} ];
  optionalCourses: [ {} ];
  specialty: string;
  currentCourseInUniversity: number;
  creditsToAchieve: number;
  marks: [ {} ];
  room?: string;
}
