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

  private url:string= 'http://localhost:3050';

  public getOpciones(): Observable<Options[]> {
    return this.http.get<Options[]>(this.url+'/opciones', {responseType: 'json'});
  }

  public getGustos (): Observable<Table[]> {
    return this.http.get<Table[]>(this.url+'/gustos', {responseType: 'json'});
  }

  public agregarOpcion(opcion:string) {
    return this.http.post(this.url+'/agregaropcion',{"opcion": opcion});
  }

  public agregarGusto(meGusta:string, noGusta: string) {
    return this.http.post(this.url+'/agregargusto',{"meGusta": meGusta,  "noGusta": noGusta});
  }

  public quitarOpcion (id:number) {
    return this.http.delete(this.url+'/quitaropcion/'+id);
  }
  
  public quitarGusto (id:number) {
    return this.http.delete(this.url+'/quitargusto/'+id);
  }

  public editarGusto (id:number,meGusta:string,noGusta:string) {
    return this.http.patch(this.url+'/editargusto/'+id, {"meGusta": meGusta, "noGusta": noGusta});
  }

  public descargar(elementos:Table[]) {
    return this.http.post(this.url+'/descargar',{elementos},{responseType: 'blob'});
  }
}