import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserLoginInt } from 'src/app/models/userLoginInterface';

class MockAuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn ():Observable<boolean> {
    return this.loggedIn;
  }

  fakeLogin():void {
    this.loggedIn.next(true);
  }

  logout():void{
    this.loggedIn.next(false);
  }

  login(user:UserLoginInt):Observable<boolean> {
    if (user.password==='correct' && user.username==='correct') {
      this.loggedIn.next(true);
      return this.loggedIn;
    }
    else {
      return throwError(()=>new Observable<Error>());
    }
      
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: MockAuthService;;
  beforeEach(async () => {
    auth=new MockAuthService();
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientModule],
      providers: [{provide: AuthService, useValue: auth}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


///////////////////////////////////Initial Tests///////////////////////////////////////////
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start unlogged and no errors', ()=>{
    expect(component['loggedIn']).toBeFalse();
    expect(component['onLoginError']).toBeFalse();
  })

  it('should keep unlogged on error', ()=> {
    const authSpy = spyOn(auth,'isLoggedIn').and.returnValue(throwError(()=> new Observable<Error>()));
    component.ngOnInit();
    expect(authSpy).toHaveBeenCalled();
    expect(component['loggedIn']).toBeFalse();
    expect(component['onLoginError']).toBeFalse();
  });
  
///////////////////////////////////Log Out Tests///////////////////////////////////////////

  it('Should call auth log out and change status' , ()=> {
    component.ngOnInit();
    auth.fakeLogin();
    expect(component['loggedIn']).toBeTrue();
    component['logOut']();
    expect(component['loggedIn']).toBeFalse();
  });

  ///////////////////////////////////Log In Tests///////////////////////////////////////////

  it('should not login on empty username/password', ()=> {
    component.ngOnInit();
    component['onLogin']('','');
    expect(component['loggedIn']).toBeFalse();
  });

  it('should log in with correct credentials', ()=>{
    component.ngOnInit();
    component['onLogin']('correct','correct');
    expect(component['loggedIn']).toBeTrue();
  });

  it('should change onLoginError on error', ()=> {
    component.ngOnInit();
    component['onLogin']('asd','asd');
    expect(component['onLoginError']).toBeTrue();
  });
});

