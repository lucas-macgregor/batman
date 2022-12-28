import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Options } from '../../models/options';

@Component({
  selector: 'app-batman',
  templateUrl: './batman.component.html',
  styleUrls: ['./batman.component.css']
})
export class BatmanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Input() batSelect:string='';
  @Input() opciones:Options[]=[];
  @Output() esCorrectoEvento = new EventEmitter<string>();
  @Output() agregarOpcionEvento = new EventEmitter<string>();
  @Output() quitarOpcionEvento = new EventEmitter<number>();
  public sabe:boolean=false;

  esCorrecto(valor:string):void {
    this.esCorrectoEvento.emit(valor);
  }

  agregarOpcion(valor:string):void {
    if (valor.trim()!== '')
      this.agregarOpcionEvento.emit(valor);
  }
  
  quitarOpcion(valor:string):void {
    if (valor.trim()!=='') { 
      let numero:number= +valor;
      if (numero !== null && numero>=0)
        this.quitarOpcionEvento.emit(numero);
    }
  }
}