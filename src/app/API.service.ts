/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";

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

export type GetRatingQuery = {
  __typename: string;
  value: number;
  updated: string | null;
};

export type GetMenuQuery = {
  getMenu: Array<string>;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async UpdateRating(recipe_id: string): Promise<UpdateRatingMutation> {
    const statement = `mutation UpdateRating($recipe_id: String!) {
        updateRating(recipe_id: $recipe_id) {
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
  async GetRating(recipe_id: string): Promise<GetRatingQuery> {
    const statement = `query GetRating($recipe_id: String!) {
        getRating(recipe_id: $recipe_id) {
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
    return <GetRatingQuery>response.data.getRating;
  }
  async GetMenu(year_week: string): Promise<GetMenuQuery> {
    const statement = `query GetMenu($year_week: String!) {
        getMenu(year_week: $year_week)
      }`;
    const gqlAPIServiceArguments: any = {
      year_week
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMenuQuery>response.data;
  }
}
