export interface User {
  id: string;
  username: string;
  email: string;
  password?: string | null;
  role: 'customer' | 'admin';
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
}

export function getUserWithoutPassword(user: User) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
