import type { Reserva } from '../services/reserva.service';

interface CardReservaProps {
  reserva: Reserva;
  nomeSala?: string;
  onCancelar: (reservaId: string) => void;
  isCancelando: boolean;
  onCheckIn?: (reservaId: string) => void;
  onCheckOut?: (reservaId: string) => void;
  isProcessing?: boolean;
}

export const CardReserva = ({ 
  reserva, 
  nomeSala, 
  onCancelar, 
  isCancelando,
  onCheckIn,
  onCheckOut,
  isProcessing = false
}: CardReservaProps) => {
  const formatarData = (data: string) => {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const isPast = () => {
    const dataReserva = new Date(reserva.dataReserva + 'T' + reserva.horaFim);
    return dataReserva < new Date();
  };

  const isToday = () => {
    const hoje = new Date().toISOString().split('T')[0];
    return reserva.dataReserva === hoje;
  };

  const formatarDataHora = (dataHora: string) => {
    return new Date(dataHora).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 ${
      isPast() ? 'border-gray-400 opacity-75' : isToday() ? 'border-green-500' : 'border-primary-500'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">{nomeSala || 'Sala'}</h3>
            {isToday() && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                HOJE
              </span>
            )}
            {isPast() && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                FINALIZADA
              </span>
            )}
            {reserva.checkIn && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                ✓ CHECK-IN
              </span>
            )}
            {reserva.checkOut && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                ✓ CHECK-OUT
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">📅 {formatarData(reserva.dataReserva)}</p>
        </div>

        {/* Cancel Button */}
        {!isPast() && reserva.checkIn === null && (
          <button
            onClick={() => onCancelar(reserva.reservaId)}
            disabled={isCancelando}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Cancelar reserva"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-700">
            <span className="font-semibold">{reserva.horaInicio}</span> até{' '}
            <span className="font-semibold">{reserva.horaFim}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-gray-700">{reserva.nomeCliente}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-600">{reserva.contatoCliente}</span>
        </div>

        {reserva.numeroPessoas && (
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-gray-600">{reserva.numeroPessoas} pessoas</span>
          </div>
        )}

        {/* Check-in / Check-out Status */}
        {(reserva.checkIn || reserva.checkOut) && (
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {reserva.checkIn && (
              <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium">Check-in:</span>
                <span>{formatarDataHora(reserva.checkIn)}</span>
              </div>
            )}
            {reserva.checkOut && (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium">Check-out:</span>
                <span>{formatarDataHora(reserva.checkOut)}</span>
              </div>
            )}
          </div>
        )}

        {/* Check-in / Check-out Buttons */}
        {!isPast() && (onCheckIn || onCheckOut) && (
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            {onCheckIn && (
              <button
                onClick={() => onCheckIn(reserva.reservaId)}
                disabled={isProcessing || reserva.checkIn !== null}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                {reserva.checkIn ? 'Check-in Realizado' : 'Check-in'}
              </button>
            )}
            {onCheckOut && (
              <button
                onClick={() => onCheckOut(reserva.reservaId)}
                disabled={isProcessing || reserva.checkOut !== null}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {reserva.checkOut ? 'Check-out Realizado' : 'Check-out'}
              </button>
            )}
          </div>
        )}

        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">ID: {reserva.reservaId.substring(0, 13)}...</p>
        </div>
      </div>
    </div>
  );
};
