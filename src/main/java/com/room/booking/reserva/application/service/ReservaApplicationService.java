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

import java.time.LocalDateTime;
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
    public List<ReservaListResponse> listarReservasPorSalaId(UUID salaId) {
        log.info("[start] ReservaApplicationService - listarReservasPorSalaId para sala {}", salaId);
        List<Reserva> reservas = reservaRepository.listarReservasPorSalaId(salaId);
        log.debug("Encontradas {} reserva(s) para salaId: {}", reservas.size(), salaId);
        log.debug("[finish] ReservaApplicationService - listarReservasPorSalaId");
        return reservas.stream().map(reservaMapper::toRequest).toList();
    }

    @Override
    public void cancelarReserva(UUID reservaId) {
        log.info("[start] ReservaApplicationService - cancelarReserva");
        reservaRepository.cancelarReserva(reservaId);
        log.debug("[finish] ReservaApplicationService - cancelarReserva");
    }

    @Override
    public void checkIn(UUID reservaId) {
        log.info("[start] ReservaApplicationService - checkIn para reserva {}", reservaId);
        Reserva reserva = reservaRepository.buscarPorId(reservaId);
        LocalDateTime agora = LocalDateTime.now();

        // Validar se a data da reserva é hoje
        if (!reserva.getDataReserva().isEqual(agora.toLocalDate())) {
            log.warn("Tentativa de check-in em data diferente da reserva. Data reserva: {}, Data atual: {}",
                     reserva.getDataReserva(), agora.toLocalDate());
            throw APIException.build(HttpStatus.BAD_REQUEST,
                    "Check-in só pode ser realizado na data da reserva (" + reserva.getDataReserva() + ")");
        }

        // Validar se o horário atual é igual ou posterior ao horário de início
        if (agora.toLocalTime().isBefore(reserva.getHoraInicio())) {
            log.warn("Tentativa de check-in antes do horário agendado. Horário reserva: {}, Horário atual: {}",
                     reserva.getHoraInicio(), agora.toLocalTime());
            throw APIException.build(HttpStatus.BAD_REQUEST,
                    "Check-in só pode ser realizado a partir do horário agendado (" + reserva.getHoraInicio() + ")");
        }

        if (reserva.getCheckIn() != null) {
            log.warn("Check-in já realizado para reserva {}", reservaId);
            throw APIException.build(HttpStatus.CONFLICT, "Check-in já foi realizado para esta reserva");
        }

        reserva.setCheckIn(agora);
        reservaRepository.atualizarReserva(reserva);
        log.info("Check-in realizado com sucesso para reserva {} às {}", reservaId, reserva.getCheckIn());
        log.debug("[finish] ReservaApplicationService - checkIn");
    }

    @Override
    public void checkOut(UUID reservaId) {
        log.info("[start] ReservaApplicationService - checkOut para reserva {}", reservaId);
        Reserva reserva = reservaRepository.buscarPorId(reservaId);
        LocalDateTime agora = LocalDateTime.now();

        // Validar se a data da reserva é hoje
        if (!reserva.getDataReserva().isEqual(agora.toLocalDate())) {
            log.warn("Tentativa de check-out em data diferente da reserva. Data reserva: {}, Data atual: {}",
                     reserva.getDataReserva(), agora.toLocalDate());
            throw APIException.build(HttpStatus.BAD_REQUEST,
                    "Check-out só pode ser realizado na data da reserva (" + reserva.getDataReserva() + ")");
        }

        if (reserva.getCheckIn() == null) {
            log.warn("Tentativa de check-out sem check-in para reserva {}", reservaId);
            throw APIException.build(HttpStatus.BAD_REQUEST, "Não é possível fazer check-out sem ter feito check-in");
        }

        if (reserva.getCheckOut() != null) {
            log.warn("Check-out já realizado para reserva {}", reservaId);
            throw APIException.build(HttpStatus.CONFLICT, "Check-out já foi realizado para esta reserva");
        }

        // Validar se o horário atual é igual ou posterior ao horário de check-in
        if (agora.isBefore(reserva.getCheckIn())) {
            log.warn("Tentativa de check-out antes do check-in. Check-in: {}, Horário atual: {}",
                     reserva.getCheckIn(), agora);
            throw APIException.build(HttpStatus.BAD_REQUEST, "Check-out não pode ser anterior ao check-in");
        }

        reserva.setCheckOut(agora);
        reservaRepository.atualizarReserva(reserva);
        log.info("Check-out realizado com sucesso para reserva {} às {}", reservaId, reserva.getCheckOut());
        log.debug("[finish] ReservaApplicationService - checkOut");
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
