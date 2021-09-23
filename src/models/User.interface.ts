export interface User {
  name: string;
  email: string;
  password: string;
  permissions: Object;
  email_confirmed: boolean;
  superadmin: boolean;
}
