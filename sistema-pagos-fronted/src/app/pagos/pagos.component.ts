import { HttpClient } from '@angular/common/http';
import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EstudiantesService } from '../services/estudiantes.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent implements OnInit {

  public pagos:any;
  public dataSource:any;
  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status','nombre'];


  /*
  - @ViewChild decorador que permite acceder a un componente hijo del DOM
     */
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient,private estudiantesService: EstudiantesService) {
    this.pagos = [];
    this.dataSource = new MatTableDataSource(this.pagos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  }
  ngOnInit(): void {
    this.estudiantesService.getAllPagos().subscribe({
      next:data =>{
        this.pagos = data;
        this.dataSource = new MatTableDataSource(this.pagos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(this.pagos);
        console.log(this.dataSource);
        console.log(this.displayedColumns);
        console.log(this.paginator);
        console.log(this.sort);
      },
      error:err =>{
        console.error("Error al cargar los pagos", err);
      }
    })

  }

}
