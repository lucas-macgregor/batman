import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Table } from '../models/table';
import { Options } from '../models/options';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient:HttpClient;
  let httpTestingController:HttpTestingController;
  const apiDir:string='http://localhost:3050'
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=> {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct data from getGustos', ()=>{
    const testData: Table[]=[{ id:0 , meGusta: 'asd', noGusta: 'asd2', meGusta_cont:1, noGusta_cont:2}];
    service.getGustos().subscribe(data => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne(apiDir+'/gustos');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should return correct data from getOpciones', ()=>{
    const testData: Options[]=[{ id:0 , opcion: 'Bruce Wayne'}];
    service.getOpciones().subscribe(data => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne(apiDir+'/opciones');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should return send data from agregarOpcion', ()=>{
    const testData:Object={opcion:'asd'};
    service.agregarOpcion('asd').subscribe(data => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne(apiDir+'/agregaropcion');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({opcion:'asd'});
    req.flush(testData);
  });

  it('should send correct data to deletion of opciones',()=>{
    service.quitarOpcion(1).subscribe();
    const req = httpTestingController.expectOne(apiDir+'/quitaropcion/1');
    expect(req.request.method).toEqual('DELETE');
  });

  it('should return send data from agregarGusto', ()=>{
    const testData:Object={meGusta:'megusta', noGusta: 'nogusta'};
    service.agregarGusto('megusta','nogusta').subscribe(data => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne(apiDir+'/agregargusto');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);
    req.flush(testData);
  });

  it('should send correct data to deletion of gustos',()=>{
    service.quitarGusto(1).subscribe();
    const req = httpTestingController.expectOne(apiDir+'/quitargusto/1');
    expect(req.request.method).toEqual('DELETE');
  });

  it('should send correct data to deletion',()=>{
    service.editarGusto(1,'megusta','nogusta').subscribe();
    const req = httpTestingController.expectOne(apiDir+'/editargusto/1');
    expect(req.request.body).toEqual({meGusta: 'megusta', noGusta: 'nogusta'});
    expect(req.request.method).toEqual('PATCH');
  });
});
