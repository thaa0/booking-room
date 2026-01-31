package com.room.booking.reserva.application.controller.dto.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.log4j.Log4j2;

import java.time.LocalDate;

@Log4j2
public class DataReservaValidator implements ConstraintValidator<DataReservaValida, LocalDate> {

    @Override
    public boolean isValid(LocalDate dataReserva, ConstraintValidatorContext context) {
        if (dataReserva == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Data de reserva não pode ser nula")
                    .addConstraintViolation();
            return false;
        }

        LocalDate hoje = LocalDate.now();
        
        log.info("Validando data de reserva: {} | Data atual: {}", dataReserva, hoje);

        if (dataReserva.isBefore(hoje)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Data de reserva não pode ser anterior à data atual (" + hoje + ")")
                    .addConstraintViolation();
            log.warn("Data de reserva {} é anterior à data atual {}", dataReserva, hoje);
            return false;
        }

        return true;
    }
}

