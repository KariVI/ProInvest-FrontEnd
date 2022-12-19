import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js'
import {environmentURL} from '../../enviroments/enviroments'
@Component({
  selector: 'app-simulate-investment',
  templateUrl: './simulate-investment.component.html',
  styleUrls: ['./simulate-investment.component.css']
})
export class SimulateInvestmentComponent implements OnInit {

  

  constructor(private fb: FormBuilder) { }

  performance: number[] = [0.0,0.0,0.0,0.0,0.0]
  invesmentGroup:FormGroup= this.fb.group({
    money: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(1)]))
  });

  public validationMessages = {
    money: [
      { type: 'required', message: 'Ingresa un monto' },
      {type: 'min', message: 'Ingresa un monto mayor a 0'}
    ]
    
  }

 

  
  public chart!: Chart;
  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["2022 ", "2023", "2024", "2025", "2026"],
        datasets: [
          {
            label: "Rendimiento",
            data: this.performance,
            backgroundColor: [
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  showRegisterPage(){
    let result = environmentURL.baseClient + "inversionista";
    return result;
  }

  simulate(){
    let money =  Number.parseFloat(this.invesmentGroup.get('money')?.value);
    let annualRate: number = 0.1084;

    for (let i = 0; i < 5; i++) {
      let result: number =money * (annualRate * (i + 1));
      this.performance[i]=  Number.parseFloat(result.toFixed(2));
      money = money + this.performance[i];
    }

    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["2022 ", "2023", "2024", "2025", "2026"],
        datasets: [
          {
            label: "Rendimiento",
            data: this.performance,
            backgroundColor: [
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

  }

  

  
}
