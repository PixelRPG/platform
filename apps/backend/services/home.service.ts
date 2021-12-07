import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIHome } from "../types/strapi-rest-api-home.ts";
import { html, tokens } from "rusty_markdown/mod.ts";

@Injectable()
export class HomeService {
  private strapi = new StrapiService("home");

  constructor() {}

  public async get() {
    try {
      // const home = await this.strapi.get<StrapiRestAPIHome>();
      // home.content = html(tokens(home.content));
      return { };
    } catch (error) {
      throw error;
    }
  }
}
