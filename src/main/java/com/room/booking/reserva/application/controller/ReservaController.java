package com.room.booking.reserva.application.controller;

import com.room.booking.reserva.application.controller.dto.ReservaListResponse;
import com.room.booking.reserva.application.controller.dto.ReservaRequest;
import com.room.booking.reserva.application.service.ReservaService;
import com.room.booking.usuario.domain.Usuario;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @GetMapping()
    public List<ReservaListResponse> listarReservas(@AuthenticationPrincipal Usuario user) {
        log.info("[start] ReservaController - listarReservas para usuario com id {}", user.getId());
        List<ReservaListResponse> reservas = reservaService.listarReservas();
        log.debug("[finish] ReservaController - listarReservas");
        return reservas;
    }

    @GetMapping("/sala/{salaId}")
    public List<ReservaListResponse> listarReservasPorSalaId(@PathVariable UUID salaId,
                                                              @AuthenticationPrincipal Usuario user) {
        log.info("[start] ReservaController - listarReservasPorSalaId para sala {}", salaId);
        List<ReservaListResponse> reservas = reservaService.listarReservasPorSalaId(salaId);
        log.debug("[finish] ReservaController - listarReservasPorSalaId - {} reservas encontradas", reservas.size());
        return reservas;
    }

    @DeleteMapping("/{reservaId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelarReserva(@PathVariable UUID reservaId) {
        log.info("[start] ReservaController - cancelarReserva");
        reservaService.cancelarReserva(reservaId);
        log.debug("[finish] ReservaController - cancelarReserva");
    }

    @PatchMapping("/{reservaId}/check-in")
    @ResponseStatus(HttpStatus.OK)
    public void checkIn(@PathVariable UUID reservaId, @AuthenticationPrincipal Usuario user) {
        log.info("[start] ReservaController - checkIn para reserva {}", reservaId);
        reservaService.checkIn(reservaId);
        log.debug("[finish] ReservaController - checkIn");
    }

    @PatchMapping("/{reservaId}/check-out")
    @ResponseStatus(HttpStatus.OK)
    public void checkOut(@PathVariable UUID reservaId, @AuthenticationPrincipal Usuario user) {
        log.info("[start] ReservaController - checkOut para reserva {}", reservaId);
        reservaService.checkOut(reservaId);
        log.debug("[finish] ReservaController - checkOut");
    }
}

