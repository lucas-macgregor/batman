import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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

  
});
