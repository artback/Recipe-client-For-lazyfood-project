import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})

export class ProfileComponent implements  OnInit {
  worth: number;
  tags: string[] = ['Vegan'];
  ngOnInit() {
  }

  inputSlide(value) {
    this.worth = value;
  }
}
