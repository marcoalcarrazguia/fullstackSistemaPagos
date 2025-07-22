import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiantes.model';
import { EstudiantesService } from '../services/estudiantes.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {

  estudiantes!: Array<Estudiante>;
  estudiantesDataSource!: MatTableDataSource<Estudiante>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'codigo', 'programaId','pagos'];

  constructor(private estudiantesService: EstudiantesService, private router:Router) { }

  ngOnInit(): void {
    this.estudiantesService.getAllEstudiantes().subscribe({
      next: value => {
        this.estudiantes = value;
        this.estudiantesDataSource = new MatTableDataSource<Estudiante>(this.estudiantes);
        console.log(this.estudiantes);
      },
      error: err => {
        console.error("Error al cargar los estudiantes", err);
      }
    })
  }

  listarPagosEstudiante(estudiante: Estudiante) {
    this.router.navigateByUrl(`/admin/estudiante-detalles/${estudiante.codigo}`)
  }
}
