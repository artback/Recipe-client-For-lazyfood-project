import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment/moment';


@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})

export class HamburgerMenuComponent {
  @Input() isActive;
  @Input() signedIn;
  @Output() clicked = new EventEmitter();
  sendClickSignal(button: String) {
    this.clicked.emit(button);
  }
  getWeekNumber(): number  {
    return moment().add(2, 'days').week();
  }
  getYear(): number  {
    return moment().add(2, 'days').year();
  }
}
