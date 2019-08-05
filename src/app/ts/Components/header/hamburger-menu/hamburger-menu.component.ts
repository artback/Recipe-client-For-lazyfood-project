import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})

export class HamburgerMenuComponent {
  @Input() isActive: boolean;
  @Input() user: any;
  @Input() userName: string;
  @Input() signedIn: boolean;

  @Output()
  loginEvent = new EventEmitter<void>();

  @Output()
  logoutEvent = new EventEmitter<void>();

  login() {
    this.loginEvent.emit();
  }

  logout() {
    this.logoutEvent.emit();
  }
}
