import { Injectable } from "alosaur/mod.ts";
import { StrapiGraphQLService } from "./strapi-graphql.service.ts";
import type { GamesQueryVariables } from "graphql-sdk/mod.ts";

@Injectable()
export class GamesService {
  private readonly graphql = new StrapiGraphQLService();

  constructor() {}

  public async list(vars: GamesQueryVariables) {
    const games = await this.graphql.sdk.games(vars);
    return games;
  }
}
