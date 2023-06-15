import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidaFormComponent } from './bebida-form.component';

describe('BebidaFormComponent', () => {
  let component: BebidaFormComponent;
  let fixture: ComponentFixture<BebidaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BebidaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
