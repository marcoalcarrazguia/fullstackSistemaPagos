package com.lta.sistemapagos.services;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.lta.sistemapagos.entities.Estudiantes;
import com.lta.sistemapagos.entities.Pago;
import com.lta.sistemapagos.enums.PagoStatus;
import com.lta.sistemapagos.enums.TypePago;
import com.lta.sistemapagos.repository.EstudianteRepository;
import com.lta.sistemapagos.repository.PagoRepository;

@Service
@Transactional
public class PagoService {
    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    public Pago savePago(MultipartFile file, double cantidad, TypePago type, LocalDate date, String codigoEstudiante)
            throws IOException {

        Path folderPath = Paths.get(System.getProperty("user.home"), "enset-data", "pagos");

        if (!Files.exists(folderPath)) {

            Files.createDirectories(folderPath);

        }

        String fileName = UUID.randomUUID().toString();
        // creamos un path ara el archivo pdf que se guardara en enset/data
        Path filePath = Paths.get(System.getProperty("user.home"), "enset-data", "pagos", fileName + ".pdf");

        Files.copy(file.getInputStream(), filePath);

        Estudiantes estudiante = estudianteRepository.findByCodigo(codigoEstudiante);

        Pago pago = Pago.builder()
                .type(type)
                .status(PagoStatus.CREADO)
                .fecha(date)
                .estudiante(estudiante)
                .cantidad(cantidad)
                .file(filePath.toUri().toString())
                .build();

        return pagoRepository.save(pago);
    }

    public byte[] getArchivoPorId(Long PagoId) throws IOException {

        Pago pago = pagoRepository.findById(PagoId).get();

        return Files.readAllBytes(Path.of(URI.create(pago.getFile())));
    }

    public Pago actualizarPagoPorStatus(PagoStatus status, Long id) {
        Pago pago = pagoRepository.findById(id).get();
        pago.setStatus(status);
        return pagoRepository.save(pago);
    }

}
