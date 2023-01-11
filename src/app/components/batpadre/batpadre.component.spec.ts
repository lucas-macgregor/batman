import { ComponentFixture, TestBed} from '@angular/core/testing';
import { BatpadreComponent } from './batpadre.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Options } from 'src/app/models/options';
import { BehaviorSubject, Observable} from 'rxjs';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

class MockApiService {
  opciones = new BehaviorSubject<Options[]>(
  [
    {
      id:0,
      opcion: 'un vampiro'
    },
    {
      id:1,
      opcion: 'Bruce Wayne'
    }
  ]);

  agregarOpcion(opcion:string):Observable<Options[]>{
    const modified:Options[]=this.opciones.value;
    modified.push({id:10, opcion: opcion});
    this.opciones.next(modified);
    return this.opciones;
  }

  getOpciones():Observable<Options[]> {
    return this.opciones;
  }

  quitarOpcion(id:number):Observable<Options[]> {
    const modified:Options[]=this.opciones.value.splice(id,1);
    this.opciones.next(modified);
    return this.opciones;
  }
}

class MockAuthService {
  expiredToken ():void {
    
  };
}

describe('BatpadreComponent', () => {
  let component: BatpadreComponent;
  let fixture: ComponentFixture<BatpadreComponent>;
  let apiService:MockApiService;
  let auth:MockAuthService;
  beforeEach(async () => {
    apiService=new MockApiService();
    auth=new MockAuthService();
    await TestBed.configureTestingModule({
      declarations: [ BatpadreComponent ],
      providers: [
        {provide: ApiService, useValue: apiService},
        {provide: AuthService, useValue: auth},
      ],
      imports: [HttpClientTestingModule, SweetAlert2Module],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatpadreComponent);
    component = fixture.componentInstance;

    apiService.getOpciones().subscribe((valor) => component.opciones= valor);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  /////////////////////////ngOnInit update//////////////////////////////
  it('should update options at start and have 2 elements', () => {
    expect(component.opciones.length)
      .toEqual(2);
  });

  it('should not update info on an error', () => {
    const serviceSpy = spyOn(apiService,'getOpciones').and.returnValue(throwError(() => new Observable<Error>()));
    component.ngOnInit();
    expect(serviceSpy)
      .toHaveBeenCalled();
  });
  ///////////////////////AgregarOpcion tests////////////////////////////////

  it ('should add an option', () => {
    component.agregarOpcion('asd');
    expect(component.opciones.length).toEqual(3);
  });

  it ('should NOT add an option', () => {
    const spy = spyOn (apiService,'agregarOpcion').and.returnValue(throwError(() => new Observable<Error>()));
    const consoleSpy = spyOn(console,'error');
    component.agregarOpcion('asd');
    expect(consoleSpy)
      .toHaveBeenCalled();
    expect(spy)
      .toHaveBeenCalled();
    expect(component.opciones.length)
      .toEqual(2);
  });
  
  /////////////////////////testing on quitaropcion//////////////////////
  it('should delete 1 element and update the options', () => {
    component.quitarOpcion(0);
    expect(component.opciones.length)
      .toEqual(1);
  });


  /////////////////////////automatic set option for batselect///////////
  it('should delete 1 element and set default option', () => {
    component.quitarOpcion(0);
    component.batSelect=component.opciones[0].opcion;
    expect(component.batSelect)
      .toMatch('un vampiro');
  });
  
  it('should launch error', () => { 
    const serviceSpy = spyOn(apiService,'quitarOpcion').and.returnValue(throwError(() => new Observable<Error>()));
    component.quitarOpcion(10);
    expect(serviceSpy)
      .toHaveBeenCalled();
  });

  /////////////////////EsCorrecto test//////////////////////////////////
  it('should call esCorrecto and fire swal with correct option', () => {
    const swalSpy = spyOn(Swal,'fire');
    component.esCorrecto('Bruce Wayne'); 
    expect(swalSpy).toHaveBeenCalled();
  });

  it('should call esCorrecto and fire swal with incorrect option', () => {
    const swalSpy = spyOn(Swal,'fire');
    component.esCorrecto('asdasd'); 
    expect(swalSpy).toHaveBeenCalled();
  });
  /////////////////////Actualizar Opciones test//////////////////////////////////

  it('should show an empty string on batselect if options are 0', ()=>{
    const serviceSpy = spyOn(apiService,'getOpciones').and.returnValue(new Observable<Options[]>());
    component.ngOnInit();
    fixture.detectChanges();
    expect(serviceSpy)
      .toHaveBeenCalled();
    expect(component.batSelect)
      .toMatch('');
  });

  it('should show an error on wrong token', ()=>{
    const errorResponse = new HttpErrorResponse ({
      error: { code: `codigo`, message: `mensaje.` },
      status: 401,
      statusText: 'Unauthorized',
    });
    const serviceSpy = spyOn(apiService,'getOpciones').and.returnValue(throwError(()=> errorResponse));
    const tokenSpy = spyOn(auth,'expiredToken');
    component.actualizarOpciones();

    expect(serviceSpy)
      .toHaveBeenCalled();
    expect(tokenSpy)
      .toHaveBeenCalled();
  });
});