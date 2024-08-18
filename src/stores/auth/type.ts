import { SingnUpFormInput } from '#/components/signup/SignupForm';

export interface SignupState {
  user: SingnUpFormInput | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
