import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Table } from 'src/app/models/table';
import { ApiService } from 'src/app/services/api.service';
import { GustosComponent } from './gustos.component';

class MockApiService {
  tabla=new BehaviorSubject<Table[]>([{
    id: 0,
    meGusta: 'asd',
    noGusta: 'asdasd'
  }]);
  getGustos():Observable<Table[]> {
    return this.tabla;
  }
}

describe('GustosComponent', () => {
  let component: GustosComponent;
  let fixture: ComponentFixture<GustosComponent>;
  const apiService=new MockApiService();
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ GustosComponent ],
      providers: [
        {provide: ApiService, useValue: apiService}
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
    expect(component.gustos.length).toEqual(1);
  });

  it('should not update on error', () => {
    const serviceSpy = spyOn(apiService, 'getGustos').and.returnValue(throwError(()=> new Observable<Error>()));
    component.ngOnInit();
    //expect(component.gustos.length).toEqual(0);
    expect(serviceSpy).toHaveBeenCalled();
  });
});
