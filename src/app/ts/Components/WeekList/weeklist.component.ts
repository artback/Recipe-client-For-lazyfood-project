import {Component, OnInit} from '@angular/core';
import {Globals} from '../../Injectable/globals';
import * as moment from 'moment/moment';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../Services/recipe.service';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-weeklist',
  templateUrl: './weekList.html',
  styleUrls: ['./weekList.css']
})

export class WeeklistComponent implements OnInit {
  submited: boolean;
  week: number;
  year: number;
  weekDays;
  weekRecipes;

  constructor(private recipeService: RecipeService, private globals: Globals, private route: ActivatedRoute,
              public router: Router,
              private dragulaService: DragulaService) {
    this.route.params.subscribe(res => {
      this.week = res.week;
      this.year = res.year;
    });
  }

  ngOnInit() {
    this.weekDays = this.setDateOfWeek();
    this.getRandomWeek();
  }

  getRandomWeek() {
    this.recipeService.getRandomWeek(this.week, this.year).subscribe((recipeIds) => {
      if (recipeIds[0]) {
        if (recipeIds[0].uri === undefined) {
          this.recipeService.getRecipes(recipeIds).subscribe((recipes) => {
            this.weekRecipes = recipes;
            this.submited = false;
          });
        } else {
          this.submited = true;
          this.dragulaService.destroy('FOOD');
        }
      }else{

      }
    });
  }

  navigate(weeks) {
    const date = moment().week(this.week).year(this.year);
    date.add(weeks, 'week');
    date.get('week');
    this.router.navigate([`../menu/${date.get('year')}/${date.get('week')}`]);
    this.getRandomWeek();
  }

  setDateOfWeek() {
    // @TODO: check for the users locale from ip
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
    this.recipeService.saveWeekList(this.week, this.year, this.weekRecipes).subscribe();
  }
}
