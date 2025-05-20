package com.lta.sistemapagos.entities;

import java.time.LocalDate;

import com.lta.sistemapagos.enums.PagoStatus;
import com.lta.sistemapagos.enums.TypePago;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pago {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private String id;

    private LocalDate fecha;

    private double  cantidad;

    private TypePago type;

    private PagoStatus status;

    private String file;

    @ManyToOne
    private Estudiantes estudiante;
}
