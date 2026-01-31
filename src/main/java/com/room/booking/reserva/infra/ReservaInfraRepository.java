package com.room.booking.reserva.infra;

import com.room.booking.reserva.application.controller.dto.ReservaRequest;
import com.room.booking.reserva.application.repository.ReservaRepository;
import com.room.booking.reserva.domain.Reserva;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Log4j2
@RequiredArgsConstructor
@Repository
public class ReservaInfraRepository implements ReservaRepository {

    private final ReservaJpaRepository reservaJpaRepository;

    @Override
    public void registraReserva(Reserva reserva) {
        log.info("[start] ReservaInfraRepository - registraReserva");
        reservaJpaRepository.save(reserva);
        log.debug("Reserva registrada para salaId: {}", reserva.getSalaId());
        log.debug("[finish] ReservaInfraRepository - registraReserva");
    }

    @Override
    public boolean verificaConflitoReserva(UUID salaId, LocalDate dataReserva, LocalTime horaInicio, LocalTime horaFim) {
        log.info("[start] ReservaInfraRepository - verificaConflitoReserva");
        boolean exists = reservaJpaRepository.existsBySalaIdAndDataReservaAndHoraInicioLessThanEqualAndHoraFimGreaterThanEqual(
                salaId, dataReserva, horaFim, horaInicio);
        log.debug("[finish] ReservaInfraRepository - verificaConflitoReserva");
        return exists;
    }
}