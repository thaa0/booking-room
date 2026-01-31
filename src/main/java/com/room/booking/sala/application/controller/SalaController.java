package com.room.booking.sala.application.controller;

import com.room.booking.sala.application.controller.dto.SalaRequest;
import com.room.booking.sala.application.service.SalaService;
import com.room.booking.usuario.domain.Usuario;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(("v1/salas"))
@Log4j2
@RequiredArgsConstructor
public class SalaController {

    private final SalaService salaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void registrarSala(@Valid @RequestBody SalaRequest request,
                              @AuthenticationPrincipal Usuario user) {
        log.info("[start] SalaController - registrarSala");
        salaService.registrarSala(request, user.getId());
        log.debug("[finish] SalaController - registrarSala");
    }
}
