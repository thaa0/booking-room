import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CriarReservaRequest } from '../services/reserva.service';
import type { Sala } from '../services/sala.service';

interface ModalReservarSalaProps {
  isOpen: boolean;
  sala: Sala | null;
  onClose: () => void;
  onReservaCriada: () => void;
  onSubmit: (salaId: string, data: CriarReservaRequest) => Promise<void>;
}

export const ModalReservarSala = ({ isOpen, sala, onClose, onReservaCriada, onSubmit }: ModalReservarSalaProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CriarReservaRequest>();

  const dataReserva = watch('dataReserva');
  const horaInicio = watch('horaInicio');
  const horaFim = watch('horaFim');

  const handleFormSubmit = async (data: CriarReservaRequest) => {
    if (!sala) return;

    try {
      setLoading(true);
      setError('');
      
      // Converter horários de HH:mm para HH:mm:ss
      const dataComSegundos = {
        ...data,
        horaInicio: data.horaInicio.length === 5 ? `${data.horaInicio}:00` : data.horaInicio,
        horaFim: data.horaFim.length === 5 ? `${data.horaFim}:00` : data.horaFim,
      };
      
      await onSubmit(sala.idSala, dataComSegundos);
      reset();
      onReservaCriada();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar reserva. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setError('');
    onClose();
  };

  // Data mínima = hoje
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen || !sala) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Reservar Sala</h2>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">{sala.nome}</p>
            <p className="text-xs text-gray-600">{sala.localizacao}</p>
            <p className="text-xs text-gray-500 mt-1">Capacidade: {sala.capacidade} pessoas</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Data da Reserva */}
          <div>
            <label htmlFor="dataReserva" className="block text-sm font-medium text-gray-700 mb-1">
              Data da Reserva *
            </label>
            <input
              {...register('dataReserva', {
                required: 'Data é obrigatória',
                validate: (value) => {
                  const selected = new Date(value + 'T00:00:00');
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  return selected >= now || 'Data não pode ser anterior a hoje';
                },
              })}
              type="date"
              id="dataReserva"
              min={today}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
            {errors.dataReserva && <p className="mt-1 text-sm text-red-600">{errors.dataReserva.message}</p>}
          </div>

          {/* Horários */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700 mb-1">
                Hora Início *
              </label>
              <input
                {...register('horaInicio', {
                  required: 'Hora de início é obrigatória',
                })}
                type="time"
                id="horaInicio"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
              {errors.horaInicio && <p className="mt-1 text-sm text-red-600">{errors.horaInicio.message}</p>}
            </div>

            <div>
              <label htmlFor="horaFim" className="block text-sm font-medium text-gray-700 mb-1">
                Hora Fim *
              </label>
              <input
                {...register('horaFim', {
                  required: 'Hora de fim é obrigatória',
                  validate: (value) => {
                    if (!horaInicio) return true;
                    return value > horaInicio || 'Hora fim deve ser posterior ao início';
                  },
                })}
                type="time"
                id="horaFim"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
              {errors.horaFim && <p className="mt-1 text-sm text-red-600">{errors.horaFim.message}</p>}
            </div>
          </div>

          {/* Número de Pessoas */}
          <div>
            <label htmlFor="numeroPessoas" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Pessoas *
            </label>
            <input
              {...register('numeroPessoas', {
                required: 'Número de pessoas é obrigatório',
                min: { value: 1, message: 'Mínimo 1 pessoa' },
                max: { value: sala.capacidade, message: `Máximo ${sala.capacidade} pessoas` },
                valueAsNumber: true,
              })}
              type="number"
              id="numeroPessoas"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder={`Máx: ${sala.capacidade}`}
            />
            {errors.numeroPessoas && <p className="mt-1 text-sm text-red-600">{errors.numeroPessoas.message}</p>}
          </div>

          {/* Nome do Cliente */}
          <div>
            <label htmlFor="nomeCliente" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Responsável *
            </label>
            <input
              {...register('nomeCliente', {
                required: 'Nome é obrigatório',
                minLength: { value: 3, message: 'Nome deve ter no mínimo 3 caracteres' },
              })}
              type="text"
              id="nomeCliente"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="Ex: João Silva"
            />
            {errors.nomeCliente && <p className="mt-1 text-sm text-red-600">{errors.nomeCliente.message}</p>}
          </div>

          {/* Contato do Cliente */}
          <div>
            <label htmlFor="contatoCliente" className="block text-sm font-medium text-gray-700 mb-1">
              Contato (WhatsApp) *
            </label>
            <input
              {...register('contatoCliente', {
                required: 'Contato é obrigatório',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: 'WhatsApp inválido (10-11 dígitos)',
                },
              })}
              type="tel"
              id="contatoCliente"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="11999999999"
            />
            {errors.contatoCliente && <p className="mt-1 text-sm text-red-600">{errors.contatoCliente.message}</p>}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Info */}
          {dataReserva && horaInicio && horaFim && (
            <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg text-sm">
              <p className="text-blue-900 font-semibold">Resumo da Reserva:</p>
              <p className="text-blue-800 mt-1">
                📅 {new Date(dataReserva + 'T00:00:00').toLocaleDateString('pt-BR')} das {horaInicio} às {horaFim}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Reservando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
