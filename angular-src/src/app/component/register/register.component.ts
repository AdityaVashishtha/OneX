import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService  } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  password: String;
  email: String;
  username: String;


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    //this.flashMessage.show("Form Submitted user started registration.");
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Fill in all fields", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    else {
      if(!this.validateService.validateEmail(this.email)) {
        this.flashMessage.show("Please Enter Valid Email",{cssClass: 'alert-danger', timeout: 3000});
        return false;
      }
    }

  }

}
