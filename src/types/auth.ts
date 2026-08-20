export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
};

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}