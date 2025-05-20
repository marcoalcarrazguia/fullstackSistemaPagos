package com.lta.sistemapagos.dtos;

import java.time.LocalDate;

import com.lta.sistemapagos.enums.TypePago;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewPagoDto {
    private double cantidad;
    private TypePago typePago;
    private LocalDate date;
    private String codigoEstudiante;
    
    
}
