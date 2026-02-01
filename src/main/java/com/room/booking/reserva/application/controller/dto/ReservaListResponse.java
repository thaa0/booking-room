package com.room.booking.reserva.application.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@AllArgsConstructor
@Data
public class ReservaListResponse {
    private UUID reservaId;
    private UUID salaId;
    private LocalDate dataReserva;
    private LocalTime horaInicio;
    private LocalTime horaFim;
    private String nomeCliente;
    private String contatoCliente;
    private UUID criadorId;
}
