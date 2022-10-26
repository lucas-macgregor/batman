import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GustosComponent } from './gustos.component';

describe('GustosComponent', () => {
  let component: GustosComponent;
  let fixture: ComponentFixture<GustosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GustosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
