import { SimpleChange } from '@angular/core';
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
    component.gustos=[{
      id: 0,
      meGusta: 'Helado',
      noGusta: 'Vinagre',
      meGusta_cont: 1,
      noGusta_cont: 2
    },
    {
      id:1,
      meGusta: 'Milanesa',
      noGusta: 'Mayonesa',
      meGusta_cont: 1,
      noGusta_cont: 2
    },
    {
      id:2,
      meGusta: 'Algo',
      noGusta: 'Algont',
      meGusta_cont: 1,
      noGusta_cont: 2
    }]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should detect changes',()=>{
    const newTable=component.gustos[1];
    component.gustos=[newTable];
    component.ngOnChanges({
      gustos: new SimpleChange(null, [newTable] ,true)
    });
    fixture.detectChanges();
    expect(typeof(component.gustos)).toBe('object');
    expect(component.gustos.length).toEqual(1);
    expect(component.dataLabels).toMatch('Mayonesa/Milanesa');
    expect(component.dataArrays[1][0]).toEqual(2);
    expect(component.dataArrays[2][0]).toEqual(1);
    });

    it('should change chart type on click',()=> {
      expect(component.barChartType).toMatch('bar');
      component.changeOnClick();
      expect(component.barChartType).toMatch('line');
      component.changeOnClick();
      expect(component.barChartType).toMatch('bar');
    });
});