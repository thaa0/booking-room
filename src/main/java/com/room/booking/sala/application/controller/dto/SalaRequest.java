package com.room.booking.sala.application.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

@AllArgsConstructor
@Validated
@Data
public class SalaRequest {
    private String nome;
    private int capacidade;
    private String localizacao;
}
