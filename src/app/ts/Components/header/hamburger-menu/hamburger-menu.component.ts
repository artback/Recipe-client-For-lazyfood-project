import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})

export class HamburgerMenuComponent {
  @Input() isActive;
  @Output() clicked = new EventEmitter();
  sendClickSignal(button: String) {
    this.clicked.emit(button);
  }

}
