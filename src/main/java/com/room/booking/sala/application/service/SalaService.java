package com.room.booking.sala.application.service;

import com.room.booking.sala.application.controller.dto.SalaRequest;

import java.util.UUID;

public interface SalaService {
    void registrarSala(SalaRequest request, UUID id);
}