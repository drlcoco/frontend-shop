import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/i-user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnChanges {

  id?:number;
  public dark: boolean = false;
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

  constructor(private userService: UserService,
    private storageService: StorageService,
    private routeId: ActivatedRoute,
    private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.storageService.darkThemeObs.subscribe(
      data => this.dark = data
    );
    this.user = this.userService.getAuth();
    this.id = this.user.id; // Recibimos parámetro
    this.userService.getUser(this.id)
      .subscribe(
        async (p) => {
          this.user = p;
          console.log(this.user);
          this.user.id = this.id;
          this.user.phone=Number(this.user.phone);

          const reader: FileReader = new FileReader();
          let imagen= await fetch(this.user.image).then(r=>r.blob());
          reader.readAsDataURL(imagen);
          reader.addEventListener('loadend', e =>{
            this.user.image =reader.result as string;
            console.log(this.user.image);
          })
        },
          error => console.error(error)
      );
    this.user.phone=Number(this.user.phone);
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
        this.router.navigate([`update`])},
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

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

}
