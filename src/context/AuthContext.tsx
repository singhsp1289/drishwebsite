import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api, AdminUser } from '../services/apiClient.ts';

interface AuthContextType {
  user: AdminUser | null;
  idToken: string | null;
  loading: boolean;
  mustChangePassword: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<AdminUser>;
  changePassword: (newPassword: string, oldPassword?: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  idToken: null,
  loading: true,
  mustChangePassword: false,
  login: async () => { throw new Error('AuthContext not initialized'); },
  changePassword: async () => {},
  signOut: async () => {},
  getIdToken: async () => null,
  refreshUser: async () => {},
});

const TOKEN_KEY = 'drish_admin_token';
const USER_KEY = 'drish_admin_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [idToken, setIdToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Validate and refresh active session on mount
  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      setIdToken(null);
      setLoading(false);
      return;
    }

    try {
      const activeUser = await api.getMe(token);
      setUser(activeUser);
      setIdToken(token);
      localStorage.setItem(USER_KEY, JSON.stringify(activeUser));
    } catch (err) {
      console.warn('Session expired or invalid, resetting auth state:', err);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setIdToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (usernameOrEmail: string, password: string): Promise<AdminUser> => {
    setLoading(true);
    try {
      const res = await api.login(usernameOrEmail, password);
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      setIdToken(res.token);
      setUser(res.user);
      return res.user;
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword: string, oldPassword?: string): Promise<void> => {
    const token = idToken || localStorage.getItem(TOKEN_KEY) || '';
    const res = await api.changePassword(
      {
        newPassword,
        oldPassword,
        usernameOrEmail: user?.username || user?.email,
      },
      token
    );

    if (res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
      setIdToken(res.token);
    }

    if (res.user) {
      const updatedUser: AdminUser = {
        ...user!,
        ...res.user,
        mustChangePassword: false,
      };
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } else if (user) {
      const updatedUser: AdminUser = {
        ...user,
        mustChangePassword: false,
      };
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const signOut = async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setIdToken(null);
  };

  const getIdToken = async (): Promise<string | null> => {
    return idToken || localStorage.getItem(TOKEN_KEY);
  };

  const mustChangePassword = Boolean(user?.mustChangePassword);

  return (
    <AuthContext.Provider
      value={{
        user,
        idToken,
        loading,
        mustChangePassword,
        login,
        changePassword,
        signOut,
        getIdToken,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
