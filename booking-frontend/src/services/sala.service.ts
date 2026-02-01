import { api } from './api';

export interface Sala {
  idSala: string;
  nome: string;
  capacidade: number;
  localizacao: string;
  criadorId: string;
}

export interface CriarSalaRequest {
  nome: string;
  capacidade: number;
  localizacao: string;
}

export const salaService = {
  listarSalas: async (): Promise<Sala[]> => {
    const response = await api.get<Sala[]>('/v1/salas');
    return response.data;
  },

  criarSala: async (data: CriarSalaRequest): Promise<void> => {
    await api.post('/v1/salas', data);
  },

  deletarSala: async (salaId: string): Promise<void> => {
    await api.delete(`/v1/salas/${salaId}`);
  },
};
