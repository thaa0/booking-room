package com.room.booking.reserva.application.service;

import com.room.booking.core.handler.APIException;
import com.room.booking.reserva.application.controller.dto.ReservaListResponse;
import com.room.booking.reserva.application.controller.dto.ReservaRequest;
import com.room.booking.reserva.application.repository.ReservaRepository;
import com.room.booking.reserva.application.service.mapper.ReservaMapper;
import com.room.booking.reserva.domain.Reserva;
import com.room.booking.sala.application.repository.SalaRepository;
import com.room.booking.sala.domain.Sala;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Log4j2
@RequiredArgsConstructor
public class ReservaApplicationService implements ReservaService {

    private final ReservaRepository reservaRepository;
    private final SalaRepository salaRepository;
    private final ReservaMapper reservaMapper;

    @Override
    public void registraReserva(ReservaRequest request, String salaId, UUID id) {
        log.info("[start] ReservaApplicationService - registraReserva");
        Reserva reserva = reservaMapper.toDomain(request, salaId);
        verificaDisponibilidadeEConflitos(reserva);
        reserva.setCriadorId(id);
        reservaRepository.registraReserva(reserva);
        log.debug("[finish] ReservaApplicationService - registraReserva");
    }

    @Override
    public List<ReservaListResponse> listarReservas() {
        log.info("[start] ReservaApplicationService - listarReservas");
        List<Reserva> reservas = reservaRepository.listarReservas();
        log.debug("[finish] ReservaApplicationService - listarReservas");
        return reservas.stream().map(reservaMapper::toRequest).toList();
    }

    @Override
    public void cancelarReserva(UUID reservaId) {
        log.info("[start] ReservaApplicationService - cancelarReserva");
        reservaRepository.cancelarReserva(reservaId);
        log.debug("[finish] ReservaApplicationService - cancelarReserva");
    }

    private void verificaDisponibilidadeEConflitos(Reserva reserva) {
        log.info("[start] ReservaApplicationService - verificaDisponibilidadeEConflitos");
        if (verificaConflito(reserva) || verificaCapacidade(reserva)) {
            log.error("Conflito de reserva detectado para salaId: {}", reserva.getSalaId());
            throw APIException.build(HttpStatus.CONFLICT,"Conflito de reserva para o período solicitado ou por capacidade.");
        }
    }

    private boolean verificaCapacidade(Reserva reserva) {
        UUID salaId = reserva.getSalaId();
        log.info("Verifica capacidade para salaId: {}",salaId);
        Sala sala = salaRepository.buscarPorId(salaId);
        if(sala.getCapacidade()<reserva.getNumeroPessoas()){
            log.error("Capacidade excedida para salaId: {}", salaId);
            return true;
        }
        return false;
    }

    private boolean verificaConflito(Reserva reserva) {
        log.info("Verifica conflito de reserva para salaId: {}", reserva.getSalaId());
        return reservaRepository.verificaConflitoReserva(
                reserva.getSalaId(),
                reserva.getDataReserva(),
                reserva.getHoraInicio(),
                reserva.getHoraFim()
        );
    }

}
