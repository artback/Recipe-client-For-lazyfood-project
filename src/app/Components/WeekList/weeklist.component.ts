import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-weeklist',
  templateUrl: './weekList.html',
  styleUrls: ['./weekList.css']
})
export class WeeklistComponent implements OnInit {
  submitted = false;
  week: number;
  year: number;
  weekDates;
  private weekRecipes: Promise<any>;
  constructor(private route: ActivatedRoute,
              public router: Router) {
    this.route.params.subscribe(res => {
      this.week = res.week;
      this.year = res.year;
    });
  }

  ngOnInit() {
    this.weekDates = this.setDatesInWeek();
  }

  navigate(weeks) {
    const date = moment().week(this.week).year(this.year);
    date.add(weeks, 'week');
    this.weekDates = this.setDatesInWeek();
    this.router.navigate([`../menu/${date.get('year')}/${date.get('week')}`]);
  }

  setDatesInWeek() {
    const dates = new Array(7);
    let date = moment().week(this.week).year(this.year);
    date = date.startOf('week');
    for (let i = 0; i < 7; i++) {
      dates[i] = date.clone();
      date.add(1, 'day');
    }
    return dates;
  }

}
