export type User = {
  id: string;
  userName: string;
  email: string;
  twoFactorEnabled: boolean;
  lastLogIn: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  authError: string | null;
};
