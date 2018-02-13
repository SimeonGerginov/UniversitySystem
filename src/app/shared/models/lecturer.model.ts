export class Lecturer {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  roles: [ string ];
  requiredCourses: [ {} ];
  optionalCourses: [ {} ];
}
