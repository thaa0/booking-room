// Tipos globais da aplicação

export interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  whatsapp: string;
}

export interface Sala {
  id: string;
  nome: string;
  capacidade: number;
  recursos?: string[];
}

export interface Reserva {
  id: string;
  salaId: string;
  usuarioId: string;
  dataInicio: string;
  dataFim: string;
  descricao?: string;
  status: 'ATIVA' | 'CANCELADA' | 'FINALIZADA';
}

export interface AuthToken {
  tipo: string;
  token: string;
  usuarioId: string;
}

export interface ApiError {
  message: string;
  status: number;
  timestamp?: string;
}
