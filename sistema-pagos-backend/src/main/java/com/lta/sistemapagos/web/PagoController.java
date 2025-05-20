package com.lta.sistemapagos.web;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lta.sistemapagos.entities.Estudiantes;
import com.lta.sistemapagos.entities.Pago;
import com.lta.sistemapagos.enums.PagoStatus;
import com.lta.sistemapagos.enums.TypePago;
import com.lta.sistemapagos.repository.EstudianteRepository;
import com.lta.sistemapagos.repository.PagoRepository;
import com.lta.sistemapagos.services.PagoService;

@RestController
@CrossOrigin("*")
public class PagoController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PagoService pagoService;

    @Autowired
    private PagoRepository pagoRepository;

    @GetMapping("/estudiantes")
    public List<Estudiantes> listarEstudiantes() {
        return estudianteRepository.findAll();
    }

    @GetMapping("/estudiantes/{codigo}")
    public Estudiantes listarEstudiantePorCodigo(@PathVariable String codigo) {

        return estudianteRepository.findByCodigo(codigo);
    }

    @GetMapping("/estudiantesPorPrograma")
    public List<Estudiantes> listarEstudiantesPorPrograma(@RequestParam String programaId) {
        return estudianteRepository.findByProgramaId(programaId);
    }

    @GetMapping("/pagos")
    public List<Pago> listarPagos() {
        return pagoRepository.findAll();
    }

    @GetMapping("/pagos/{id}")
    public Pago listarPagoPorId(@PathVariable Long id) {
        return pagoRepository.findById(id).get();
    }

    @GetMapping("/estudiante/{codigo}/pagos")
    public List<Pago> listarPagosPorCodigoEstudiante(@PathVariable String codigo) {
        return pagoRepository.findByEstudianteCodigo(codigo);
    }

    @GetMapping("/pagosPorStatus")
    public List<Pago> listarPagosPorStatus(@RequestParam PagoStatus status) {
        return pagoRepository.findByStatus(status);
    }

    @PutMapping("/pagos/{pagoId}/actualizarPago")
    public Pago actualizarStatusDePago(@RequestParam PagoStatus status, @RequestParam Long PagoId) {
        return pagoService.actualizarPagoPorStatus(status, PagoId);
    }

    @PostMapping(path = "/pagos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Pago guardarPago(@RequestParam("file") MultipartFile file, double cantidad, TypePago type, LocalDate date,
            String codigoEstudiante) throws IOException {

        return pagoService.savePago(file, cantidad, type, date, codigoEstudiante);
    }

    @GetMapping("/pagos/porTipo")
    public List<Pago> listarPagosPorType(@RequestParam TypePago type) {
        return pagoRepository.findByType(type);
    }

    @GetMapping(value = "/pagoFile/{pagoId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] listarArchivoPorId(@PathVariable Long pagoId) throws IOException {
        return pagoService.getArchivoPorId(pagoId);
    }
}
