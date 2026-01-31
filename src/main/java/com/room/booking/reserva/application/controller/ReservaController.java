package com.room.booking.reserva.application.controller;

import com.room.booking.reserva.application.controller.dto.ReservaRequest;
import com.room.booking.reserva.application.service.ReservaService;
import com.room.booking.usuario.domain.Usuario;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(("v1/reserva"))
@Log4j2
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    @PostMapping("/sala/{salaId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void registrarReserva(@Valid @RequestBody ReservaRequest request,
                                 @PathVariable String salaId,
                                 @AuthenticationPrincipal Usuario user) {
     log.info("[start] ReservaController - registrarReserva para sala com id {}", salaId);
     reservaService.registraReserva(request, salaId, user.getId());
     log.debug("[finish] ReservaController - registrarReserva");
    }
}