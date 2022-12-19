import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInfoFinancialComponent } from './register-info-financial.component';

describe('RegisterInfoFinancialComponent', () => {
  let component: RegisterInfoFinancialComponent;
  let fixture: ComponentFixture<RegisterInfoFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInfoFinancialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInfoFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
