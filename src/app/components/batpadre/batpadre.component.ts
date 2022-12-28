import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Options } from '../../models/options';
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-batpadre',
  templateUrl: './batpadre.component.html',
  styleUrls: ['./batpadre.component.css']
})
export class BatpadreComponent implements OnInit {

  batSelect:string='';
  opciones:Options[]=[];
  constructor(private apiService:ApiService, private auth:AuthService) { }
 
  ngOnInit(): void {
    this.actualizarOpciones();
  }
 
  esCorrecto (batSelect:string):void { 
   if (batSelect.includes('Bruce Wayne'))
    Swal.fire({
      title: '¡Es correcto!',
      text: '',
      icon: 'success'
    });
   else 
    Swal.fire({
      title: '¡Incorrecto!',
      text: '¿Estas seguro?',
      icon: 'error'
    });
  }
 
  agregarOpcion (opcion:string):void {
    this.apiService
    .agregarOpcion(opcion)
    .subscribe({
      next: () => {
        this.actualizarOpciones();
        Swal.fire({
          title: 'Opcion agregada correctamente.',
          text: '',
          icon: 'success'
        });
      },
      error: (e) => console.error (e),
    });    
  }
 
  quitarOpcion (opcion:number):void {
    this.apiService.quitarOpcion(opcion)
    .subscribe({
      next: () => {
        this.actualizarOpciones();
        Swal.fire({
          title: 'Opcion quitada correctamente.',
          text: '',
          icon: 'success'
        });
      },
      error: (e) => console.error (e),
    });  
  }
 
  actualizarOpciones ():void {
    this.apiService.getOpciones()
    .subscribe({
      next: (response) => {
        this.opciones = response
        if (this.opciones.length>=1) 
          this.batSelect=this.opciones[0].opcion;
        else
          this.batSelect='';
        },
      error: (e) => {
        if (e.status===401) {
          this.auth.expiredToken();
        } 
        else {
          console.error (e);
        }  
      }
    });
  }

  ngOnDestroy() {
    
  }
}
