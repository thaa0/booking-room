package com.room.booking.sala.infra;

import com.room.booking.sala.application.repository.SalaRepository;
import com.room.booking.sala.domain.Sala;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

import java.util.List;

@Log4j2
@Repository
@RequiredArgsConstructor
public class SalaInfraRepository implements SalaRepository {

    private final SalaJpaRepository salaJpaRepository;

    @Override
    public void salva(Sala sala) {
        log.info("[start] SalaInfraRepository - salva");
        salaJpaRepository.save(sala);
        log.debug("[finish] SalaInfraRepository - salva");
    }

    @Override
    public List<Sala> buscarTodas() {
        log.info("[start] SalaInfraRepository - buscarTodas");
        List<Sala> salas = salaJpaRepository.findAll();
        log.info("Salas encontradas: {}", salas.size());
        log.debug("[finish] SalaInfraRepository - buscarTodas");
        return salas;
    }
}
