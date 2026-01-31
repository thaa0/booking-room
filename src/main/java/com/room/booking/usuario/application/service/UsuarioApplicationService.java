package com.room.booking.usuario.application.service;

import com.room.booking.auth.service.AuthService;
import com.room.booking.usuario.application.controller.UsuarioRequest;
import com.room.booking.usuario.application.repository.UsuarioRepository;
import com.room.booking.usuario.domain.Usuario;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Log4j2
public class UsuarioApplicationService implements UsuarioService {
        private final UsuarioRepository usuarioRepository;
        private final BCryptPasswordEncoder encriptador;
        private final AuthService authService;

        @Override
        @Transactional
        public void cadastrarUsuario(UsuarioRequest request) {
                log.info("[start] UsuarioApplicationService - cadastrarUsuario");
                Usuario novoUsuario = new Usuario(request, encriptador);
                usuarioRepository.salva(novoUsuario);
                log.debug("[finish] UsuarioApplicationService - cadastrarUsuario");
        }
}