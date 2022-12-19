import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInversorComponent } from './register-inversor.component';

describe('RegisterInversorComponent', () => {
  let component: RegisterInversorComponent;
  let fixture: ComponentFixture<RegisterInversorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInversorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInversorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
