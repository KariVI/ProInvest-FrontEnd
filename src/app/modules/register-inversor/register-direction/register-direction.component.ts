import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from 'ng2-charts';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ConfirmMessageComponent } from '../../confirm-message/confirm-message.component';
import { DirectionInversor} from '../../model/Direction';
import { ICpData } from '../../model/interfaces/IPostalCode';

@Component({
  selector: 'app-register-direction',
  templateUrl: './register-direction.component.html',
  styleUrls: ['./register-direction.component.css']
})
export class RegisterDirectionComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog,private data: DataService) { }

  $sepoMex: Observable<ICpData[]> =new Observable();
  ngOnInit( ): void {
    if(this.direction){
      this.directionGroup.get('postalCode')?.setValue(this.direction.postalCode);
      this.$sepoMex=this.data.getDataByPostalCode(this.direction.postalCode);
      this.directionGroup.get("street")?.setValue(this.direction.street);
      this.directionGroup.get("intStreet")?.setValue(this.direction.intStreet);
      if(this.direction.interior!=0){
        this.directionGroup.get("secondIntStreet")?.setValue(this.direction.interior);

      }
    }
  }

  showSecondSection: boolean = false;

  @Input() direction:DirectionInversor = new DirectionInversor();
  @Output() previousPhase = new EventEmitter<void>();
  @Output() nextPhase = new EventEmitter<any>();
  newDirection: DirectionInversor = new DirectionInversor();
  directionGroup:FormGroup= this.fb.group({
   
    postalCode: new FormControl('', Validators.compose([
        Validators.required
      ])),
    colony: new FormControl('' , null),
  street: new FormControl('', Validators.compose([
        Validators.required
      ])),
  intStreet: new FormControl('', Validators.compose([
        Validators.required
    ])),
    secondIntStreet: new FormControl('', )
  });

  searchCodePostal(){
    if(this.directionGroup.get('postalCode')?.value){
      let postalCode = this.directionGroup.get('postalCode')?.value.toString();
      this.$sepoMex=this.data.getDataByPostalCode(postalCode);
      this.showSecondSection=true;
      
    }else{
      this.dialog
          .open(ConfirmMessageComponent, {
              data: "Escribe tu código postal"
          });
    }

  }
  public validationMessages = {
    postalCode: [
      { type: 'required', message: 'No se ha escrito un código postal .' }
    ],
    colony: [
      { type: 'required', message: 'La colonia no esta seleccionada.' }
    ],
    street: [
      { type: 'required', message: 'La calle no es válida' }
    ],
    intStreet: [
      { type: 'required', message: 'El número de calle no esta seleccionado.' }
    ]
  }

  evaluateForm():boolean{
    let result: boolean = true;
    let colony = this.directionGroup.get('postalCode')?.value.toString();

    if(this.directionGroup.valid  && colony!="none"){
      result=false;
    }
    return result;
  }

  createDirection(){
  
    this.newDirection= new DirectionInversor();
    
    this.newDirection.colony = this.directionGroup.get('colony')?.value.toString();
    this.newDirection.street = this.directionGroup.get('street')?.value.toString();
    this.newDirection.postalCode = this.directionGroup.get('postalCode')?.value.toString();
    this.newDirection.intStreet = Number.parseInt(this.directionGroup.get('intStreet')?.value.toString());
    if(this.directionGroup.get('secondIntStreet')?.value){
      this.newDirection.interior = Number.parseInt(this.directionGroup.get('secondIntStreet')?.value.toString());
    }
  }

  nextSection(direction: DirectionInversor){
    this.createDirection();
    this.nextPhase.emit(this.newDirection);
  }
  returnInfo(): void{
    this.previousPhase.emit();
  }
}
