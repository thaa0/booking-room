import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CriarSalaRequest } from '../services/sala.service';

interface ModalCriarSalaProps {
  isOpen: boolean;
  onClose: () => void;
  onSalaCriada: () => void;
  onSubmit: (data: CriarSalaRequest) => Promise<void>;
}

export const ModalCriarSala = ({ isOpen, onClose, onSalaCriada, onSubmit }: ModalCriarSalaProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CriarSalaRequest>();

  const handleFormSubmit = async (data: CriarSalaRequest) => {
    try {
      setLoading(true);
      setError('');
      await onSubmit(data);
      reset();
      onSalaCriada();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar sala. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Nova Sala</h2>
          <p className="text-gray-600 text-sm mt-1">Preencha os dados da sala</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Sala *
            </label>
            <input
              {...register('nome', {
                required: 'Nome é obrigatório',
                minLength: { value: 3, message: 'Nome deve ter no mínimo 3 caracteres' },
              })}
              type="text"
              id="nome"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="Ex: Sala de Reunião"
            />
            {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
          </div>

          {/* Capacidade */}
          <div>
            <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700 mb-1">
              Capacidade *
            </label>
            <input
              {...register('capacidade', {
                required: 'Capacidade é obrigatória',
                min: { value: 1, message: 'Capacidade mínima é 1' },
                max: { value: 1000, message: 'Capacidade máxima é 1000' },
                valueAsNumber: true,
              })}
              type="number"
              id="capacidade"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="Ex: 10"
            />
            {errors.capacidade && <p className="mt-1 text-sm text-red-600">{errors.capacidade.message}</p>}
          </div>

          {/* Localização */}
          <div>
            <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700 mb-1">
              Localização *
            </label>
            <input
              {...register('localizacao', {
                required: 'Localização é obrigatória',
                minLength: { value: 3, message: 'Localização deve ter no mínimo 3 caracteres' },
              })}
              type="text"
              id="localizacao"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="Ex: Bloco A, Sala 101"
            />
            {errors.localizacao && <p className="mt-1 text-sm text-red-600">{errors.localizacao.message}</p>}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
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
              {loading ? 'Criando...' : 'Criar Sala'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
