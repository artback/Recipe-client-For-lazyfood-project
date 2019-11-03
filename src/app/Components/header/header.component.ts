import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnInit {
  isActive = false;
  user: any;
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
      console.log(params);
      if (params['id']) {
        localStorage.setItem('_uid', params['id']);
        localStorage.setItem('_username', params['name']);
        this.router.navigateByUrl('/', {replaceUrl: true});
      }
    });
  }
  private logout() {
  }
  private login() {
    location.assign('https://www.localhost:3000/authorization/facebook');
  }
}
