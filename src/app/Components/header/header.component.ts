import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit {
  isActive = false;
  userName: string;
  signedIn: boolean;

  @HostListener('click') click() {
    this.isActive = !this.isActive;
  }

  constructor(
    private activatedRoute: ActivatedRoute , private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['id']) {
        localStorage.setItem('uid', params['id']);
        localStorage.setItem('username', params['name']);
        localStorage.setItem('token', decodeURI(params['token']));
        this.router.navigateByUrl('/', {replaceUrl: true});
      }
      const name = localStorage.getItem('username');
      if (name) {
        this.userName = name;
        this.signedIn = true;
      }
    });
  }
  private logout() {
    window.localStorage.removeItem('uid');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('token');
    this.signedIn = false;
  }
  private login() {
    location.assign('https://www.localhost:3000/authorization/facebook');
  }
}
