import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Globals} from '../Injectable/globals';
import {Router} from '@angular/router';
import {UserService} from '../Services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: '../../template/header.html',
  styleUrls: ['../../css/header.css']
})

export class HeaderComponent implements AfterViewInit{
  private name: String;
  private password: String;
  constructor(private userService: UserService, public globals: Globals, private router: Router) {}

  logout(): void {
    this.userService.logout();
  }
  submit(modal): void {
   modal.hide();
   this.createUser();
  }
  createUser(): void {
    this.userService.createUser(this.name, this.password);
  }

}
