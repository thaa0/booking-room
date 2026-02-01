import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { salaService } from '../services/sala.service';
import { reservaService } from '../services/reserva.service';
import type { Sala, CriarSalaRequest } from '../services/sala.service';
import type { CriarReservaRequest } from '../services/reserva.service';
import { CardSala } from '../components/CardSala';
import { ModalCriarSala } from '../components/ModalCriarSala';
import { ModalReservarSala } from '../components/ModalReservarSala';

export const Salas = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReservaOpen, setIsModalReservaOpen] = useState(false);
  const [salaParaReservar, setSalaParaReservar] = useState<Sala | null>(null);
  const [deletandoId, setDeletandoId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const carregarSalas = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await salaService.listarSalas();
      setSalas(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar salas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSalas();
  }, []);

  const handleCriarSala = async (data: CriarSalaRequest) => {
    await salaService.criarSala(data);
    setSuccessMessage('Sala criada com sucesso!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCriarReserva = async (salaId: string, data: CriarReservaRequest) => {
    await reservaService.criarReserva(salaId, data);
    setSuccessMessage('Reserva criada com sucesso!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAbrirModalReserva = (sala: Sala) => {
    setSalaParaReservar(sala);
    setIsModalReservaOpen(true);
  };

  const handleFecharModalReserva = () => {
    setSalaParaReservar(null);
    setIsModalReservaOpen(false);
  };

  const handleDeletarSala = async (salaId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta sala?')) return;

    try {
      setDeletandoId(salaId);
      await salaService.deletarSala(salaId);
      await carregarSalas();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao excluir sala');
    } finally {
      setDeletandoId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Booking Room</h1>
                <p className="text-xs text-gray-500">Gerenciamento de Salas</p>
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

        {/* Title and Add Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Salas Disponíveis</h2>
            <p className="text-gray-600 mt-1">Gerencie e reserve salas para suas atividades</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nova Sala
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-600">Carregando salas...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && salas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma sala cadastrada</h3>
            <p className="text-gray-600 mb-6">Comece criando sua primeira sala!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Criar Primeira Sala
            </button>
          </div>
        )}

        {/* Salas Grid */}
        {!loading && !error && salas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salas.map((sala) => (
              <CardSala
                key={sala.idSala}
                sala={sala}
                onDelete={handleDeletarSala}
                onReservar={handleAbrirModalReserva}
                isDeletando={deletandoId === sala.idSala}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && !error && salas.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">{salas.length}</p>
                <p className="text-gray-600 text-sm mt-1">Total de Salas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">
                  {salas.reduce((acc, sala) => acc + sala.capacidade, 0)}
                </p>
                <p className="text-gray-600 text-sm mt-1">Capacidade Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">
                  {Math.round(salas.reduce((acc, sala) => acc + sala.capacidade, 0) / salas.length)}
                </p>
                <p className="text-gray-600 text-sm mt-1">Capacidade Média</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      <ModalCriarSala
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSalaCriada={carregarSalas}
        onSubmit={handleCriarSala}
      />

      {/* Modal Reserva */}
      <ModalReservarSala
        isOpen={isModalReservaOpen}
        sala={salaParaReservar}
        onClose={handleFecharModalReserva}
        onReservaCriada={() => {}}
        onSubmit={handleCriarReserva}
      />
    </div>
  );
};
