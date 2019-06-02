import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../Services';
import * as moment from 'moment';
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
  weekRecipes: Promise<any[]>;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
              public router: Router) {
    this.route.params.subscribe(res => {
      this.week = res.week;
      this.year = res.year;
    });
  }

  ngOnInit() {
    this.weekDates = this.setDatesInWeek();
    this.weekRecipes = this.getFakedRandomWeek();
    // this.getRandomWeek();
  }
  getFakedRandomWeek() {
    this.submitted = false;
    return this.recipeService.searchRecipes('pizza').then(res  => {
       return res.map((recipe, index) => {
         recipe.recipe.servings = 4;
         recipe.recipe.weekDay = weekDays[index];
         return recipe.recipe;
        }).slice(0, 7);
    });
  }

  getRandomWeek(week, year) {
    // this.AP.getWeekList(week, year).subscribe((ret) => {
    //   this.submitted = ret.final;
    //   this.weekRecipes = this.recipeService.getRecipes(ret.recipes);
    // });
  }

  navigate(weeks) {
    const date = moment().week(this.week).year(this.year);
    date.add(weeks, 'week');
    this.weekDates = this.setDatesInWeek();
    // this.getRandomWeek();
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

  verifyWeekList() {
  }
}
