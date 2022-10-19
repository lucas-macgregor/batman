import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../models/table';
import { Options } from '../models/options';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  public getOpciones(): Observable<Options[]> {
    const url='http://localhost:3050/opciones';
    return this.http.get<Options[]>(url, {responseType: 'json'});
  }

  public getGustos (): Observable<Table[]> {
    const url='http://localhost:3050/gustos';
    return this.http.get<Table[]>(url, {responseType: 'json'});
  }

  public agregarOpcion(opcion:string) {
    return this.http.post('http://localhost:3050/agregaropcion',{"opcion": opcion});
  }

  public quitarOpcion (id:number) {
    return this.http.delete('http://localhost:3050/quitaropcion/'+id)
  }

  
}