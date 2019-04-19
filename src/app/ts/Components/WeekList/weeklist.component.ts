import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService, WeekListService} from '../../Services';
import * as moment from 'moment';
import {map} from 'rxjs/operators';

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
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  weekRecipes: any;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
              public router: Router,
              private weekListService: WeekListService) {
    this.route.params.subscribe(res => {
      this.week = res.week;
      this.year = res.year;
    });
  }

  ngOnInit() {
    this.weekDates = this.setDatesInWeek();
    this.getFakedRandonWeek();
    // this.getRandomWeek();
  }
  getFakedRandonWeek() {
    this.submitted = false;
    this.recipeService.searchRecipes('pizza').then((res) => {
      // @ts-ignore
      this.weekRecipes = res.hits.map(recipe => recipe.recipe ).slice(0, 7);
      this.weekRecipes = this.weekRecipes.map((recipe) => {
        recipe.servings = 4;
        return recipe;
      });
    });
  }

  getRandomWeek() {
    this.weekListService.getRandomWeek(this.week, this.year).subscribe((ret) => {
      this.submitted = ret.final;
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
    const recipes = this.weekRecipes.pipe(
      // @ts-ignore
      map(recipe => recipe.uri.split('_').slice(-1)[0])
    );
    this.weekListService.saveWeekList(this.week, this.year, recipes).subscribe();
  }
}
