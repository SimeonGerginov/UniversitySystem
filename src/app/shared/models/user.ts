export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  salt: string;
  hashedPass: string;
  roles: [string];
  profilePictureUrl: string;
}
