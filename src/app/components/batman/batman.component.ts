import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Options } from '../../models/options';

@Component({
  selector: 'app-batman',
  templateUrl: './batman.component.html',
  styleUrls: ['./batman.component.css']
})
export class BatmanComponent implements OnInit {

  constructor(public apiService:ApiService) { }

  ngOnInit(): void {  }
  
  @Input() batSelect:string='';
  @Input() opciones:Options[]=[];
  @Output() esCorrectoEvento = new EventEmitter<string>();
  @Output() agregarOpcionEvento = new EventEmitter<string>();
  @Output() quitarOpcionEvento = new EventEmitter<number>();
  sabe=false;

  esCorrecto(valor:string) {
    this.esCorrectoEvento.emit(valor);
  }

  agregarOpcion(valor:string) {
    if (valor.trim()!== '')
      this.agregarOpcionEvento.emit(valor);
  }
  
  quitarOpcion(valor:string) {
    let numero:number= +valor;
    if (numero !== null && numero>=0)
      this.quitarOpcionEvento.emit(numero);
  }
}
