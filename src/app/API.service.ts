/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type UpdateRatingMutation = {
  __typename: string;
  value: number;
  updated: string | null;
};

export type DeleteRatingMutation = {
  __typename: string;
  value: number;
  updated: string | null;
};

export type UpdateMenuMutation = {
  updateMenu: Array<string>;
};

export type RatingQuery = {
  __typename: string;
  value: number;
  updated: string | null;
};

export type BatchGetRatingsQuery = {
  __typename: string;
  value: number;
  updated: string | null;
};

export type MenuQuery = {
  menu: Array<string | null> | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async UpdateRating(
    recipe_id: string,
    rating: number
  ): Promise<UpdateRatingMutation> {
    const statement = `mutation UpdateRating($recipe_id: String!, $rating: Int!) {
        updateRating(recipe_id: $recipe_id, rating: $rating) {
          __typename
          value
          updated
        }
      }`;
    const gqlAPIServiceArguments: any = {
      recipe_id,
      rating
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateRatingMutation>response.data.updateRating;
  }
  async DeleteRating(recipe_id: string): Promise<DeleteRatingMutation> {
    const statement = `mutation DeleteRating($recipe_id: String!) {
        deleteRating(recipe_id: $recipe_id) {
          __typename
          value
          updated
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
    year_week: string,
    menu: Array<string>
  ): Promise<UpdateMenuMutation> {
    const statement = `mutation UpdateMenu($year_week: String!, $menu: [String!]!) {
        updateMenu(year_week: $year_week, menu: $menu)
      }`;
    const gqlAPIServiceArguments: any = {
      year_week,
      menu
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMenuMutation>response.data;
  }
  async Rating(recipe_id: string): Promise<RatingQuery> {
    const statement = `query Rating($recipe_id: String!) {
        rating(recipe_id: $recipe_id) {
          __typename
          value
          updated
        }
      }`;
    const gqlAPIServiceArguments: any = {
      recipe_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <RatingQuery>response.data.rating;
  }
  async BatchGetRatings(
    recipe_ids: Array<string>
  ): Promise<BatchGetRatingsQuery> {
    const statement = `query BatchGetRatings($recipe_ids: [String!]!) {
        batchGetRatings(recipe_ids: $recipe_ids) {
          __typename
          value
          updated
        }
      }`;
    const gqlAPIServiceArguments: any = {
      recipe_ids
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <BatchGetRatingsQuery>response.data.batchGetRatings;
  }
  async Menu(year_week: string): Promise<MenuQuery> {
    const statement = `query Menu($year_week: String!) {
        menu(year_week: $year_week)
      }`;
    const gqlAPIServiceArguments: any = {
      year_week
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <MenuQuery>response.data;
  }
}
