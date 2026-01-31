package com.room.booking.reserva.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@NoArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", updatable = false, unique = true, nullable = false)
    private UUID reservaId;

    private UUID salaId;

    private LocalDate dataReserva;

    private LocalTime horaInicio;

    private LocalTime horaFim;

    private String nomeCliente;

    private String contatoCliente;

    private UUID criadorId;
}