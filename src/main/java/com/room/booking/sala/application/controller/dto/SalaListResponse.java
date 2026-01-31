package com.room.booking.sala.application.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import java.util.UUID;

@AllArgsConstructor
@Validated
@Data
public class SalaListResponse {
    private UUID idSala;
    private String nome;
    private int capacidade;
    private String localizacao;
    private UUID criadorId;
}