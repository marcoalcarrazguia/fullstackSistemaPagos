package com.lta.sistemapagos;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.lta.sistemapagos.entities.Estudiantes;
import com.lta.sistemapagos.entities.Pago;
import com.lta.sistemapagos.enums.PagoStatus;
import com.lta.sistemapagos.enums.TypePago;
import com.lta.sistemapagos.repository.EstudianteRepository;
import com.lta.sistemapagos.repository.PagoRepository;

@SpringBootApplication
public class SistemaPagosBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaPagosBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(EstudianteRepository estudianteRepository, PagoRepository pagoRepository) {
		return args -> {
			estudianteRepository.save(Estudiantes.builder()
					.id(UUID.randomUUID().toString())
					.nombre("marko")
					.apellido("fernances")
					.codigo("1862")
					.programaId("LTA1")
					.build());

			estudianteRepository.save(Estudiantes.builder()
					.id(UUID.randomUUID().toString())
					.nombre("swordman")
					.apellido("europeanflak")
					.codigo("41111")
					.programaId("LTA1")
					.build());
			estudianteRepository.save(Estudiantes.builder()
					.id(UUID.randomUUID().toString())
					.nombre("PAUL")
					.apellido("DE LA ROCA")
					.codigo("18452462")
					.programaId("LTA2")
					.build());

			TypePago tiposPago[] = TypePago.values();

			Random ramdon = new Random();
			estudianteRepository.findAll().forEach(estudiante -> {
				for (int i = 0; i < 10; i++) {
					int index = ramdon.nextInt(tiposPago.length);

					Pago pago = Pago.builder()
							.cantidad(1000 + (int) (Math.random() * 2000))
							.type(tiposPago[index])
							.status(PagoStatus.CREADO)
							.fecha(LocalDate.now())
							.estudiante(estudiante)
							.build();
					pagoRepository.save(pago);
				}
			});
		};
	}

}
