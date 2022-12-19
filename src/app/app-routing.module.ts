import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login/login.component';
import { RegisterDirectionComponent } from './modules/register-inversor/register-direction/register-direction.component';
import { RegisterInfoFinancialComponent } from './modules/register-inversor/register-info-financial/register-info-financial.component';
import { RegisterInversorComponent } from './modules/register-inversor/register-inversor.component';
import { RegisterUserComponent } from './modules/register-user/register-user.component';
import { SimulateInvestmentComponent } from './modules/simulate-investment/simulate-investment.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path: 'usuario', component: RegisterUserComponent},
  {path: 'principal', component: SimulateInvestmentComponent},
  {path: 'inversionista', component: RegisterInversorComponent},
  {path: 'direccion', component: RegisterDirectionComponent},
  {path: "financiera", component: RegisterInfoFinancialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
