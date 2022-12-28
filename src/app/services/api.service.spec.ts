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
    const testData: Table[]=[{ id:0 , meGusta: 'asd', noGusta: 'asd2'}];
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

  it('should send correct data to deletion',()=>{
    service.quitarOpcion(1).subscribe();
    const req = httpTestingController.expectOne(apiDir+'/quitaropcion/1');
    expect(req.request.method).toEqual('DELETE');
  });
});
