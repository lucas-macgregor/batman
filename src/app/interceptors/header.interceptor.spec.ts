import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeaderInterceptor } from './header.interceptor';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

class MockAuthService {
  uname=new BehaviorSubject<string>('');
  token:string|null='';
  getUsername ():Observable<string> {
    return this.uname;
  }

  setUsername (name:string):void {
    this.uname.next(name);
  }

  getToken():string|null {
    return this.token;
  }

  setToken(token:string|null) {
    this.token=token;
  }
}

describe('HeaderInterceptor', () => {
  let authService:MockAuthService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    authService=new MockAuthService();

    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      HeaderInterceptor,
      {provide: AuthService, useValue: authService},
      {provide: HTTP_INTERCEPTORS,
        useClass: HeaderInterceptor,
        multi: true}
      ]
    });
  httpMock=TestBed.inject(HttpTestingController);
  httpClient=TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const interceptor: HeaderInterceptor = TestBed.inject(HeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should start with empy username', ()=>{
    const interceptor: HeaderInterceptor = TestBed.inject(HeaderInterceptor);
    expect(interceptor.username).toMatch('');
  });

  it('should get an error at getting constructor username', ()=>{
    const authSpy= spyOn(authService,'getUsername').and.returnValue(throwError(()=>new Observable<Error>()));
    const interceptor: HeaderInterceptor = TestBed.inject(HeaderInterceptor);
    expect(authSpy).toHaveBeenCalled();
    expect(interceptor.username).toMatch('');
  });

  it('should intercept request with empty username and token', ()=>{
    const url='http://miapi.com/ruta';
    httpClient.get(url).subscribe();
    const mockRequest=httpMock.expectOne(url);
    const authTokenHeader=mockRequest.request.headers.get('token');
    const authUserHeader=mockRequest.request.headers.get('username');
    expect(authTokenHeader).toMatch('');
    expect(authUserHeader).toMatch('');
  });

  it('should intercept request with NOT empty username and token', ()=>{
    const url='http://miapi.com/ruta';
    authService.setToken('prueba');
    authService.setUsername('prueba');
    httpClient.get(url).subscribe();
    const mockRequest=httpMock.expectOne(url);
    const authTokenHeader=mockRequest.request.headers.get('token');
    const authUserHeader=mockRequest.request.headers.get('username');
    expect(authTokenHeader).toMatch('prueba');
    expect(authUserHeader).toMatch('prueba');
  });

  it('should intercept request with null token', ()=>{
    const url='http://miapi.com/ruta';
    authService.setToken(null);
    authService.setUsername('');
    httpClient.get(url).subscribe();
    const mockRequest=httpMock.expectOne(url);
    const authTokenHeader=mockRequest.request.headers.get('token');
    const authUserHeader=mockRequest.request.headers.get('username');
    expect(authTokenHeader).toMatch('');
    expect(authUserHeader).toMatch('');
  });
});
