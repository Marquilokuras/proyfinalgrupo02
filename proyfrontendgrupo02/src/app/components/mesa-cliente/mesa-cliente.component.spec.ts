import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaClienteComponent } from './mesa-cliente.component';

describe('MesaClienteComponent', () => {
  let component: MesaClienteComponent;
  let fixture: ComponentFixture<MesaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
