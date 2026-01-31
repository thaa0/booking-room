package com.room.booking.reserva.application.service.mapper;

import com.room.booking.reserva.application.controller.dto.ReservaRequest;
import com.room.booking.reserva.domain.Reserva;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReservaMapper {
    Reserva toDomain(ReservaRequest request, String salaId);
}
