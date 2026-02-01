package com.room.booking.reserva.application.service;

import com.room.booking.reserva.application.controller.dto.ReservaListResponse;
import com.room.booking.reserva.application.controller.dto.ReservaRequest;

import java.util.List;
import java.util.UUID;

public interface ReservaService {
    void registraReserva(ReservaRequest request, String salaId, UUID id);
    List<ReservaListResponse> listarReservas();
    void cancelarReserva(UUID reservaId);
}
