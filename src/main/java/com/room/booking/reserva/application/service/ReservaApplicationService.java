package com.room.booking.reserva.application.service;

import com.room.booking.core.handler.APIException;
import com.room.booking.reserva.application.controller.dto.ReservaRequest;
import com.room.booking.reserva.application.repository.ReservaRepository;
import com.room.booking.reserva.application.service.mapper.ReservaMapper;
import com.room.booking.reserva.domain.Reserva;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Log4j2
@RequiredArgsConstructor
public class ReservaApplicationService implements ReservaService {

    private final ReservaRepository reservaRepository;
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

    private void verificaDisponibilidadeEConflitos(Reserva reserva) {
        boolean conflito = reservaRepository.verificaConflitoReserva(
                reserva.getSalaId(),
                reserva.getDataReserva(),
                reserva.getHoraInicio(),
                reserva.getHoraFim()
        );

        if (conflito) {
            log.error("Conflito de reserva detectado para salaId: {}", reserva.getSalaId());
            throw APIException.build(HttpStatus.CONFLICT,"Conflito de reserva para o período solicitado.");
        }
    }

}
