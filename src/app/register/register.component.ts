import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Form, NgForm, Validators } from '@angular/forms';
import { IUser } from '../interfaces/i-user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  pageTitle:string = "Regístrate";
  user:IUser ={
    id:0,
    name:"",
    surname:"",
    phone:0,
    address:"",
    role:"user",
    email:"",
    password:"",
    image:""
  };
  status: string = "";

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(this.user);
    this.userService.register(this.user).subscribe(
      response => {
        if(response.status == "success"){
          this.status = response.status;
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);

      }
    )
  }

  // Example starter JavaScript for disabling form submissions if there are invalid fields
function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
}

}
