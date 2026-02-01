import type { Reserva } from '../services/reserva.service';

interface TabelaReservasProps {
  reservas: Reserva[];
  salas: Map<string, string>;
  onCancelar: (reservaId: string) => void;
  onCheckIn: (reservaId: string) => void;
  onCheckOut: (reservaId: string) => void;
  cancelandoId: string | null;
  processingId: string | null;
}

export const TabelaReservas = ({
  reservas,
  salas,
  onCancelar,
  onCheckIn,
  onCheckOut,
  cancelandoId,
  processingId,
}: TabelaReservasProps) => {
  const formatarData = (data: string) => {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatarDataHora = (dataHora: string) => {
    return new Date(dataHora).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isPast = (reserva: Reserva) => {
    const dataReserva = new Date(reserva.dataReserva + 'T' + reserva.horaFim);
    return dataReserva < new Date();
  };

  const isToday = (reserva: Reserva) => {
    const hoje = new Date().toISOString().split('T')[0];
    return reserva.dataReserva === hoje;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-primary-600 to-primary-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Sala
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Horário
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Responsável
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Contato
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Check-in
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Check-out
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservas.map((reserva, index) => (
              <tr
                key={reserva.reservaId}
                className={`${
                  isPast(reserva)
                    ? 'bg-gray-50 opacity-75'
                    : index % 2 === 0
                    ? 'bg-white hover:bg-gray-50'
                    : 'bg-gray-50 hover:bg-gray-100'
                } transition-colors`}
              >
                {/* Sala */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      isPast(reserva) ? 'bg-gray-400' : isToday(reserva) ? 'bg-green-500' : 'bg-primary-500'
                    }`}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {salas.get(reserva.salaId) || 'Sala'}
                      </div>
                      {isToday(reserva) && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Hoje
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Data */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatarData(reserva.dataReserva)}</div>
                </td>

                {/* Horário */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{reserva.horaInicio.substring(0, 5)}</span>
                    {' → '}
                    <span className="font-medium">{reserva.horaFim.substring(0, 5)}</span>
                  </div>
                </td>

                {/* Responsável */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <div className="text-sm text-gray-900">{reserva.nomeCliente}</div>
                  </div>
                </td>

                {/* Contato */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="text-sm text-gray-600">{reserva.contatoCliente}</div>
                  </div>
                </td>

                {/* Check-in */}
                <td className="px-6 py-4 text-center">
                  {reserva.checkIn ? (
                    <div className="inline-flex items-center text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg font-medium">
                      <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {formatarDataHora(reserva.checkIn)}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>

                {/* Check-out */}
                <td className="px-6 py-4 text-center">
                  {reserva.checkOut ? (
                    <div className="inline-flex items-center text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-lg font-medium">
                      <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {formatarDataHora(reserva.checkOut)}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>

                {/* Ações */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {!isPast(reserva) ? (
                    <div className="flex items-center justify-center gap-2">
                      {/* Check-in */}
                      <button
                        onClick={() => onCheckIn(reserva.reservaId)}
                        disabled={processingId === reserva.reservaId || reserva.checkIn !== null}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        title={reserva.checkIn ? 'Check-in realizado' : 'Fazer check-in'}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                        {reserva.checkIn ? '✓' : 'In'}
                      </button>

                      {/* Check-out */}
                      <button
                        onClick={() => onCheckOut(reserva.reservaId)}
                        disabled={processingId === reserva.reservaId || reserva.checkOut !== null}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        title={reserva.checkOut ? 'Check-out realizado' : 'Fazer check-out'}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        {reserva.checkOut ? '✓' : 'Out'}
                      </button>

                      {/* Cancelar */}
                      <button
                        onClick={() => onCancelar(reserva.reservaId)}
                        disabled={cancelandoId === reserva.reservaId || reserva.checkIn !== null}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        title={reserva.checkIn !== null ? 'Não é possível cancelar após check-in' : 'Cancelar reserva'}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
