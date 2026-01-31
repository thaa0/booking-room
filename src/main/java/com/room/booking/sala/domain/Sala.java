package com.room.booking.sala.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@NoArgsConstructor
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid", updatable = false, unique = true, nullable = false)
    private UUID idSala;

    @NotBlank(message = "Nome da sala não pode ser em branco")
    private String nome;

    @NotBlank(message = "Capacidade da sala não pode ser em branco")
    private int capacidade;

    @NotBlank(message = "Localização da sala não pode ser em branco")
    private String localizacao;

    private UUID criadorId;
}