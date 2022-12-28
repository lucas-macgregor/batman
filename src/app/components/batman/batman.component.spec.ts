import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Options } from 'src/app/models/options';
import { BatmanComponent } from './batman.component';

describe('BatmanComponent', () => {
  let component: BatmanComponent;
  let fixture: ComponentFixture<BatmanComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatmanComponent ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatmanComponent);
    component = fixture.componentInstance; 

    component.opciones=[
      {
        id: 0,
        opcion: 'Un vampiro musculoso :O!'
      },
      {
        id: 1,
        opcion: 'Bruce Wayne :O!'
      }
    ]
    component.batSelect=component.opciones[0].opcion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/////////////////////////////Sabe variable tests starts///////////////////////////
  it ('test if sabe element starts as Un vampiro musculoso :O!', () => {
    const text:HTMLElement=fixture.nativeElement.querySelector('#sabe');
    expect(text.innerText)
      .toMatch('Un vampiro muscoloso :O!');
  });

  it ('test if sabe variable starts on false', () => {
    expect(component.sabe)
      .toBeFalse()
  });

  it ('test if sabe element changes its value', () => {
    const checklist:HTMLElement=fixture.nativeElement.querySelector('#checkbox');
    checklist.click();
    fixture.detectChanges();
    const text:HTMLElement=fixture.nativeElement.querySelector('#sabe');
    expect(text.innerText)
      .toMatch('Bruce Wayne :O!');
  });

  it ('test if sabe variable changes on click', () => {
    const checklist:HTMLElement=fixture.nativeElement.querySelector('#checkbox');
    checklist.click();
    fixture.detectChanges();
    expect(component.sabe)
      .toBeTrue()
  });
/////////////////////////////batSelect variable tests starts///////////////////////////
  it ('test if the initial element of the batSelect is the first options array element', () => {
    const inputEl: HTMLElement=fixture.nativeElement.querySelector('#batSelect');
    expect(inputEl.innerText)
      .toEqual(`Batman es: ${component.batSelect}`);

  });

  it ('test if the element of the batSelect changes its value', () => {
    component.batSelect=component.opciones[1].opcion;
    fixture.detectChanges();
    const batmanEl: HTMLElement=fixture.nativeElement.querySelector('#batSelect');
    expect(batmanEl.innerText)
      .toEqual(`Batman es: ${component.batSelect}`);
  });
/////////////////////////////esCorrecto method tests starts///////////////////////////
  it ('test esCorrecto correct value', () => {
    component.batSelect=component.opciones[1].opcion;
    fixture.detectChanges();
    const btnEl: HTMLElement=fixture.nativeElement.querySelector('#esCorrectoBtn');
    let selected:string='';
    component.esCorrectoEvento.subscribe((value) => selected = value);
    btnEl.click();
    expect(selected)
      .toContain('Bruce Wayne');
  });

  it ('test esCorrecto inccorrect value', () => {
    const btnEl: HTMLElement=fixture.nativeElement.querySelector('#esCorrectoBtn');
    let selected:string='';
    component.esCorrectoEvento.subscribe((value) => selected = value);
    btnEl.click();
    expect(selected)
      .not.toContain('Bruce Wayne');
  });
/////////////////////////////agregarOpcion method tests starts///////////////////////////
  it('should emit the event agregarOpcionEvento when passing an empty value', () => {       
    spyOn(component.agregarOpcionEvento, 'emit');
    component.agregarOpcion('Un vampiro musculoso.');
    expect(component.agregarOpcionEvento.emit)
      .toHaveBeenCalled();
  });

  it('should not emit the event agregarOpcionEvento when passing an empty value', () => {       
    spyOn(component.agregarOpcionEvento, 'emit');
    component.agregarOpcion('');
    expect(component.agregarOpcionEvento.emit)
      .not.toHaveBeenCalled();
  });
/////////////////////////////quitarOpcion method tests starts///////////////////////////
  it('should emit the event quitarOpcionEvento', () => {       
    spyOn(component.quitarOpcionEvento, 'emit');
    component.quitarOpcion('0');
    expect(component.quitarOpcionEvento.emit)
      .toHaveBeenCalled();
  });

  it('should not emit the event quitarOpcionEvento when passing an empty value', () => {       
    spyOn(component.quitarOpcionEvento, 'emit');
    component.quitarOpcion('');
    expect(component.quitarOpcionEvento.emit)
      .not.toHaveBeenCalled();
  });
});
