export interface User {
  id: string;
  nickname: string;
}

export interface SignupState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface LoginPayload {
  id: string;
  password: string;
}
