package com.room.booking.usuario.application.controller;

import lombok.Getter;

@Getter
public class UsuarioRequest {
    private String nomeCompleto;
    private String whatsapp;
    private String email;
    private String senha;
}
