// @ts-ignore
import { TestBed, inject } from '@angular/core/testing';
import { RecipeService} from '../Services';
import { HttpClientModule} from '@angular/common/http';

// @ts-ignore
describe('recipe service test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RecipeService, HttpClientModule]
    });
  });

  // @ts-ignore
  it('recipe search should return result', inject([RecipeService], async (service: RecipeService) => {
    const pizza = await service.searchRecipes('pizza');
    // @ts-ignore
    expect(pizza.q).toBe('pizza');
  }));
});
