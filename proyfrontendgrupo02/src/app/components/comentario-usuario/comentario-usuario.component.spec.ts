import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioUsuarioComponent } from './comentario-usuario.component';

describe('ComentarioUsuarioComponent', () => {
  let component: ComentarioUsuarioComponent;
  let fixture: ComponentFixture<ComentarioUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentarioUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
