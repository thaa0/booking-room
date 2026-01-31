package com.room.booking.auth.service;

import com.room.booking.usuario.domain.Usuario;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface JwtService {
    String gerarToken(Usuario usuario);
    Optional<String> getUsuarioByBearerToken(String token);
    String gerarToken(Authentication authentication);
}
