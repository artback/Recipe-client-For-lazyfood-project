import {Injectable} from '@angular/core';
import {APIService} from '../../API.service';

@Injectable()
export class RatingService {
  constructor (private apiService: APIService) {}

  async updateRating(rating: number, id: string) {
    this.apiService.UpdateRating(id);
  }
  async getRating(recipe_id: string) {
    this.apiService.GetRating(recipe_id);
  }

}
