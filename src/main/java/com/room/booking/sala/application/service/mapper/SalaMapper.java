package com.room.booking.sala.application.service.mapper;

import com.room.booking.sala.application.controller.dto.SalaRequest;
import com.room.booking.sala.domain.Sala;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SalaMapper {
    Sala toDomain(SalaRequest request);
}