package com.room.booking.usuario.application.repository;


import com.room.booking.usuario.domain.Usuario;

import java.util.UUID;

public interface UsuarioRepository {
    void salva(Usuario usuario);
    Usuario buscaUsuarioPorEmail(String email);
    Usuario buscaUsuarioPorId(UUID id);
    long count();
    void saveAll(Iterable<Usuario> usuarios);
}