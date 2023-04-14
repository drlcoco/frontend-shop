import { Component, OnInit } from '@angular/core';
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
              private spinnerService: NgxSpinnerService) { }

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
    if(user.id !== undefined) {
      this.usersService.deleteUser(user.id);
      console.log('Borrando user '+ user.id);
      /* this.usersService.getUser(user.id); */
    }
  }

  editItem(user: IUser) {
    console.log('Editando user '+ user.id);
  }

  updateTableTheme(): boolean {
    this.theme = this.storageService.getDarkTheme();
    return this.theme;
  }

}
