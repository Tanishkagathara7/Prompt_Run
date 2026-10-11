import { apiClient, setStoredSession, clearStoredSession, getStoredToken } from './client';
import { User } from '../types';

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}


export const authApi = {
  async login(email: string, pass: string): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/email', {
      email,
      password: pass,
      mode: 'login',
    });
    if (res.success && res.token) {
      setStoredSession(res.token, res.user);
    }
    return res;
  },

  async signup(
    name: string,
    email: string,
    pass: string,
    extra?: { role?: string; organization?: string; domainProfile?: Record<string, any> }
  ): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/email', {
      name,
      email,
      password: pass,
      mode: 'signup',
      role: extra?.role,
      organization: extra?.organization,
      domainProfile: extra?.domainProfile,
    });
    if (res.success && res.token) {
      setStoredSession(res.token, res.user);
    }
    return res;
  },


  async getMe(): Promise<{ success: boolean; user: User }> {
    return apiClient.get<{ success: boolean; user: User }>('/auth/me');
  },

  logout(): void {
    clearStoredSession();
  },

  hasToken(): boolean {
    return Boolean(getStoredToken());
  },
};
