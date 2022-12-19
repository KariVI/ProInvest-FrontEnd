import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmMessageComponent } from '../../confirm-message/confirm-message.component';
import { IResponse } from '../../model/interfaces/IResponse';
import { IUser } from '../../model/interfaces/IUser';
import { User } from '../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url ="http://localhost:4200/usuario";
  $response: Observable<IResponse> = new Observable();
  @Input() showMenu!: boolean ;
  loginGroup:FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required])),
    password: new FormControl('', Validators.compose([
      Validators.required]))
  });
  constructor(private fb: FormBuilder, 
    private userService:UserService, 
    private dataService:DataService, 
    private router: Router,
     private route: ActivatedRoute, 
     public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getBanks();
  }


 

  login(): void{
    let account: User = new User();
      account.email= this.loginGroup.get('email')?.value.toString(),
      account.password= this.loginGroup.get('password')?.value.toString()
    
    this.$response= this.userService.login(account);
    this.$response.forEach(
      (value: IResponse) => {
        if(!value.error){
          this.router.navigate([`/principal`], { relativeTo: this.route });
        }else{
          this.dialog
          .open(ConfirmMessageComponent, {
            data: "El usuario no existe en el sistema / correo o contraseña son incorrectos"
          });
        }
      }
    );
  }

}
