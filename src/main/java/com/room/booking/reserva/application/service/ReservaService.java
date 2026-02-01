package com.room.booking.reserva.application.service;

import com.room.booking.reserva.application.controller.dto.ReservaListResponse;
import com.room.booking.reserva.application.controller.dto.ReservaRequest;

import java.util.List;
import java.util.UUID;

public interface ReservaService {
    void registraReserva(ReservaRequest request, String salaId, UUID id);
    List<ReservaListResponse> listarReservas();
    List<ReservaListResponse> listarReservasPorSalaId(UUID salaId);
    void cancelarReserva(UUID reservaId);
    void checkIn(UUID reservaId);
    void checkOut(UUID reservaId);
}
