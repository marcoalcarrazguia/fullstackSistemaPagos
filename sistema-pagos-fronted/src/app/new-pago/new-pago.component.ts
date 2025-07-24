import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../models/estudiantes.model';
import { EstudiantesService } from '../services/estudiantes.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-new-pago',
  templateUrl: './new-pago.component.html',
  styleUrl: './new-pago.component.css'
})
export class NewPagoComponent implements OnInit {

pagoFormGroup!: FormGroup;
codigoEstudiante!: string;
tiposPago: string[] = [];
pdfFileUrl!: string;

constructor(private fb:FormBuilder,
   private activatedRoute: ActivatedRoute,
   private estudiantesService: EstudiantesService 
  ) {
}

ngOnInit(): void {
  for(let elt in PaymentType){
    let value = PaymentType[elt];
    if(typeof value == 'string'){
      this.tiposPago.push(value);
    }
  }  

  this.codigoEstudiante = this.activatedRoute.snapshot.params['codigoEstudiante'];
  this.pagoFormGroup = this.fb.group({
    date: this.fb.control(''),
    cantidad: this.fb.control(''),
    type: this.fb.control(''),
    codigoEstudiante: this.fb.control(this.codigoEstudiante),
    fileSource: this.fb.control(''),
    fileName: this.fb.control('')
    
  });
}
selectFile(event:any){
  if(event.target.files.length > 0){
    let file = event.target.files[0];
    this.pagoFormGroup.patchValue({
      fileSource:file,
      fileName:file.name
    });
    this.pdfFileUrl = window.URL.createObjectURL(file);
    console.log(this.pdfFileUrl);
    
  }
}
guardarPago(){
  let date: Date = new Date (this.pagoFormGroup.value.date);
  //dd//mm//yyyy 
  let formattedDate = date.getFullYear() + '-' + 
                      String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(date.getDate()).padStart(2, '0');
  let formData = new FormData();
  formData.set('date',formattedDate);
  formData.set('cantidad',this.pagoFormGroup.value.cantidad);
  formData.set('type',this.pagoFormGroup.value.type);
  formData.set('codigoEstudiante', this.pagoFormGroup.value.codigoEstudiante);
  formData.set('file',this.pagoFormGroup.value.fileSource);
  console.log(formData);

  this.estudiantesService.guardarPago(formData).subscribe({
    next:value => {
     Swal.fire({
      title: "Pago Registrado",
      text: "El pago ha sido registrado con éxito",
      icon:"success"
     });
    },
    error: err =>{
       Swal.fire({
      title: "ERROR",
      text: "Ha ocurrido un error al registrar el Pago",
      icon:"error"
     });
    }
  })
}
}
