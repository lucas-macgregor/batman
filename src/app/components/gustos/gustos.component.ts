import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Table } from '../../models/table';
import { ApiService } from '../../services/api.service';
import { take } from 'rxjs'
import Swal from 'sweetalert2';
import { Title } from 'chart.js';
import { icon } from '@fortawesome/fontawesome-svg-core';

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
  selectedFields:Array<number>=[];
  form:FormData=new FormData();
  updateBtn:boolean=false;

  constructor(private apiService:ApiService, private auth:AuthService) { }

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
      error: (error) => {
        if (error.status===401) {
          this.auth.expiredToken();
        }
      }
    });
    this.apiService.getGustos().pipe(take(1)).subscribe({
      next: (tabla) => this.gustos=tabla,
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
  }

  protected updateField(meGusta:string, noGusta:string):void {
    if(meGusta!==this.gustos[this.indexOfItemToEdit].meGusta || noGusta!==this.gustos[this.indexOfItemToEdit].noGusta) {
      this.apiService.editarGusto(this.itemToEdit,meGusta,noGusta).pipe(take(1)).subscribe({
        error: (error) => {
          if (error.status===401) {
            this.auth.expiredToken();
          }
        }
      });
      this.apiService.getGustos().pipe(take(1)).subscribe({
        next: (tabla) => this.gustos=tabla,
        error: (error) => {
          if (error.status===401) {
            this.auth.expiredToken();
          }
        }
      });
    }
  }

  protected addGustos(meGusta:string, noGusta:string):void {
    this.apiService.agregarGusto(meGusta,noGusta).pipe(take(1)).subscribe({
      error: (error) => {
        if (error.status===401) {
          this.auth.expiredToken();
        }
      }
    });
    this.apiService.getGustos().pipe(take(1)).subscribe({
      next: (tabla) => this.gustos=tabla,
      error: (error) => {
        if (error.status===401) {
          this.auth.expiredToken();
        }
      }
    });
  }

  protected updateSelected(index:number):void {
    if(this.selectedFields.includes(index)){
      this.selectedFields.splice(this.selectedFields.indexOf(index),1);
    }
    else {
      this.selectedFields.push(index);
    }
  }

  protected download():void {
    this.selectedFields.sort();
    const itemsToDownload:Table[]=[];
    this.selectedFields.forEach(element => {
      itemsToDownload.push(this.gustos[element]);
    });
    this.apiService.descargar(itemsToDownload).subscribe({
      next: (response) => {
        const blob = new Blob([response], {type:'application/vnd.ms-excel'})
        const url= window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: (error)=> console.log(error)
    })
  }

  protected upVote(id:number,index:number,type:number):void {
    if (type===1){
      this.gustos[index].meGusta_cont+=1;
    }
    else {
      this.gustos[index].noGusta_cont+=1;
    }
    this.apiService.updateVote(id,type,1).pipe(take(1)).subscribe({
      error: (error) =>{console.log(error)}
    })
    const newTable:Table[]=this.gustos.slice();
    this.gustos=newTable;
  }

  protected downVote(id:number, index:number, type:number):void {
    if (type===1 && this.gustos[index].meGusta_cont>0){
      this.gustos[index].meGusta_cont-=1;
      this.apiService.updateVote(id,type,-1).pipe(take(1)).subscribe({
        error: (error) =>{console.log(error)}
      });
      const newTable:Table[]=this.gustos.slice();
      this.gustos=newTable;
    }
    else {
      if (type===0 && this.gustos[index].noGusta_cont>0){
        this.gustos[index].noGusta_cont-=1;
        this.apiService.updateVote(id,type,-1).pipe(take(1)).subscribe({
          error: (error) =>{console.log(error)}
        });
        const newTable:Table[]=this.gustos.slice();
        this.gustos=newTable;
      }
    }
  }
  
  protected onFileSelected(event:any) {
    console.log(event);
    const file:File = event.target.files[0];
    if (file && file.type==='application/vnd.ms-excel') {
      this.updateBtn=true;
      this.form.append("file", file);
    }
    else {
      Swal.fire({
        title: ' Tipo de archivo incorrecto.',
        icon: 'error'
      });
      this.updateBtn=false;
    }
  }

  protected upload():void {
    this.apiService.upload(this.form).pipe(take(1)).subscribe({
      next: () => {    
        this.apiService.getGustos().pipe(take(1)).subscribe({
          next: (value) => this.gustos=value,
          error: (e) => console.log(e)
        }
      )},
      error: (e) => console.log(e)
    });

  }

}
