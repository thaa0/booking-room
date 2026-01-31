package com.room.booking.sala.application.service;

import com.room.booking.sala.application.controller.dto.SalaListResponse;
import com.room.booking.sala.application.controller.dto.SalaRequest;
import com.room.booking.sala.application.repository.SalaRepository;
import com.room.booking.sala.application.service.mapper.SalaMapper;
import com.room.booking.sala.domain.Sala;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Log4j2
@RequiredArgsConstructor
@Service
public class SalaApplicationService implements SalaService {

    private final SalaRepository salaRepository;
    private final SalaMapper salaMapper;

    @Override
    public void registrarSala(SalaRequest request, UUID id) {
        log.info("[start] SalaApplicationService - registrarSala");
        Sala sala = salaMapper.toDomain(request);
        sala.setCriadorId(id);
        salaRepository.salva(sala);
        log.debug("[finish] SalaApplicationService - registrarSala");
    }

    @Override
    public List<SalaListResponse> listarSalas() {
        log.info("[start] SalaApplicationService - listarSalas");
        List<Sala> salas = salaRepository.buscarTodas();
        log.debug("[finish] SalaApplicationService - listarSalas");
        return salas.stream().map(salaMapper::toRequest).toList();
    }
}