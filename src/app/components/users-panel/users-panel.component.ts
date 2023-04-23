import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUser } from 'src/app/interfaces/i-user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

  users: IUser[] = [];
  theme: boolean = false;

  constructor(private storageService: StorageService,
              private usersService : UserService,
              private spinnerService: NgxSpinnerService,
              private router: Router) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.usersService.getEventos().subscribe(
      resp =>{
        this.users = resp;
      },
      error =>{console.log(error);
      }
    );
    this.spinnerService.hide();
  }

  deleteItem(user: IUser) {
    console.log("User id: "+user.id);

    if(user.id !== undefined) {
      this.usersService.deleteUser(user.id);
      console.log('Borrando user '+ user.id);
      this.router.navigate(['/panel']);
      /* this.usersService.getUser(user.id); */
    }
  }

  editUser(user: IUser) {
    console.log('Editando user '+ user.id);
    this.router.navigate(['/account', user.id]);
  }

  updateTableTheme(): boolean {
    this.theme = this.storageService.getDarkTheme();
    return this.theme;
  }

}
