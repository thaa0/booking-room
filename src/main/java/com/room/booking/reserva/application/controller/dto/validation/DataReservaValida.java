package com.room.booking.reserva.application.controller.dto.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DataReservaValidator.class)
@Documented
public @interface DataReservaValida {
    String message() default "Data de reserva inválida. Deve ser uma data válida e não pode ser anterior à data atual";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

