import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { reservaService } from '../services/reserva.service';
import { salaService } from '../services/sala.service';
import type { Reserva } from '../services/reserva.service';
import type { Sala } from '../services/sala.service';
import { TabelaReservas } from '../components/TabelaReservas';

export const MinhasReservas = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [salas, setSalas] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelandoId, setCancelandoId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError('');

      // Carregar reservas e salas em paralelo
      const [reservasData, salasData] = await Promise.all([
        reservaService.listarTodasReservas(),
        salaService.listarSalas(),
      ]);

      setReservas(reservasData);

      // Criar mapa de salaId -> nomeSala
      const salasMap = new Map<string, string>();
      salasData.forEach((sala: Sala) => {
        salasMap.set(sala.idSala, sala.nome);
      });
      setSalas(salasMap);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleCancelarReserva = async (reservaId: string) => {
    if (!confirm('Tem certeza que deseja cancelar esta reserva?')) return;

    try {
      setCancelandoId(reservaId);
      await reservaService.cancelarReserva(reservaId);
      setSuccessMessage('Reserva cancelada com sucesso!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      await carregarDados();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao cancelar reserva');
    } finally {
      setCancelandoId(null);
    }
  };

  const handleCheckIn = async (reservaId: string) => {
    if (!confirm('Confirmar check-in para esta reserva?')) return;

    try {
      setProcessingId(reservaId);
      await reservaService.checkIn(reservaId);
      setSuccessMessage('Check-in realizado com sucesso!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      await carregarDados();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao realizar check-in');
    } finally {
      setProcessingId(null);
    }
  };

  const handleCheckOut = async (reservaId: string) => {
    if (!confirm('Confirmar check-out para esta reserva?')) return;

    try {
      setProcessingId(reservaId);
      await reservaService.checkOut(reservaId);
      setSuccessMessage('Check-out realizado com sucesso!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      await carregarDados();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao realizar check-out');
    } finally {
      setProcessingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filtrar reservas futuras e passadas
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // Filtrar por termo de busca
  const reservasFiltradas = reservas.filter((r) => {
    if (!searchTerm) return true;
    
    const termoBusca = searchTerm.toLowerCase();
    return (
      r.nomeCliente.toLowerCase().includes(termoBusca) ||
      r.contatoCliente.includes(searchTerm) ||
      salas.get(r.salaId)?.toLowerCase().includes(termoBusca)
    );
  });

  const reservasFuturas = reservasFiltradas.filter((r) => {
    const dataReserva = new Date(r.dataReserva + 'T' + r.horaFim);
    return dataReserva >= hoje;
  });

  const reservasPassadas = reservasFiltradas.filter((r) => {
    const dataReserva = new Date(r.dataReserva + 'T' + r.horaFim);
    return dataReserva < hoje;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Booking Room</h1>
                <p className="text-xs text-gray-500">Minhas Reservas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/salas')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
              >
                Salas
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        )}

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Minhas Reservas</h2>
            <p className="text-gray-600 mt-1">Gerencie todas as suas reservas de salas</p>
          </div>
          <button
            onClick={() => navigate('/salas')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Reserva
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por responsável, contato ou sala..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600">
              {reservasFiltradas.length === 0 ? (
                <span className="text-red-600">Nenhuma reserva encontrada para "{searchTerm}"</span>
              ) : (
                <span>
                  Encontrado{reservasFiltradas.length === 1 ? '' : 's'} {reservasFiltradas.length} reserva
                  {reservasFiltradas.length === 1 ? '' : 's'}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-600">Carregando reservas...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && reservasFiltradas.length === 0 && !searchTerm && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma reserva encontrada</h3>
            <p className="text-gray-600 mb-6">Você ainda não fez nenhuma reserva de sala.</p>
            <button
              onClick={() => navigate('/salas')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Fazer Primeira Reserva
            </button>
          </div>
        )}

        {/* Empty Search State */}
        {!loading && !error && reservasFiltradas.length === 0 && searchTerm && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
            <p className="text-gray-600 mb-4">Não encontramos reservas com o termo "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Limpar busca
            </button>
          </div>
        )}

        {/* Reservas Futuras */}
        {!loading && !error && reservasFuturas.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Próximas Reservas ({reservasFuturas.length})
            </h3>
            <TabelaReservas
              reservas={reservasFuturas}
              salas={salas}
              onCancelar={handleCancelarReserva}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              cancelandoId={cancelandoId}
              processingId={processingId}
            />
          </div>
        )}

        {/* Reservas Passadas */}
        {!loading && !error && reservasPassadas.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Histórico ({reservasPassadas.length})
            </h3>
            <TabelaReservas
              reservas={reservasPassadas}
              salas={salas}
              onCancelar={handleCancelarReserva}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              cancelandoId={cancelandoId}
              processingId={processingId}
            />
          </div>
        )}

        {/* Stats */}
        {!loading && !error && reservas.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">{reservas.length}</p>
                <p className="text-gray-600 text-sm mt-1">Total de Reservas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{reservasFuturas.length}</p>
                <p className="text-gray-600 text-sm mt-1">Próximas Reservas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-600">{reservasPassadas.length}</p>
                <p className="text-gray-600 text-sm mt-1">Finalizadas</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
