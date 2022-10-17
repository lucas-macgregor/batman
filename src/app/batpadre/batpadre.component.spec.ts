import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatpadreComponent } from './batpadre.component';

describe('BatpadreComponent', () => {
  let component: BatpadreComponent;
  let fixture: ComponentFixture<BatpadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatpadreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatpadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
