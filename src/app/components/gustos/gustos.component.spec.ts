import { HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Table } from 'src/app/models/table';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { GustosComponent } from './gustos.component';
class MockApiService {
  tabla=new BehaviorSubject<Table[]>([{
    id: 0,
    meGusta: 'Helado',
    noGusta: 'Vinagre',
    meGusta_cont: 1,
    noGusta_cont: 2
  },
  {
    id:1,
    meGusta: 'Milanesa',
    noGusta: 'Mayonesa',
    meGusta_cont: 1,
    noGusta_cont: 2
  },
  {
    id:2,
    meGusta: 'Algo',
    noGusta: 'Algont',
    meGusta_cont: 1,
    noGusta_cont: 2
  }
]);

  getGustos():Observable<Table[]> {
    return this.tabla;
  }

  quitarGusto(id:number):Observable<never> {
    let newTable:Table[]=this.tabla.value;
    const findTableIndex= (element:Table) => element.id===id;
    const position = newTable.findIndex(findTableIndex);
    newTable.splice(position,1);
    this.tabla.next(newTable);
    return new Observable();
  }

  editarGusto(id:number,meGusta:string,noGusta:string):Observable<never> {
    let newTable:Table[]=this.tabla.value;
    const findTableIndex= (element:Table) => element.id===id;
    const position = newTable.findIndex(findTableIndex);
    newTable[position].meGusta=meGusta;
    newTable[position].noGusta=noGusta;
    this.tabla.next(newTable);
    return new Observable();
  }

  agregarGusto(meGusta:string,noGusta:string):Observable<never> {
    let newTable:Table[]=this.tabla.value;
    const lastID=newTable[newTable.length-1].id+1;
    newTable.push({id:lastID,meGusta,noGusta,meGusta_cont:1,noGusta_cont:2});
    this.tabla.next(newTable);
    return new Observable();
  }

  descargar(itemsToDownload:Table[]):Observable<never> {
    return new Observable;
  }

  updateVote (id:number,type:number,value:number):Observable<never> {
    return new Observable;
  }

  upload (from:FormGroup):Observable<never> {
    return new Observable;
  }
}

class MockAuthService {
  expiredToken ():void {
    
  };
}

