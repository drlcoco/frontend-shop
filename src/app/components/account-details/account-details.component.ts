import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/i-user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  user: IUser = {
    id: 0,
    email:'',
    name: '',
    surname: '',
    address: '',
    role: 'user',
    phone: 0,
    image: '',
    password: ''
  };
  newUser!:IUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as number; // Recibimos parámetro
    this.user.id = id;
    this.userService.getUser(id).subscribe(
      (p) => {this.user = p;
        this.user.id = id;
      },
      (error) => console.log('Error')
    );
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.user.image = reader.result as string;
    });
  }

  updateUser() {
    this.user.phone = Number(this.user.phone);
    this.userService.updateUser(this.user).subscribe(
      (_ok)=>{
        Swal.fire({
          title: 'Usuario Actualizado',
          icon: 'success',
          text: 'Se ha actualizado el usuario con éxito!.',
          timer: 4000
        })
        this.router.navigate(['/panel'])},
      (_error)=> {
        Swal.fire({
          title: 'Error actualizando el usuario',
          icon: 'error',
          text: 'No se ha actualizado el usuario correctamente.',
          timer: 4000
        })
      }
    );
  }

}
