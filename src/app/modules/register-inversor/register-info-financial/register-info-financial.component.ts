import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {  InfoFinancial } from '../../model/InfoFinancial';
import { IBank, ISourceFunds } from '../../model/interfaces/IBank';

@Component({
  selector: 'app-register-info-financial',
  templateUrl: './register-info-financial.component.html',
  styleUrls: ['./register-info-financial.component.css']
})
export class RegisterInfoFinancialComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: DataService) { }
  @Input() infoFinancial: InfoFinancial = new InfoFinancial();
  @Output() previousPhase = new EventEmitter<void>();
  $banks: Observable<IBank[]> = new Observable();
  $sourceFunds: Observable<ISourceFunds[]> = new Observable();
  @Output() nextPhase = new EventEmitter<any>();
  newInfoFinancial: InfoFinancial = new InfoFinancial();
  ngOnInit(): void {
    this.$banks= this.data.getBanks();
    this.$sourceFunds = this.data.getSourcesFund();
  }
  

  infoFinanceGroup:FormGroup= this.fb.group({
    bank: new FormControl('',null),
    clabe: new FormControl('', Validators.compose([
      Validators.required,
      ])),
    savings: new FormControl('',null),
    accountBank: new FormControl('', Validators.compose([
        Validators.required
      ]))
  });

  evaluateForm():boolean{
    let result: boolean = true;
    let bank = this.infoFinanceGroup.get("bank")?.value;
    let savings = this.infoFinanceGroup.get("savings")?.value;
    if(this.infoFinanceGroup.valid && bank!="none" && savings!="none" ){
      result=false;
    }
    return result;
  }

  public validationMessages = {
 
    clabe: [
      { type: 'required', message: 'Ingresa tu CLABE.' }
    ],
    accountBank: [
      { type: 'required', message: 'Ingresa tu cuenta bancaria.' } ]
   
   
   
  }

  createInfoFinancial(){
    this.newInfoFinancial.bank = this.infoFinanceGroup.get("bank")?.value;
    this.newInfoFinancial.clabe = this.infoFinanceGroup.get("clabe")?.value;
    this.newInfoFinancial.accountBank = this.infoFinanceGroup.get("accountBank")?.value;
    this.newInfoFinancial.savings = this.infoFinanceGroup.get("savings")?.value;
   

  }

  nextSection(info: InfoFinancial){
    this.createInfoFinancial();
    this.nextPhase.emit(info);
  }

  returnInfo(): void{
    this.previousPhase.emit();
  }
 
  
  
}
