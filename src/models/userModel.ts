export interface User {
  id: string;
  username: string;
  email: string;
  password?: string | null;
  role: 'customer' | 'vendor';
}

export function getUserWithoutPassword(user: User) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
