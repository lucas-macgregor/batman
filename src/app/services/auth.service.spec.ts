import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpTestingController } from '@angular/common/http/testing'
import { UserLoginInt } from '../models/userLoginInterface';
import { LoginRespInt } from '../models/loginRespInterface';
import { UserInfoInt } from '../models/userInfoInt';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';



describe('AuthService', () => {
  let service: AuthService;
  let httpClient:HttpClient;
  let httpTestingController:HttpTestingController;
  let router:Router;
  const apiDir:string='http://localhost:3050'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    router=TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient=TestBed.inject(HttpClient);
  });

  afterEach(()=> {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login correctly',()=>{
    const user:UserLoginInt={username: 'asd', email: 'asd@asd.com', password:'asd'};
    const mockResponse:LoginRespInt={username: 'asd', email: 'asd@asd.com', accessToken: 'token'};

    service.login(user).subscribe(data => expect(data).toBeTruthy());
    const req = httpTestingController.expectOne(apiDir+'/login');
    req.flush(mockResponse);
    expect(service['email'].value).toMatch(user.email);
    expect(service['username'].value).toMatch(user.username);
    expect(service['loggedIn'].value).toBeTrue();
    expect(service['token']).toMatch('token');
    expect(req.request.method).toBe("POST");
    localStorage.clear();
  });

  it ('should correctly save a token', ()=> {
    const token:string='token';
    service['saveToken'](token);
    expect(service['token']).toMatch(token);
    expect(localStorage.getItem('ACCESS_TOKEN')).toMatch(token);
    localStorage.clear();
  });

  it('should delete login info on logout', ()=>{
    service['email'].next('asd@asd.com');
    service['saveToken']('token');
    service['loggedIn'].next(true);
    service['username'].next('asd');
    service.logout();
    expect(service['email'].value).toMatch('');
    expect(service['username'].value).toMatch('');
    expect(service['loggedIn'].value).toBeFalse();
    expect(service['token']).toMatch('');
  });

  it('should return a valid token', ()=> {
    localStorage.setItem('ACCESS_TOKEN', 'token');
    expect(service.getToken()).toMatch('token');
    expect(service['token']).toMatch('token');
    localStorage.clear();
  });

  it('should stay logged off is there is no token on localstorage',()=>{
    service.setInitialStatus();
    expect(service['loggedIn'].value).toBeFalse();
  });

  it('should get info from backend if there is a token stored',()=>{
    localStorage.setItem('ACCESS_TOKEN','token');
    const mockResponse:UserInfoInt={username: 'asd', email: 'asd@asd.com'};
    service.setInitialStatus();
    const req = httpTestingController.expectOne(apiDir+'/getuserinfo');
    req.flush(mockResponse);
    expect(service['username'].value).toMatch(mockResponse.username);
    expect(service['email'].value).toMatch(mockResponse.email);
    expect(req.request.method).toBe("GET");
    localStorage.clear();
  });

  it('should log an error on backend failure and stay logged off',()=>{
    localStorage.setItem('ACCESS_TOKEN','token');
    spyOn(httpClient,'get').and.returnValue(throwError(() => new Observable<Error>()));
    service.setInitialStatus();
    expect(service['username'].value).toMatch('');
    expect(service['email'].value).toMatch('');
    expect(service['loggedIn'].value).toBeFalse();
    localStorage.clear();
  });

  it('should return login status',()=>{
    service.isLoggedIn().subscribe(data => expect(data).toBeFalse());
  });

  it('should get the username',()=>{
    service.getUsername().subscribe(data => expect(data).toMatch(''));
  });

  it('should get the token',()=>{
    service.getUsername().subscribe(data => expect(data).toMatch(''));
  });

  it('should get the email',()=>{
    service.getEmail().subscribe(data => expect(data).toMatch(''));
  });

  it('should alert for a expired token',()=>{
    const swalSpy=spyOn(Swal,'fire');
    const logoutSpy=spyOn(service,'logout');
    const routerSpy=spyOn(router,'navigateByUrl');
    service.expiredToken();
    expect(swalSpy).toHaveBeenCalled();
    expect(logoutSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });
});