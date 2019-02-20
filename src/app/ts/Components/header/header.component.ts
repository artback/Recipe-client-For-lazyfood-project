import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isActive = false;

  @HostListener('click') click() {
    this.isActive = !this.isActive;
  }

}
