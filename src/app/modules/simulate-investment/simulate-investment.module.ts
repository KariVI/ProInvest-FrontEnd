import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SimulateInvestmentComponent } from './simulate-investment.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ SimulateInvestmentComponent
     ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule
  ],
  providers:[ChartsModule]
})
export class SimulateInvestmentModule { }
