import { api } from './api';

export interface Reserva {
  reservaId: string;
  salaId: string;
  dataReserva: string;
  horaInicio: string;
  horaFim: string;
  nomeCliente: string;
  contatoCliente: string;
  criadorId: string;
  numeroPessoas?: number;
  checkIn: string | null;
  checkOut: string | null;
}

export interface CriarReservaRequest {
  dataReserva: string;
  horaInicio: string;
  horaFim: string;
  numeroPessoas: number;
  nomeCliente: string;
  contatoCliente: string;
}

export const reservaService = {
  listarTodasReservas: async (): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>('/v1/reserva');
    return response.data;
  },

  listarReservasPorSala: async (salaId: string): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>(`/v1/reserva/sala/${salaId}`);
    return response.data;
  },

  criarReserva: async (salaId: string, data: CriarReservaRequest): Promise<void> => {
    await api.post(`/v1/reserva/sala/${salaId}`, data);
  },

  cancelarReserva: async (reservaId: string): Promise<void> => {
    await api.delete(`/v1/reserva/${reservaId}`);
  },

  checkIn: async (reservaId: string): Promise<void> => {
    await api.patch(`/v1/reserva/${reservaId}/check-in`);
  },

  checkOut: async (reservaId: string): Promise<void> => {
    await api.patch(`/v1/reserva/${reservaId}/check-out`);
  },
};
