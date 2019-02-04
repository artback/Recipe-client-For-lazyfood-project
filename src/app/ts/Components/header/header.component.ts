import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isActive = false;
  @HostListener('click') click() {
    this.isActive = !this.isActive;
  }

  constructor() { }

  ngOnInit() {
  }
}
