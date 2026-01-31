package com.room.booking.sala.application.service;

import com.room.booking.sala.application.controller.dto.SalaListResponse;
import com.room.booking.sala.application.controller.dto.SalaRequest;

import java.util.List;
import java.util.UUID;

public interface SalaService {
    void registrarSala(SalaRequest request, UUID id);
    List<SalaListResponse> listarSalas();
    void deletarSala(String salaId);
}