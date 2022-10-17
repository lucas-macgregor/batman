import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatmanComponent } from './batman.component';

describe('BatmanComponent', () => {
  let component: BatmanComponent;
  let fixture: ComponentFixture<BatmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatmanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
