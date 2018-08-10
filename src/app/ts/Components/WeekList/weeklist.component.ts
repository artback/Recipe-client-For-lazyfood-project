import {Component, OnInit} from '@angular/core';
import {Globals} from '../../Injectable/globals';
import * as moment from 'moment/moment';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../../Services/recipe.service';
import {Subscription} from 'rxjs/Subscription';
import {DragulaService} from 'ng2-dragula';
@Component({
  selector: 'app-weeklist',
  templateUrl: './weekList.html',
  styleUrls: ['./weekList.css']
})

export class WeeklistComponent implements OnInit {
  week: number;
  year: number;
  weekDays;
  weekRecipes;
  constructor(private recipeService: RecipeService, private globals: Globals, private route: ActivatedRoute) {

    this.route.params.subscribe(res => {
      this.week = res.week;
      this.year =  res.year;
    });
  }
  ngOnInit() {
    this.weekDays = this.setDateOfWeek();
    this.recipeService.getRandomWeek(this.week, this.year).subscribe((recipeIds) => {
      this.recipeService.getRecipes(recipeIds).subscribe((recipes) => {
        this.weekRecipes = recipes;
      });
    });
  }
  setDateOfWeek() {
    // @TODO: check for the users locale from ip
    const weekDays = new Array(7);
    let date  = moment().week(this.week).year(this.year);
    date = date.startOf('week');
    for (let i = 0; i < 7; i++) {
      weekDays[i] = date.clone();
      date.add(1, 'day');
    }
    return weekDays;
  }
  verifyWeekList() {
    this.recipeService.saveWeekList(this.week, this.year, this.weekRecipes).subscribe();
  }
}
