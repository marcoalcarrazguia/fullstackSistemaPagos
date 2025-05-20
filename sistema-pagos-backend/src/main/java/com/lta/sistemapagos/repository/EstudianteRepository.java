package com.lta.sistemapagos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lta.sistemapagos.entities.Estudiantes;

@Repository
public interface  EstudianteRepository extends JpaRepository<Estudiantes, String> {
   
    Estudiantes findByCodigo(String codigo);
    
    List<Estudiantes> findByProgramaId(String programaId);
    
}
