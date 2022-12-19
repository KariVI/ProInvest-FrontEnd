import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDirectionComponent } from './register-direction.component';

describe('RegisterDirectionComponent', () => {
  let component: RegisterDirectionComponent;
  let fixture: ComponentFixture<RegisterDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
