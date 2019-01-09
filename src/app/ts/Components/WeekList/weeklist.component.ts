import {Component, OnChanges, OnInit} from '@angular/core';
import * as moment from 'moment/moment';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService, WeekListService} from '../../Services';
import {DragulaService} from 'ng2-dragula';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-weeklist',
  templateUrl: './weekList.html',
  styleUrls: ['./weekList.css']
})

export class WeeklistComponent implements OnInit{
  submitted = false;
  week: number;
  year: number;
  weekDays;
  weekRecipes: Observable<any>;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
              public router: Router,
              private weekListService: WeekListService,
              private dragulaService: DragulaService) {
    this.route.params.subscribe(res => {
      this.week = res.week;
      this.year = res.year;
    });
  }

  ngOnInit() {
    this.weekDays = this.setDatesInWeek();
    this.getRandomWeek();
  }

  getRandomWeek() {
    this.weekListService.getRandomWeek(this.week, this.year).subscribe((ret) => {
      if (ret.final) {
        this.dragulaService.cancel('weekRecipes');
        this.submitted = true;
      } else {
        this.submitted = false;
      }
      this.weekRecipes = this.recipeService.getRecipes(ret.recipes);
    });
  }

  navigate(weeks) {
    const date = moment().week(this.week).year(this.year);
    date.add(weeks, 'week');
    date.get('week');
    this.weekDays = this.setDatesInWeek();
    this.getRandomWeek();
    this.router.navigate([`../menu/${date.get('year')}/${date.get('week')}`]);
  }

  setDatesInWeek() {
    const weekDays = new Array(7);
    let date = moment().week(this.week).year(this.year);
    date = date.startOf('week');
    for (let i = 0; i < 7; i++) {
      weekDays[i] = date.clone();
      date.add(1, 'day');
    }
    return weekDays;
  }

  verifyWeekList() {
    const recipes = this.weekRecipes.map((recipe) => recipe.uri.split('_').slice(-1)[0]);
    this.weekListService.saveWeekList(this.week, this.year, recipes).subscribe();
  }
}
