import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth.service';
import type { LoginRequest } from '../services/auth.service';

interface AuthContextData {
  isAuthenticated: boolean;
  usuarioId: string | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsuarioId = localStorage.getItem('usuarioId');

    if (token && savedUsuarioId) {
      setIsAuthenticated(true);
      setUsuarioId(savedUsuarioId);
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await authService.login(data);
    
    localStorage.setItem('token', response.token);
    localStorage.setItem('usuarioId', response.usuarioId);
    
    setIsAuthenticated(true);
    setUsuarioId(response.usuarioId);
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUsuarioId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuarioId, login, logout, loading }}>
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
