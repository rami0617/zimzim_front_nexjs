import { SingnUpFormInput } from '#/pages/SignUp';

export interface SignupState {
  user: SingnUpFormInput | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
