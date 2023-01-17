import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GustosChartsComponent } from './gustos-charts.component';

describe('GustosChartsComponent', () => {
  let component: GustosChartsComponent;
  let fixture: ComponentFixture<GustosChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GustosChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GustosChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
