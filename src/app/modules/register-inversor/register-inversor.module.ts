import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDirectionComponent } from './register-direction/register-direction.component';
import { RegisterInfoFinancialComponent } from './register-info-financial/register-info-financial.component';
import { RegisterInversorComponent } from './register-inversor.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RegisterProfileComponent } from './register-profile/register-profile.component';
import {MatInputModule} from '@angular/material/input';

import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    RegisterInversorComponent,
    RegisterDirectionComponent,
    RegisterInfoFinancialComponent,
    RegisterProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    MatInputModule,MatFormFieldModule
  ]
})
export class RegisterInversorModule { }
