import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
// import { StrapiRestAPIContact } from "../types/strapi-rest-api-contact.ts";
// import { StrapiImage } from "../types/strapi-image.ts";

@Injectable()
export class GamesService {
  private readonly strapi = new StrapiService("game");

  constructor() {}

  public async get() {
    try {
      // const contact = await this.strapi.get<StrapiRestAPIContact>();
      return await {};
    } catch (error) {
      throw error;
    }
  }
}
