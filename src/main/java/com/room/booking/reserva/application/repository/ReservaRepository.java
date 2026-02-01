package com.room.booking.reserva.application.repository;

import com.room.booking.reserva.domain.Reserva;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface ReservaRepository {
    void registraReserva(Reserva reserva);
    boolean verificaConflitoReserva(UUID salaId, LocalDate dataReserva, LocalTime horaInicio, LocalTime horaFim);
    List<Reserva> listarReservas();
    void cancelarReserva(UUID reservaId);
}