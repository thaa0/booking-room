package com.room.booking.reserva.infra;

import com.room.booking.core.handler.APIException;
import com.room.booking.reserva.application.repository.ReservaRepository;
import com.room.booking.reserva.domain.Reserva;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
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

    @Override
    public List<Reserva> listarReservas() {
        log.info("[start] ReservaInfraRepository - listarReservas");
        List<Reserva> reserva = reservaJpaRepository.findAll();
        log.debug("[finish] ReservaInfraRepository - listarReservas");
        return reserva;
    }

    @Override
    public List<Reserva> listarReservasPorSalaId(UUID salaId) {
        log.info("[start] ReservaInfraRepository - listarReservasPorSalaId para sala {}", salaId);
        List<Reserva> reservas = reservaJpaRepository.findBySalaId(salaId);
        log.debug("Encontradas {} reserva(s) para salaId: {}", reservas.size(), salaId);
        log.debug("[finish] ReservaInfraRepository - listarReservasPorSalaId");
        return reservas;
    }

    @Override
    public void cancelarReserva(UUID reservaId) {
        log.info("[start] ReservaInfraRepository - cancelarReserva");
        reservaJpaRepository.deleteById(reservaId);
        log.info("Reserva cancelada com id: {}", reservaId);
        log.debug("[finish] ReservaInfraRepository - cancelarReserva");
    }

    @Override
    public Reserva buscarPorId(UUID reservaId) {
        log.info("[start] ReservaInfraRepository - buscarPorId");
        Reserva reserva = reservaJpaRepository.findById(reservaId)
                .orElseThrow(() -> APIException.build(HttpStatus.NOT_FOUND, "Reserva não encontrada com id: " + reservaId));
        log.debug("[finish] ReservaInfraRepository - buscarPorId");
        return reserva;
    }

    @Override
    public void atualizarReserva(Reserva reserva) {
        log.info("[start] ReservaInfraRepository - atualizarReserva");
        reservaJpaRepository.save(reserva);
        log.debug("Reserva atualizada com id: {}", reserva.getReservaId());
        log.debug("[finish] ReservaInfraRepository - atualizarReserva");
    }
}