describe('GustosComponent', () => {
  let component: GustosComponent;
  let fixture: ComponentFixture<GustosComponent>;
  let auth:MockAuthService;
  let apiService:MockApiService;
  beforeEach(async () => {
    apiService=new MockApiService();
    auth=new MockAuthService();
    await TestBed.configureTestingModule({
      declarations: [ GustosComponent ],
      providers: [
        {provide: ApiService, useValue: apiService},
        {provide: AuthService, useValue: auth},
      ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update table at ngOnInit', () => {
    component.ngOnInit();
    expect(component.gustos.length).toEqual(3);
  });

  it('should not update on error at ngOnInit', () => {
    const errorResponse = new HttpErrorResponse ({
      error: { code: `codigo`, message: `mensaje.` },
      status: 401,
      statusText: 'Unauthorized',
    });
    const authSpy = spyOn(auth,'expiredToken');
    const serviceSpy = spyOn(apiService,'getGustos').and.returnValue(throwError(()=> errorResponse));
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
    expect(authSpy).toHaveBeenCalled();
  });

  it('Should delete an item', ()=>{
    component.itemToDelete=1;
    component['deleteRow']();
    expect(component.gustos.length).toEqual(2);
  });

  it ('should NOT delete an item unauthenticated', ()=> {
    const errorResponse = new HttpErrorResponse ({
      error: { code: `codigo`, message: `mensaje.` },
      status: 401,
      statusText: 'Unauthorized',
    });
    const authSpy=spyOn(auth,'expiredToken');
    const quitarSpy = spyOn(apiService,'quitarGusto').and.returnValue(throwError(()=> errorResponse));
    const getSpy = spyOn(apiService,'getGustos').and.returnValue(throwError(()=> errorResponse));
    component.itemToDelete=1;
    component['deleteRow']();
    expect(quitarSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalled();
    expect(authSpy).toHaveBeenCalledTimes(2);
    expect(component.gustos.length).toEqual(3);
  });

  it ('should change variable value on deleteInfo',()=>{
    component['deleteInfo'](2);
    expect(component.itemToDelete).toEqual(2);
  });

  it('should set up variables for editing the info', ()=> {
    component['editInterface'](1,2);
    expect(component.itemToEdit).toEqual(1);
    expect(component.indexOfItemToEdit).toEqual(2);
  });

  it('should update the selected field',()=> {
    component.itemToEdit=0;
    component.indexOfItemToEdit=0;
    component['updateField']('si','no');
    expect(component.gustos.length).toEqual(3);
    expect(component.gustos[0].meGusta).toMatch('si');
    expect(component.gustos[0].noGusta).toMatch('no');
  });

  it('should NOT update the selected field unauthenticated',()=> {
    component.itemToEdit=0;
    component.indexOfItemToEdit=0;
    const errorResponse = new HttpErrorResponse ({
      error: { code: `codigo`, message: `mensaje.` },
      status: 401,
      statusText: 'Unauthorized',
    });
    const authSpy=spyOn(auth,'expiredToken');
    const apiSpy = spyOn(apiService,'editarGusto').and.returnValue(throwError(()=> errorResponse));
    const getSpy = spyOn(apiService,'getGustos').and.returnValue(throwError(()=> errorResponse));
    component['updateField']('si','no');
    expect(component.gustos.length).toEqual(3);
    expect(component.gustos[0].meGusta).toMatch('Helado');
    expect(component.gustos[0].noGusta).toMatch('Vinagre');
    expect(authSpy).toHaveBeenCalledTimes(2);
    expect(apiSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalled();
  });

  it('should not edit on equal values',()=>{
    component['updateField']('Helado','Vinagre');
    const serviceSpy = spyOn(apiService,'editarGusto');
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should add a gusto',()=>{
    component['addGustos']('si','no');
    const gustos=component.gustos;
    expect(gustos.length).toEqual(4);
    expect(gustos[gustos.length-1].meGusta).toMatch('si');
    expect(gustos[gustos.length-1].noGusta).toMatch('no');
  });

  it('should NOT add a gusto unauthenticated',()=>{
    const errorResponse = new HttpErrorResponse ({
      error: { code: `codigo`, message: `mensaje.` },
      status: 401,
      statusText: 'Unauthorized',
    });
    const authSpy=spyOn(auth,'expiredToken');
    const apiSpy = spyOn(apiService,'agregarGusto').and.returnValue(throwError(()=> errorResponse));
    const getSpy = spyOn(apiService,'getGustos').and.returnValue(throwError(()=> errorResponse));
    component['addGustos']('si','no');
    expect(authSpy).toHaveBeenCalledTimes(2);
    expect(apiSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalled();
  });

  it('should add selected fields', ()=>{
    component['updateSelected'](1);
    expect(component['selectedFields'].length).toBeGreaterThan(0);
  })

  it('should remove selected fields', ()=>{
    component['updateSelected'](1);
    expect(component['selectedFields'].length).toEqual(1);
    component['updateSelected'](1);
    expect(component['selectedFields'].length).toEqual(0);
  });

  it ('should download a xls', ()=>{
    component['selectedFields']=[3,2,1];
    component['download']();
    //const downloadSpy = spyOn(apiService,'descargar');
    expect(component['selectedFields'].length).toEqual(3);
    expect(component['selectedFields']).toEqual([1,2,3]);
    //expect(downloadSpy).toHaveBeenCalled();
  });

  it('should upvote a megusta',()=>{
    component.ngOnInit();
    const apiSpy = spyOn(apiService,'updateVote').and.returnValue(new Observable());
    component['upVote'](0,0,1);
    expect(apiSpy).toHaveBeenCalled();
    expect(component.gustos[0].meGusta_cont).toEqual(2);
  });

  it('should upvote a nogusta',()=>{
    component.ngOnInit();
    const apiSpy = spyOn(apiService,'updateVote').and.returnValue(new Observable());
    component['upVote'](0,0,0);
    expect(apiSpy).toHaveBeenCalled();
    expect(component.gustos[0].noGusta_cont).toEqual(3);
  });

  it('should downvote a megusta',()=>{
    component.ngOnInit();
    const apiSpy = spyOn(apiService,'updateVote').and.returnValue(new Observable());
    component['downVote'](0,0,1);
    expect(apiSpy).toHaveBeenCalled();
    expect(component.gustos[0].meGusta_cont).toEqual(0);
  });

  it('should downvote a nogusta',()=>{
    component.ngOnInit();
    const apiSpy = spyOn(apiService,'updateVote').and.returnValue(new Observable());
    component['downVote'](0,0,0);
    expect(apiSpy).toHaveBeenCalled();
    expect(component.gustos[0].noGusta_cont).toEqual(1);
  });

  it('should NOT upvote a nogusta',()=>{
    const errorResponse = new HttpErrorResponse ({
      error: { code: `codigo`, message: `mensaje.` },
      status: 401,
      statusText: 'Unauthorized',
    });
    component.ngOnInit();
    const apiSpy = spyOn(apiService,'updateVote').and.returnValue(throwError(()=> errorResponse));
    component['upVote'](0,0,0);
    expect(apiSpy).toHaveBeenCalled();
  });

  it('should NOT downvote a megusta',()=>{
    const errorResponse = new HttpErrorResponse ({
      error: { code: `codigo`, message: `mensaje.` },
      status: 401,
      statusText: 'Unauthorized',
    });
    component.ngOnInit();
    const apiSpy = spyOn(apiService,'updateVote').and.returnValue(throwError(()=> errorResponse));
    component['downVote'](0,0,1);
    expect(apiSpy).toHaveBeenCalled();
  });

  it('should NOT downvote a nogusta',()=>{
    const errorResponse = new HttpErrorResponse ({
      error: { code: `codigo`, message: `mensaje.` },
      status: 401,
      statusText: 'Unauthorized',
    });
    component.ngOnInit();
    const apiSpy = spyOn(apiService,'updateVote').and.returnValue(throwError(()=> errorResponse));
    component['downVote'](0,0,0);
    expect(apiSpy).toHaveBeenCalled();
  });

  it('should pre-load a correct file type and enable upload button.', ()=> {
    const file = [];
    file.push({type:"application/vnd.ms-excel"});
    const eventObj = {
      target: {
        files: file
      }
    }
    component['onFileSelected'](eventObj);
    expect(component.updateBtn).toBeTrue();
  });

  
  it('should NOT pre-load a correct file type and enable upload button.', ()=> {
    const file = [];
    file.push({type:"text/html"});
    const eventObj = {
      target: {
        files: file
      }
    }
    const swalSpy = spyOn(Swal,'fire');
    component['onFileSelected'](eventObj);
    expect(component.updateBtn).toBeFalse();
    expect(swalSpy).toHaveBeenCalled();
  });

  it('should upload the selected file.', ()=>{
    const apiSpy = spyOn(apiService,'upload').and.returnValue(new Observable());
    component['upload']();
    expect(apiSpy).toHaveBeenCalled();
  });
});
