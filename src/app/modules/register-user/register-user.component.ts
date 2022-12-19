import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from 'src/app/services/user.service';
import { environmentURL } from '../../enviroments/enviroments'
import { ConfirmMessageComponent } from '../confirm-message/confirm-message.component';
import { IDirectionInversor } from '../model/interfaces/IDirection';
import { IInfoFinancial } from '../model/interfaces/IInfoFinancial';
import { IResponse } from '../model/interfaces/IResponse';
import { IUser } from '../model/interfaces/IUser';
import { User } from '../model/User';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService:UserService, public dialog: MatDialog) { }
  direction!:IDirectionInversor;
  infoFinancial!: IInfoFinancial;
  userForm:FormGroup= this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,24}$")]))
  ,
      passwordConfirm: new FormControl('', Validators.compose([
        Validators.required
      ]))
  });

  public validationMessages = {
    email: [
      { type: 'email', message: 'El correo no es valido.' }
    ],
    password: [
      { type: 'minLength', message: 'Tu contraseña debe contener al menos 8 caracteres.' },
      { type: 'pattern', message: ' Tu contraseña debe contener al menos un digito, una minúscula, una mayúscula y un caracter especial.' }]
  }

  ngOnInit(): void {
  }

  validatePasswords(): boolean {
    let value: boolean = false;
    let password = this.userForm.get('password')?.value.toString()
    let passwordConfirm = this.userForm.get('passwordConfirm')?.value.toString()

    if ((password != "" && passwordConfirm != "") && this.equalPasswords()) {
      value = true;
    }
    return value;
  }
  
  
  equalPasswords(): boolean {
    let value: boolean = false;
    let password = this.userForm.get('password')?.value.toString()
    let passwordConfirm = this.userForm.get('passwordConfirm')?.value.toString()

    if (password == passwordConfirm) {
      value = true;
    }


    return value;
  }

  evaluateAccount(): boolean {
    let result: boolean = false;
    if (  this.userForm.valid && this.validatePasswords()) {
      result = true;
    }

    return result;
  }




  createUser(){

    let email=this.userForm.get('email')?.value.toString()
    let existUser: Observable<boolean> = this.userService.getUserbyEmail(email);
    existUser.subscribe(
      responseValue => {
    if(!responseValue){
      let user: User = new User();
      user.email=this.userForm.get('email')?.value.toString();
      user.password=this.userForm.get('password')?.value.toString()
      let response: Observable<IResponse>= this.userService.createUser(user);
      let message: string ="";
    response.subscribe(
      responseValue => {
          this.dialog
          .open(ConfirmMessageComponent, {
            data: responseValue.mensaje
          });
      },
    );
      
    }else{
      this.dialog
      .open(ConfirmMessageComponent, {
        data: "El usuario ya se encuentra registrado"
      });

    }  
  });
  }
}
