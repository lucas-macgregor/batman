import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


class MockAuthService {
  loggedIn=new BehaviorSubject<boolean>(false);

  changeStatusToTrue():void {
    this.loggedIn.next(true);
  }

  changeStatusToFalse():void {
    this.loggedIn.next(false);
  }

  isLoggedIn():Observable<boolean> {
    return this.loggedIn;
  }
}


describe('AuthGuardGuard', () => {
  let guard: AuthGuard;
  let authService:MockAuthService;
  let routeMock:any = {snapshot: {}};
  let routeStateMock: any = {snapshot: {}, url: '/batman/gustos'};
  let routerMock = {navigate: jasmine.createSpy('navigate')};
  beforeEach(() => {
    authService=new MockAuthService();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue:authService},
        {provide: Router, useValue: routerMock}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Should start guarded', ()=> {
    expect(guard.loggedIn).toBeFalse();
  });

  it('should keep guarded on login error', ()=> {
    authService.changeStatusToFalse();
    expect(guard.canActivate(routeMock, routeStateMock)).toBeFalse();
  });

  it('should allow authenticated user to access app', ()=> {
    authService.changeStatusToTrue();
    expect(guard.canActivate(routeMock, routeStateMock)).toBeTrue();
  });

  it('should navigate to login if error happens', ()=>{
    spyOn(authService,'isLoggedIn').and.returnValue(throwError(()=>new Observable<Error>()));
    expect(guard.canActivate(routeMock, routeStateMock)).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
