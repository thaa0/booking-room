import { api } from './api';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  tipo: string;
  token: string;
  usuarioId: string;
}

export interface CadastroRequest {
  nomeCompleto: string;
  whatsapp: string;
  email: string;
  senha: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/v1/auth/login', data);
    return response.data;
  },

  cadastro: async (data: CadastroRequest): Promise<void> => {
    await api.post('/v1/auth/cadastro', data);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
  },
};
