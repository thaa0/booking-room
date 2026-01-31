package com.room.booking.reserva.infra;

import com.room.booking.reserva.domain.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public interface ReservaJpaRepository extends JpaRepository<Reserva, UUID> {
    boolean existsBySalaIdAndDataReservaAndHoraInicioLessThanEqualAndHoraFimGreaterThanEqual(UUID salaId, LocalDate dataReserva, LocalTime horaFim, LocalTime horaInicio);
}