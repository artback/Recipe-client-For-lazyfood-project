/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type DeleteRatingMutation = {
  __typename: string;
  updated: string | null;
  value: number;
};

export type UpdateMenuMutation = {
  updateMenu: Array<string>;
};

export type UpdateRatingMutation = {
  __typename: string;
  updated: string | null;
  value: number;
};

export type BatchGetRatingsQuery = {
  __typename: string;
  updated: string | null;
  value: number;
};

export type GetMenuQuery = {
  __typename: string;
  updated: string | null;
  value: number;
};

export type GetRatingQuery = {
  __typename: string;
  updated: string | null;
  value: number;
};

export type BatchGetRecipesQuery = {
  __typename: string;
  uri: string | null;
  label: string | null;
  image: string | null;
  source: string | null;
  url: string | null;
  yield: number | null;
  dietLabels: Array<string | null> | null;
  healthLabels: Array<string | null> | null;
  cautions: Array<string | null> | null;
  ingredientLines: Array<string | null> | null;
  ingredients: Array<string | null> | null;
  calories: number | null;
  totalWeight: number | null;
  totalTime: number | null;
  totalNutritens: Array<{
    __typename: "Nutritents";
    label: string | null;
    quantity: number | null;
    unit: string | null;
  } | null> | null;
  totalDialy: Array<{
    __typename: "Nutritents";
    label: string | null;
    quantity: number | null;
    unit: string | null;
  } | null> | null;
};

export type BatchGetRecipesWithRatingQuery = {
  __typename: string;
  recipe: {
    __typename: "Recipe";
    uri: string | null;
    label: string | null;
    image: string | null;
    source: string | null;
    url: string | null;
    yield: number | null;
    dietLabels: Array<string | null> | null;
    healthLabels: Array<string | null> | null;
    cautions: Array<string | null> | null;
    ingredientLines: Array<string | null> | null;
    ingredients: Array<string | null> | null;
    calories: number | null;
    totalWeight: number | null;
    totalTime: number | null;
    totalNutritens: Array<{
      __typename: "Nutritents";
      label: string | null;
      quantity: number | null;
      unit: string | null;
    } | null> | null;
    totalDialy: Array<{
      __typename: "Nutritents";
      label: string | null;
      quantity: number | null;
      unit: string | null;
    } | null> | null;
  } | null;
  rating: {
    __typename: "Rating";
    updated: string | null;
    value: number;
  } | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async DeleteRating(recipe_id: string): Promise<DeleteRatingMutation> {
    const statement = `mutation DeleteRating($recipe_id: String!) {
        deleteRating(recipe_id: $recipe_id) {
          __typename
          updated
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      recipe_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteRatingMutation>response.data.deleteRating;
  }
  async UpdateMenu(
    menu: Array<string>,
    year_week: string
  ): Promise<UpdateMenuMutation> {
    const statement = `mutation UpdateMenu($menu: [String!]!, $year_week: String!) {
        updateMenu(menu: $menu, year_week: $year_week)
      }`;
    const gqlAPIServiceArguments: any = {
      menu,
      year_week
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMenuMutation>response.data;
  }
  async UpdateRating(
    rating: number,
    recipe_id: string
  ): Promise<UpdateRatingMutation> {
    const statement = `mutation UpdateRating($rating: Int!, $recipe_id: String!) {
        updateRating(rating: $rating, recipe_id: $recipe_id) {
          __typename
          updated
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      rating,
      recipe_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateRatingMutation>response.data.updateRating;
  }
  async BatchGetRatings(
    recipe_ids?: Array<string | null>
  ): Promise<BatchGetRatingsQuery> {
    const statement = `query BatchGetRatings($recipe_ids: [String]) {
        batchGetRatings(recipe_ids: $recipe_ids) {
          __typename
          updated
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (recipe_ids) {
      gqlAPIServiceArguments.recipe_ids = recipe_ids;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <BatchGetRatingsQuery>response.data.batchGetRatings;
  }
  async GetMenu(year_week: string): Promise<GetMenuQuery> {
    const statement = `query GetMenu($year_week: String!) {
        getMenu(year_week: $year_week) {
          __typename
          updated
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      year_week
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMenuQuery>response.data.getMenu;
  }
  async GetRating(recipe_id: string): Promise<GetRatingQuery> {
    const statement = `query GetRating($recipe_id: String!) {
        getRating(recipe_id: $recipe_id) {
          __typename
          updated
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      recipe_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetRatingQuery>response.data.getRating;
  }
  async BatchGetRecipes(query?: string): Promise<BatchGetRecipesQuery> {
    const statement = `query BatchGetRecipes($query: String) {
        batchGetRecipes(query: $query) {
          __typename
          uri
          label
          image
          source
          url
          yield
          dietLabels
          healthLabels
          cautions
          ingredientLines
          ingredients
          calories
          totalWeight
          totalTime
          totalNutritens {
            __typename
            label
            quantity
            unit
          }
          totalDialy {
            __typename
            label
            quantity
            unit
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (query) {
      gqlAPIServiceArguments.query = query;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <BatchGetRecipesQuery>response.data.batchGetRecipes;
  }
  async BatchGetRecipesWithRating(
    query?: string
  ): Promise<BatchGetRecipesWithRatingQuery> {
    const statement = `query BatchGetRecipesWithRating($query: String) {
        batchGetRecipesWithRating(query: $query) {
          __typename
          recipe {
            __typename
            uri
            label
            image
            source
            url
            yield
            dietLabels
            healthLabels
            cautions
            ingredientLines
            ingredients
            calories
            totalWeight
            totalTime
            totalNutritens {
              __typename
              label
              quantity
              unit
            }
            totalDialy {
              __typename
              label
              quantity
              unit
            }
          }
          rating {
            __typename
            updated
            value
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (query) {
      gqlAPIServiceArguments.query = query;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <BatchGetRecipesWithRatingQuery>(
      response.data.batchGetRecipesWithRating
    );
  }
}
