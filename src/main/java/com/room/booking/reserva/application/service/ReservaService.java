package com.room.booking.reserva.application.service;

import com.room.booking.reserva.application.controller.dto.ReservaRequest;

import java.util.UUID;

public interface ReservaService {
    void registraReserva(ReservaRequest request, String salaId, UUID id);
}
