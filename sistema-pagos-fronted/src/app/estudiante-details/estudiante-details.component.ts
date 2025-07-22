import { Component } from '@angular/core';
import { Pago } from '../models/estudiantes.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from '../services/estudiantes.service';

@Component({
  selector: 'app-estudiante-details',
  templateUrl: './estudiante-details.component.html',
  styleUrl: './estudiante-details.component.css'
})
export class EstudianteDetailsComponent {

  estudianteCodigo!: string;
  pagosEstudiante!: Array<Pago>;
  pagosDataSource!: MatTableDataSource<Pago>;

  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status', 'nombre'];

  constructor(private activedRoute: ActivatedRoute, private estudianteService: EstudiantesService,private router: Router) {
    this.pagosEstudiante = [];
    this.pagosDataSource = new MatTableDataSource(this.pagosEstudiante);
    

  }
  ngOnInit(): void {
    this.estudianteCodigo = this.activedRoute.snapshot.params['codigo'];
    this.estudianteService.getPagosDeEstudiante(this.estudianteCodigo).subscribe({
      next: value => {
        this.pagosEstudiante = value;
        this.pagosDataSource = new MatTableDataSource<Pago>(this.pagosEstudiante);
        console.log(this.pagosEstudiante);
      },
      error: err => {
        console.error("Error al cargar los pagos del estudiante", err);
      }
    })
  }

  agregarPago() {
    this.router.navigateByUrl(`/admin/new-pago/${this.estudianteCodigo}`);
   
  } 
}
