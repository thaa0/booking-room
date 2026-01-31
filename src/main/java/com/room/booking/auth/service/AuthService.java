package com.room.booking.auth.service;

import com.room.booking.auth.domain.Token;
import com.room.booking.usuario.application.controller.LoginRequest;
import jakarta.validation.Valid;

public interface AuthService {
    Token login(@Valid LoginRequest request);
}
