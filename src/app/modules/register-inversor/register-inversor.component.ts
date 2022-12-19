import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { InvestmentService } from 'src/app/services/InvestmentService';
import { ConfirmMessageComponent } from '../confirm-message/confirm-message.component';
import { DirectionInversor } from '../model/Direction';
import { InfoFinancial } from '../model/InfoFinancial';
import { IDirectionInversor } from '../model/interfaces/IDirection';
import { IInfoFinancial } from '../model/interfaces/IInfoFinancial';
import { IInversor, ResponseInversor } from '../model/interfaces/IInversor';
import { Inversor } from '../model/Inversor';

@Component({
  selector: 'app-register-inversor',
  templateUrl: './register-inversor.component.html',
  styleUrls: ['./register-inversor.component.css']
})
export class RegisterInversorComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    public dialog: MatDialog,
     private router: Router,
     private route: ActivatedRoute, 
    private investmentService:InvestmentService) { }
  inversor: Inversor = new Inversor()  ;
  direction!: DirectionInversor;
  infoFinancial!: InfoFinancial ;
  showProfile: boolean = true;
  showDirection: boolean = false;
  showInfoFinance: boolean = false;
  contSections =0;
  sections: Array<boolean> = [this.showProfile, this.showDirection, this.showInfoFinance];


  previousSection(){
  
    
      this.contSections= this.contSections- 1;
    
      
    
  }

  nextSection(object: any){
   
    switch(this.contSections){
      case 0:
        this.inversor =  object; 
      break;
      case 1: 
      this.direction = object;
      break;
      case 2:
        this.infoFinancial = object;
        break;
   
    }
    this.contSections= this.contSections + 1;
    if(this.contSections==3){
      this.saveData();
    }

      
    
  }

  saveData():void{
   let response= this.investmentService.createInversor(this.inversor);
   
   response.subscribe(
    response=>{
      if(!response.error){
              this.dialog
              .open(ConfirmMessageComponent, {
                data: "Datos del inversionista registrado con éxito"
          });
          
        }else{
          this.dialog
          .open(ConfirmMessageComponent, {
            data: response.mensaje
      });
        }
      }
      )
      
       let responseInfo = this.investmentService.createInfoFinancial(this.infoFinancial);
        responseInfo.subscribe(
          value=> {
             if(!value.error){     
              this.dialog
              .open(ConfirmMessageComponent, {
                data: "La información financiera se ha registrado con éxito"
              });
             }else{
              this.dialog
              .open(ConfirmMessageComponent, {
                data: value.mensaje
              });
             }
            })
          
            this.router.navigate([`/principal`], { relativeTo: this.route });
            this.createDirection();
      
    }
    
    createDirection(){

            this.direction.idInversionista = this.inversor.rfc;
            let responseDirection = this.investmentService.createDirection(this.direction);
            responseDirection.subscribe(
            valueDirection=> {
             if(!valueDirection.error){     
              this.dialog
              .open(ConfirmMessageComponent, {
                data: "La dirección del inversionista se ha registrado con éxito"
              });
             }else{
              this.dialog
              .open(ConfirmMessageComponent, {
                data: valueDirection.mensaje
              });
             }
            })
        
    }
   
  
  

  ngOnInit(): void {
  }

}
