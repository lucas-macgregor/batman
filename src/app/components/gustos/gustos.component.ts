import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Table } from '../../models/table';
import { ApiService } from '../../services/api.service';
import { take } from 'rxjs'

@Component({
  selector: 'app-gustos',
  templateUrl: './gustos.component.html',
  styleUrls: ['./gustos.component.css']
})
export class GustosComponent implements OnInit {

  gustos:Table[]=[];
  itemToEdit:number=1;
  indexOfItemToEdit:number=1;
  itemToDelete:number=1;
  constructor(private apiService:ApiService, private auth:AuthService ) { }

  ngOnInit(): void {
    this.apiService.getGustos().pipe(take(1)).subscribe({
      next: (tabla) => this.gustos = tabla,
      error: (e) => {
        if (e.status===401) {
          this.auth.expiredToken();
        }
        console.error (e);
    }
  });
  }

  protected deleteRow():void{
    this.apiService.quitarGusto(this.itemToDelete).pipe(take(1)).subscribe({
      next: () => this.apiService.getGustos().subscribe({
        next: (tabla) => this.gustos=tabla,
        error: (e) => {
          if (e.status===401) {
            this.auth.expiredToken();
          }
        }
      }),
      error: (error) => {
        if (error.status===401) {
          this.auth.expiredToken();
        }
      }
    });
  }

  protected deleteInfo(id:number):void {
    this.itemToDelete=id;
  }

  protected editInterface(id:number,index:number):void {
    this.itemToEdit=id;
    this.indexOfItemToEdit=index;
    console.log('id:'+id+' '+'index:'+index)
  }

  protected updateField(meGusta:string, noGusta:string):void {
    if(meGusta!==this.gustos[this.indexOfItemToEdit].meGusta || noGusta!==this.gustos[this.indexOfItemToEdit].noGusta) {
      this.apiService.editarGusto(this.itemToEdit,meGusta,noGusta).pipe(take(1)).subscribe({
        next: () => this.apiService.getGustos().pipe(take(1)).subscribe({
          next: (tabla) => this.gustos=tabla,
          error: (e) => {
            if (e.status===401) {
              this.auth.expiredToken();
            }
          }
        }),
        error: (error) => {
          if (error.status===401) {
            this.auth.expiredToken();
          }
        }
      });
    }
    else
      console.log('Los campos son iguales')
  }

  protected addGustos(meGusta:string, noGusta:string):void {
    this.apiService.agregarGusto(meGusta,noGusta).pipe(take(1)).subscribe({
      next: () => this.apiService.getGustos().pipe(take(1)).subscribe({
        next: (tabla) => this.gustos=tabla,
        error: (e) => {
          if (e.status===401) {
            this.auth.expiredToken();
          }
        }
      }),
      error: (error) => {
        if (error.status===401) {
          this.auth.expiredToken();
        }
      }
    });
  }
}
