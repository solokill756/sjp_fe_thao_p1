export interface User {
  id: string;
  username: string;
  email: string;
  password?: string | null;
  role: 'customer' | 'vendor';
}
