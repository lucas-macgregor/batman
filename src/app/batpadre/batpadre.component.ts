import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Options } from '../models/options';

@Component({
  selector: 'app-batpadre',
  templateUrl: './batpadre.component.html',
  styleUrls: ['./batpadre.component.css']
})
export class BatpadreComponent implements OnInit {

  batSelect:string='';
  opciones:Options[]=[];
  constructor(public apiService:ApiService) { }
 
  ngOnInit(): void {
    this.actualizarOpciones();
  }
 
  esCorrecto (batSelect:string) {
   if (batSelect.includes('Bruce Wayne'))
     alert('Es correcto!')
   else 
     alert('No es correcto!')
   }
 
   agregarOpcion (opcion:string) {
     this.apiService.agregarOpcion(opcion)
     .subscribe({
       error: (e) => console.error (e),
       complete: () => this.actualizarOpciones()
     });    
   }
 
   quitarOpcion (opcion:number) {
     this.apiService.quitarOpcion(opcion)
     .subscribe({
       error: (e) => console.error (e),
       complete: () => this.actualizarOpciones()
     });  
   }
 
   actualizarOpciones () {
     this.apiService.getOpciones().subscribe({
       next: (response) => this.opciones = response,
       error: (e) => console.error (e),
       complete: () => {
       if (this.opciones.length>=1) 
         this.batSelect=this.opciones[0].opcion;
       else
         this.batSelect='';
       }
     })
 
   }
}
