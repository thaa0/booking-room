package com.room.booking.sala.infra;

import com.room.booking.sala.domain.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SalaJpaRepository extends JpaRepository<Sala, UUID> {
}
