'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types';
import { authApi } from '../api/auth';
import { USER_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../api/client';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    pass: string,
    extra?: { role?: string; organization?: string; domainProfile?: Record<string, any> }
  ) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronous initial state from localStorage prevents flash of unauthenticated state on page refresh
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(USER_STORAGE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const cached = localStorage.getItem(USER_STORAGE_KEY);
      // If session exists in localStorage, don't block render with loading spinner
      if (token && cached) return false;
      // If there is no token, loading is done
      if (!token) return false;
      return true;
    } catch {
      return true;
    }
  });

  const router = useRouter();

  const refreshUser = async () => {
    try {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      const cached = localStorage.getItem(USER_STORAGE_KEY);
      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch {}
      }
      // Re-verify with backend if online
      try {
        const res = await authApi.getMe();
        if (res.success && res.user) {
          setUser(res.user);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.user));
        }
      } catch (networkErr: any) {
        // If 401 Unauthorized specifically, token is genuinely revoked
        if (networkErr?.status === 401) {
          setUser(null);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(USER_STORAGE_KEY);
        } else {
          // Otherwise keep local session on server timeout / network drop
          console.warn('Backend unavailable during session verify, keeping cached user session:', networkErr?.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const initAuth = async () => {
      try {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!token) {
          if (active) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }
        const cached = localStorage.getItem(USER_STORAGE_KEY);
        if (cached && active) {
          try {
            setUser(JSON.parse(cached));
          } catch {}
        }
        // Try verifying with backend if available
        try {
          const res = await authApi.getMe();
          if (active && res.success && res.user) {
            setUser(res.user);
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.user));
          }
        } catch (networkErr: any) {
          // Keep the existing user session on refresh
          console.warn('Session verification fallback - maintaining current user session:', networkErr?.message);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void initAuth();

    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await authApi.login(email, pass);
    if (res.success && res.user) {
      setUser(res.user);
      router.push('/dashboard');
      return;
    }
    throw new Error(res.message || 'Invalid email or password.');
  };

  const signup = async (
    name: string,
    email: string,
    pass: string,
    extra?: { role?: string; organization?: string; domainProfile?: Record<string, any> }
  ) => {
    const res = await authApi.signup(name, email, pass, extra);
    if (res.success && res.user) {
      setUser(res.user);
      router.push('/dashboard');
      return;
    }
    throw new Error(res.message || 'Failed to create workspace.');
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
