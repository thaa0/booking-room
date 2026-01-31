package com.room.booking.sala.application.repository;

import com.room.booking.sala.domain.Sala;

import java.util.List;

public interface SalaRepository {
    void salva(Sala sala);
    List<Sala> buscarTodas();
    void deletarPorId(String salaId);
}
